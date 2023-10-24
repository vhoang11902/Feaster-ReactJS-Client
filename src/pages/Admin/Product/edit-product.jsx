import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import requestPrivate from "../../../utils/requestPrivate";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    image: null,
    categoryId: "",
    status: 0,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [defaultOption, setDefaultOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await requestPrivate.get(`/edit-product/${id}`);
        const { data } = response;
        setFormState({
          productName: data.product_name,
          productDesc: data.product_desc,
          productPrice: data.product_price,
          image: data.product_image,
          categoryId: data.category_id,
          status: data.product_status,
        });
        const { data: categories } = await requestPrivate.get("/category");
        const options = categories.map((category) => ({
          value: category.id,
          label: category.category_name,
        }));
        setCategoryOptions(options);
        const defaultOption = options.find(
          (options) => options.value === data.category_id
        );
        setDefaultOption(defaultOption);
        console.log(defaultOption);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log("File object:", file);
    setFormState({ ...formState, image: file });
  };

  const handleSelectChange = (selectedOption) => {
    setFormState({ ...formState, categoryId: selectedOption.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_image", formState.image);
    formData.append("product_name", formState.productName);
    formData.append("product_price", formState.productPrice);
    formData.append("category_id", formState.categoryId);
    formData.append("product_desc", formState.productDesc);
    formData.append("product_status", formState.status);

    requestPrivate
      .post(`/update-product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/allProduct");
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
      <div className="bg-white p-[1.75rem] rounded-2xl">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-[1.25rem]">Edit Product</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="text-sm mb-2">Product Name:</div>
              <input
                value={formState.productName}
                onChange={(e) =>
                  setFormState({ ...formState, productName: e.target.value })
                }
                className="w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none"
                placeholder="Product name"
              />
            </div>
            <div className="mb-6">
              <div className="text-sm mb-2">Product Price:</div>
              <input
                value={formState.productPrice}
                onChange={(e) =>
                  setFormState({ ...formState, productPrice: e.target.value })
                }
                className="w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none"
                placeholder="Product price"
              />
            </div>
            <div className="mb-6">
              <div className="text-sm mb-2">Product Image:</div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:rounded-l-md file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] file:cursor-pointer hover:file:bg-slate-200"
                defaultValue={formState.image?.name || ""}
              />
              {formState.image && (
                <img
                  src={`http://localhost/feaster/storage/app/public/products/${formState.image}`}
                  alt=""
                  className="w-48"
                />
              )}
            </div>
            <div className="mb-6">
              <div className="text-sm mb-2">Product Description:</div>
              {/* <textarea
                value={formState.productDesc}
                onChange={(e) =>
                  setFormState({ ...formState, productDesc: e.target.value })
                }
                className="w-full rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none"
                placeholder="Product description"
              /> */}
              <CKEditor
                editor={ClassicEditor}
                data={formState.productDesc}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormState((prevState) => ({
                    ...prevState,
                    productDesc: data,
                  }));
                }}
              />
            </div>
            <div className="mb-6">
              <label className="text-sm mb-2">Category:</label>
              <Select
                options={categoryOptions}
                value={defaultOption}
                onChange={handleSelectChange}
                placeholder="Select a category"
                name="categoryId"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm mb-2">Display:</label>
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

export default EditProduct;
