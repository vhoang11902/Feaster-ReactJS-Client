import { useState, useEffect } from "react";
import requestPrivate from "../../utils/requestPrivate";

function Dashboard() {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    requestPrivate
      .get('/allOrder')
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    requestPrivate
      .get('/product')
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalOrders = order.length;
  const totalProduct = product.length;
  const totalSales = order.reduce((sum, order) => sum + order.order_total, 0);

  const data = {
    totalOrders,
    totalProduct,
    sales: totalSales,
    growth: 5,
  }

  return (
    <div className=" h-screen p-[2.5rem]">
      <div className="bg-white p-[1.75rem] rounded-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 rounded-lg text-white p-6 cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Product</span>
                <span className="text-2xl font-bold">{data.totalProduct}</span>
              </div>
            </div>
            <div className="bg-green-500 rounded-lg text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Orders</span>
                <span className="text-2xl font-bold">{data.totalOrders}</span>
              </div>
            </div>
            <div className="bg-yellow-500 rounded-lg text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Sales</span>
                <span className="text-2xl font-bold">${data.sales}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;