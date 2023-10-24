import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import requestPrivate from "../../../utils/requestPrivate";
import { useParams, useNavigate  } from "react-router-dom"; 

function EditCategory() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    label: "",
    desc: "",
    status: 0,
  });
  useEffect(() => {
    requestPrivate
      .get(`/edit-category/${id}`)
      .then((response) => 
      {
        response.data.map((cate) => {
          setFormState({
            label: cate.category_name,
            desc: cate.category_desc,
            status: cate.category_status,
          });
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    requestPrivate
      .put(`/update-category/${id}`,{
        category_name: formState.label,
        category_desc: formState.desc,
        category_status: formState.status,
      })
      .then((response) => {
        setFormState({
          label: "",
          desc: "",
          status: 0,
        });
        navigate('/allCategory');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (checked) => {
    setFormState({ ...formState, status: checked ? 1 : 0 });
  };

  return (
    <div className="block p-[2.5rem]">
      <div className="bg-white p-[1.75rem]">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-[1.25rem]">Edit category</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="text-sm mb-2">Category label:</div>
              <input
                value={formState.label}
                onChange={(e) =>
                  setFormState({ ...formState, label: e.target.value })
                }
                className="w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none"
                placeholder="Label"
              />
            </div>
            <div className="mb-6">
              <div className="text-sm mb-2">Category description:</div>
              <input
                value={formState.desc}
                onChange={(e) =>
                  setFormState({ ...formState, desc: e.target.value })
                }
                className="w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none"
                placeholder="Description"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm mb-2">Display: </label>
              <Switch
                checked={formState.status}
                className="bg-slate-400"
                defaultChecked
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-primary-600 text-white p-2 px-5 rounded-xl hover:bg-primary-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCategory;