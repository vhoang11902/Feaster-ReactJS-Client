import React, { useState, useEffect } from "react";
import requestPrivate from "../../../utils/requestPrivate";
import { Table, Switch, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { FcFullTrash, FcSettings } from "react-icons/fc";
import "./category.css";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  // Lấy token từ cookie
  useEffect(() => {
    requestPrivate
      .get('/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSwitchChange = (isChecked, record) => {
    const { id } = record;
    const status = isChecked ? 0 : 1;

    const url = status
      ? `/unactive-category/${id}`
      : `/active-category/${id}`;

    requestPrivate
    .post(url,null)
      .then((response) => {
        const updatedCategories = categories.map((category) => {
          if (category.id === id) {
            return {
              ...category,
              category_status: response.data.category_status,
            };
          }
          return category;
        });

        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    requestPrivate
      .delete(`/delete-category/${id}`)
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.id !== id
        );
        setCategories(updatedCategories);
        message.success("Category deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmDelete = (id) => {
    handleDelete(id);
  };

  const cancelDelete = (e) => {
    console.log("Cancel delete");
  };

  const mapCategoriesToData = () => {
    return categories.map((category, index) => {
      return {
        ...category,
        key: category.id,
        stt: index + 1,
        statusSwitch: (
          <Switch
            className="bg-slate-400"
            checked={category.category_status === 1}
            onChange={(isChecked) => handleSwitchChange(isChecked, category)}
          />
        ),
      };
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Description",
      dataIndex: "category_desc",
      key: "category_desc",
    },
    {
      title: "Status",
      dataIndex: "statusSwitch",
      key: "statusSwitch",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex">
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="Cancel"
          >
            <button className=" text-3xl p-2">
              <FcFullTrash />
            </button>
          </Popconfirm>

          <Link to={`/editCategory/${record.id}`} className=" text-3xl p-2">
            <FcSettings />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="block p-[2.5rem]">
      <div className="bg-white p-[1.75rem] rounded-2xl">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-[1.25rem]">All category</h4>
          <Table dataSource={mapCategoriesToData()} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default AllCategory;
