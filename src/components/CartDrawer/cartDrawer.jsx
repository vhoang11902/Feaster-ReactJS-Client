import React, { useContext } from "react";
import { Drawer} from "antd";
import {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../pages/Frontend/CartContext";
function DrawerCart({ isOpenCart, onCloseCart }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useContext(CartContext);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, [setCartItems]);
  const deleteItem = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const minus = (item) => {
    item.quantity > 1 && item.quantity--;
    setCartItems([...cartItems]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const plus = (item) => {
    item.quantity < 10 && item.quantity++;
    setCartItems([...cartItems]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  return (
    <div>
      <Drawer
        Drawer
        title="Cart"
        placement="right"
        width={400}
        onClose={onCloseCart}
        open={isOpenCart}
      >
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-3 border-[1px] border-[#eee]">
                <div className="m-2 pb-2 border-[#eee] flex mx-[-15px] flex-wrap">
                  <div className="flex-[35%] max-w-[75%] px-4">
                    <div className="ml-2 max-h-[149px] max-w-[149px] min-h-[149px] w-full h-full bg-white flex justify-center items-center">
                      <img alt=""
                        src={`http://localhost/feaster/storage/app/public/products/${item.product.product_image}`}
                      ></img>
                    </div>
                  </div>
                  <div className="flex-[65%] max-w-[75%] px-4 text-sm">
                    <div className="">
                      <div className="max-w-full h-11">
                        <span
                          onClick={() =>
                            navigate(`/product/${item.product.product_id}`)
                          }
                          className="inline-block mt-2 text-base font-medium hover:text-primary-600 cursor-pointer transition-all"
                        >
                          {item.product.product_name}
                        </span>
                      </div>
                      <div className="max-w-full">
                        {item.product.attr_value.map((attr, index) => {
                          const match = Object.values(item.attributes).find(
                            (value) => attr.attr_value_id === value
                          );
                          return match ? (
                            <span key={index} className="font-thin">
                              {attr.value}
                              {index !== item.product.attr_value.length - 1 &&
                                ", "}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <div className="max-w-full h-11 mt-2">
                        <div className="items-center flex flex-wrap justify-between">
                          <div className="flex ">
                            <button
                              onClick={() => minus(item)}
                              className="h-[30px] w-[30px] text-sm border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md font-medium"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="h-[30px] w-[30px] mx-1 text-center text-sm border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md "
                            />
                            <button
                              onClick={() => plus(item)}
                              className="h-[30px] w-[30px] text-sm border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md font-semibold"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-sm font-medium pr-5">
                            {Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                              .format(item.price)
                              .replace(/\.00$/, "")}
                          </div>
                        </div>
                        <div className="flex-[100%] flex text-base font-medium pr-5 py-4 justify-between">
                          <span>Total: </span>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                            .format(item.price * item.quantity)
                            .replace(/\.00$/, "")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t-[1px] border-[#eee] h-[45px] flex">
                  <div className="flex-[65%]"></div>
                  <div
                    disabled={cartItems.length === null}
                    onClick={() => deleteItem(item)}
                    className="flex-[35%] flex items-center justify-center text-center p-[10px] border-l-[1px] cursor-pointer hover:bg-[#f9f9f9]"
                  >
                    <button className="">
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="ml-1">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="mt-2">
          <button
            disabled={cartItems === null}
            onClick={() => navigate("/checkout")}
            className="w-full text-sm font-medium text-white bg-black px-4 py-3 mb-5 rounded-md text-center hover:bg-[#595e62] hover:transition-all cursor-pointer"
          >
            CHECKOUT
          </button>
        </div>
        <div className="mt-2">
          <button
            disabled={cartItems === null}
            onClick={() => navigate("/cart")}
            className="w-full text-sm font-medium border-2 text-black bg-white px-4 py-3 mb-5 rounded-md text-center hover:bg-[#595e62] hover:transition-all hover:text-white cursor-pointer"
          >
            VIEW ALL CART
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerCart;
