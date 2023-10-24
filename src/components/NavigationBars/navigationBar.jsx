import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../utils/request";

function NavigationBar() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    request
      .get('/allCategory')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleCateProduct = (id) => {
    navigate(`/category/${id}`);
  };
  return (
    <div className=" h-[50px] grid bg-[#d9d4c8] max-lg:hidden">
      <div className="flex items-center justify-evenly">
        {categories.map((category) => (
          <div
            onClick={() => handleCateProduct(category.id)}
            key={category.id}
            className="cursor-pointer hover:border-b-[3px] hover:border-black flex items-center justify-center h-[50px]"
          >
            <div className="text-base uppercase">{category.category_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavigationBar;
