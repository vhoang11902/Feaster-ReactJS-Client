import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import requestPrivate from "../../../utils/requestPrivate";
function OrderDetail() {
  const { id } = useParams();
  const [attrValue, setAttrValue] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [dataVariant, setVariant] = useState([]);

  useEffect(() => {
    requestPrivate
      .get(`/orderDetail/${id}`)
      .then((response) => {
        setCustomer(response.data.customer);
        setShipping(response.data.shipping);
        setOrder(response.data.order);
        setOrderDetail(response.data.order_detail);
        setVariant(response.data.variant);
        setAttrValue(response.data.attrValue);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const mapOrderItemToData = () => {
    return orderDetail.map((order, index) => {
      const orderData = {
        ...order,
        key: order.order_detail_id,
        stt: index + 1,
      };
      dataVariant.forEach((skus) => {
        skus.forEach((sku) =>{
          if (order.sku_id === sku.sku_id) {
            sku.variants.forEach((variant) => {
              attrValue.forEach((attr) => {
                if (attr.id === variant.attr_id) {
                  attr.attr_product.forEach((attr_value) => {
                    if (attr_value.attr_value_id === variant.attr_value_id) {
                      orderData[`attr_${attr.id}`] = attr_value.value;
                    }
                  });
                }
              });
            });
          }
        })
        
      });
      return orderData;
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Product name",
      dataIndex: "product_name",
      key: "product_name",
    },
  ];

  dataVariant.slice(0, 1).forEach((sku) => {
    sku.forEach((variant) => {

      variant.variants.forEach((vari) =>{attrValue.forEach((attr) => {
        if (attr.id === vari.attr_id) {
          attr.attr_product.forEach((attr_value) => {
            if (attr_value.attr_value_id === vari.attr_value_id) {
              columns.push({
                title: `${attr.attr_name}`,
                dataIndex: `attr_${attr_value.attr_id}`,
                key: `${attr_value.value}`,
                width: 150,
                align: "center",
              });
            }
          });
        }
      });})
      
    });
  });
  columns.push(
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "Quantity",
      dataIndex: "product_qty",
      key: "product_qty",
    }
  );
  return (
    <div className="block p-[2.5rem]">
      <div className="bg-white p-[1.75rem] rounded-2xl mb-5">
        <div className="card-body">
          <h4 className="text-2xl font-semibold mb-[1.25rem] text-center">
            Order: {id}
          </h4>
        </div>
      </div>
      <div className="flex">
        <div className="flex-[50%] mr-3 bg-white p-[1.75rem] rounded-2xl mb-5">
          {customer.map((item) => (
            <div key={item.customer_id} className="card-body">
              <h4 className="text-lg font-semibold mb-[1.25rem] text-center">
                Customer Infomation
              </h4>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Name: </h2>
                <div className="text-lg">
                  {" "}
                  {item.customer_lastName} {item.customer_firstName}
                </div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Phone Number: </h2>
                <div className="text-lg"> {item.customer_phone}</div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Email: </h2>
                <div className="text-lg"> {item.customer_email}</div>
              </div>
              {order.map((orderInfo) => (
                <div>
                  <div className="flex mt-3 ">
                    <h2 className="text-lg font-semibold">Create time: </h2>
                    <div className="text-lg">{orderInfo.created_at}</div>
                  </div>
                  <div className="flex mt-3 ">
                    <h2 className="text-lg font-semibold">Total Order: </h2>
                    <div className="text-lg">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(orderInfo.order_total)
                        .replace(/\.00$/, "")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-[50%] ml-3 bg-white p-[1.75rem] rounded-2xl mb-5">
          {shipping.map((shipping) => (
            <div key={shipping.shipping_id} className="card-body">
              <h4 className="text-lg font-semibold mb-[1.25rem] text-center">
                Shipping Infomation
              </h4>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Address: </h2>
                <div className="text-lg">{shipping.shipping_address}</div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">City: </h2>
                <div className="text-lg">{shipping.shipping_city}</div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">State: </h2>
                <div className="text-lg">{shipping.shipping_state}</div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Country: </h2>
                <div className="text-lg"> {shipping.shipping_country}</div>
              </div>
              <div className="flex mt-3 ">
                <h2 className="text-lg font-semibold">Postal Code: </h2>
                <div className="text-lg">{shipping.shipping_postal_code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-[1.75rem] rounded-2xl mb-5">
        <div className="card-body">
          <h4 className="text-lg font-semibold mb-[1.25rem]">Order List</h4>
          <Table dataSource={mapOrderItemToData()} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
