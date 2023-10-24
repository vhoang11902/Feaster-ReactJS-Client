import React, { useState, useEffect } from "react";
import requestPrivate from "../../../utils/requestPrivate";
import { Table, Switch, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { FcFullTrash, FcSettings } from "react-icons/fc";
function AllProduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    requestPrivate
      .get('/product')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSwitchChange = (isChecked, record) => {
    const { product_id } = record;
    const status = isChecked ? 1 : 0;
    const url = status
      ? `/active-product/${product_id}`
      : `/unactive-product/${product_id}`;

    requestPrivate
      .post(url,null)
      .then((response) => {
        const updatedCategories = categories.map((product) => {
          if (product.product_id === product_id) {
            return {
              ...product,
              product_status: response.data.product_status,
            };
          }
          return product;
        });

        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (product_id) => {
    requestPrivate
      .delete(
        `/delete-product/${product_id}`)
      .then(() => {
        const updatedProducts = categories.filter(
          (product) => product.product_id !== product_id
        );
        setCategories(updatedProducts);
        message.success("Product deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmDelete = (product_id) => {
    handleDelete(product_id);
  };

  const cancelDelete = (e) => {
    console.log("Cancel delete");
  };
  
  const mapCategoriesToData = () => {
    return categories.map((product, index) => {
      return {
        ...product,
        key: product.product_id,
        stt: index + 1,
        statusSwitch: (
          <Switch
            className="bg-slate-400"
            checked={product.product_status === 1}
            onChange={(isChecked) => handleSwitchChange(isChecked, product)}
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
      width: 60,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 160,
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      width: 100,
      align: "center",
    },
    {
      title: "Image",
      key: "product_image",
      width: 160,
      align: "center",
      render:(_, record)=>(
        <img src={`http://localhost/feaster/storage/app/public/products/${record.product_image}`} alt="" className="w-full"></img>
      )
    },
    {
      title: "Variant",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="">
          <Link
            to={`/attrProduct/${record.product_id}`}
            className=" text-3xl text-center"
          >
            <button
              type="submit"
              className="text-sm bg-[#E66B63] text-white p-1 px-2 rounded-xl hover:bg-[#bf4a42] transition"
            >
              more variant
            </button>
          </Link>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "statusSwitch",
      key: "statusSwitch",
      width: 80,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="flex">
          <Popconfirm
            title="Are you sure to delete this product ?"
            onConfirm={() => confirmDelete(record.product_id)}
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="Cancel"
          >
            <button className=" text-3xl p-2">
              <FcFullTrash />
            </button>
          </Popconfirm>
          <Link
            to={`/editProduct/${record.product_id}`}
            className=" text-3xl p-2"
          >
            <FcSettings />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="block p-[1.5rem]">
      <div className="bg-white p-[1.5rem] rounded-2xl">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-[1.25rem]">All Product</h4>
          <Table
            dataSource={mapCategoriesToData()}
            columns={columns}
            scroll={{ x: "100%", y: "calc(100% - 250px)" }}
          />
        </div>
      </div>
    </div>
    
  );
}

export default AllProduct;
