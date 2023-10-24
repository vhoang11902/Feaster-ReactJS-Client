import logo from "../../../assets/logo-01.png"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Drawer, Menu} from "antd";
import { FaBars } from "react-icons/fa6";
import { useContext,useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import request from "../../../utils/request";
import { useNavigate } from "react-router-dom";
import DrawerCart from "../../../components/CartDrawer/cartDrawer";
import CartContext from "../../../pages/Frontend/CartContext";
function Header() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useContext(CartContext);
  const [index, setIndex] = useState(0);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCartDrawer = () => {
    setIsCartOpen(true);
  };

  const handleCloseCartDrawer = () => {
    setIsCartOpen(false);
  };
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    request
      .get('/allCategory')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, []);



  useEffect(() => {
    let count = 0
    if (cartItems !== null) {cartItems.forEach((item) => {
      return count+=1;
    })}
    
    setIndex(count);
  }, [cartItems]);


  const handleCateProduct = (id) => {
    navigate(`/category/${id}`);
  };


  

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchData}`)};
  return (
    <div className="sticky h-[100px] top-0 grid grid-cols-6 bg-white justify-between shadow-md max-lg:h-20">
      <div className="col-span-2 flex items-center justify-start pl-3 max-lg:col-span-3">
        <FaBars
          className="lg:hidden text-xl ml-5"
          type="primary"
          onClick={showDrawer}
        />
        <NavLink to="/home" className="p-6">
          <img
            src={logo}
            alt="Logo Feaster"
            className="w-[150px] cursor-pointer"
          />
        </NavLink>
      </div>

      <Drawer
        Drawer
        title="Menu"
        placement="left"
        width={300}
        onClose={onClose}
        open={open}
      >
        <Menu className="" mode="inline" defaultSelectedKeys={["1"]}>
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              icon={<HomeOutlined />}
              onClick={() => handleCateProduct(category.id)}
            >
              {category.category_name}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
      <div className="col-span-2 relative flex items-center justify-center max-lg:hidden">
      <form onSubmit={handleSearch} className="w-full relative max-lg:hidden">
        <div className="flex">
          <input
            className="w-full h-[45px] p-4 z-10 relative text-lg  border rounded-sm  hover:border-gray-600 transition-all focus:outline-none"
            placeholder="SEARCH"
            name="keywords_submit"
            type="text"
            value={searchData}
      onChange={(e) => setSearchData(e.target.value)}
          />
          <button
            className="absolute z-20 right-0 h-[45px] w-[45px] flex justify-center items-center rounded-md hover:bg-[#ccc] transition-all"
            type="submit"
            name="search"
            value="valueSearch"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </button>
        </div>
      </form>
      </div>
      
      <div className="col-span-2  flex items-center justify-end pr-8 max-lg:col-span-3">
        <div className="flex flex-row">
          <NavLink to="/dashboard" className="p-4">
            <FontAwesomeIcon icon={faUser} size="xl" />

          </NavLink>
          <div className="relative z-0 p-4">
            <FontAwesomeIcon
              className=""
              onClick={handleOpenCartDrawer}
              icon={faCartShopping}
              size="xl"
            />
            <span className="w-4 h-4 py-[1px] absolute text-xs text-white text-center items-center bg-red-600 rounded-full right-[10px] top-[8px] z-10">{index}</span>
            <DrawerCart
              isOpenCart={isCartOpen}
              onCloseCart={handleCloseCartDrawer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
