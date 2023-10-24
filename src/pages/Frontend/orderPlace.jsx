import { useParams, useNavigate } from "react-router-dom";
import { Result } from "antd";
function OrderPlace() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleBackToHomePage = () => {
    navigate("/home");
  };
  return (
    <div className="pt-20">
      <Result
        status="success"
        title="Successfully Purchased Your Order !"
        subTitle={`Order code: ${orderId}. We will prepare and ship your order immediately to you. This process
        will take about 7 days to 14 days.`}
        extra={[
          <button
            key="home"
            onClick={handleBackToHomePage}
            className="bg-primary-600 text-white p-2 px-5 rounded-xl hover:bg-primary-700 transition"
          >
            Back to Home Page
          </button>,
        ]}
      />
    </div>
  );
}

export default OrderPlace;
