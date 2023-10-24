import CartContext from "./CartContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleQuestion,
  faTruck,
  faTruckRampBox,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "../../components/Breadcrumb/breadCrumb";
function Cart() {
  const navigate = useNavigate();
  const routes = [
    { path: "/" },
    { name:"Cart"}
  ];
  const [cartItems, setCartItems] = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, [cartItems]);
  useEffect(() => {
    setTotal(calculateTotal(cartItems));
  }, [cartItems]);
  const calculateTotal = (cartItems) => {
    let sum = 0;
    let count = 0;
    if (cartItems !== null) {
      cartItems.forEach((item) => {
        count++;
        sum += item.quantity * item.price;
      });
    }
    setIndex(count);
    return sum;
  };
  const deleteItem = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
    // cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    // tính tổng lại sau khi xóa sản phẩm
    setTotal(calculateTotal(newCartItems));
  };

  const minus = (item) => {
    item.quantity > 1 && item.quantity--;
    setCartItems([...cartItems]);
    // cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // tính tổng lại sau khi giảm số lượng sản phẩm
    setTotal(calculateTotal(cartItems));
  };

  const plus = (item) => {
    item.quantity < 10 && item.quantity++;
    setCartItems([...cartItems]);
    // cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // tính tổng lại sau khi tăng số lượng sản phẩm
    setTotal(calculateTotal(cartItems));
  };

  return (
    <div className="mx-[100px] mt-5 mb-5 max-lg:mx-[20px]">
              <div className="mb-6">
    <BreadCrumb  routes={routes} />
    </div>
      <div className="mb-6 flex max-lg:block">
        <div className="flex-[70%] text-4xl font-semibold mr-8">
          <h2 className="mb-2">My Cart</h2>
        </div>
        {/* cart header */}
        <div className="flex-[30%] bg-[#f9f9f9]">
          <div className="px-6 py-[10px] flex justify-between items-center">
            <div className="px-4">
              <h1 className=" text-lg font-semibold">{index} items</h1>
            </div>
            <div className="text-right px-4">
              <div className="h-[18px] text-sm">Order Total</div>
              <div className="h-[18px] font-semibold text-[16px] leading-2">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(total)
                  .replace(/\.00$/, "")}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cart content */}
      <div className="pt-6 flex max-lg:block">
        <div className="flex-[70%] block box-border">
          {cartItems === null ?(
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="mb-6 border-[1px] border-[#eee]">
                  <div className="m-3 pb-4 border-[#eee] flex mx-[-15px] flex-wrap">
                    <div className="flex-[25%] max-w-[75%] px-4">
                      <div className="ml-4 max-h-[149px] max-w-[149px] min-h-[149px] w-full h-full bg-white flex justify-center items-center">
                        <img src={`http://localhost/feaster/storage/app/public/products/${item.product.product_image}`}
                        alt=""></img>
                      </div>
                    </div>
                    <div className="flex-[75%] max-w-[75%] px-4 text-sm">
                      <div className="cursor-pointer">
                        <div onClick={() => navigate(`/product/${item.product.product_id}`)} className="max-w-full h-11">
                          <span  className="inline-block mt-2 text-base font-medium">
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
                        <div className="max-w-full h-11">
                          <div className="items-center flex flex-wrap">
                            <div className="text-sm font-medium flex-[40%] max-lg:flex-[20%]">
                              {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              })
                                .format(item.price)
                                .replace(/\.00$/, "")}
                            </div>
                            <div className="flex-[25%] ">
                              <div className="flex flex-row justify-center items-center">
                                <button
                                  onClick={() => minus(item)}
                                  className="h-[44px] w-[44px] max-lg:h-[25px] max-lg:w-[25px] max-lg:text-sm text-lg border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md font-medium"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  className="h-[44px] w-[44px] max-lg:h-[25px] max-lg:w-[25px] max-lg:text-sm mx-1 text-center text-lg border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md "
                                />
                                <button
                                  onClick={() => plus(item)}
                                  className="h-[44px] w-[44px] max-lg:h-[25px] max-lg:w-[25px] max-lg:text-sm text-lg border-[1px] border-[#eee] bg-[#f9f9f9] rounded-md font-semibold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex-[35%] text-sm font-medium text-right px-4">
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
                  </div>
                  <div className="border-t-[1px] border-[#eee] h-[60px] flex">
                    <div className="flex-[85%]"></div>
                    <div
                      onClick={() => deleteItem(item)}
                      className="flex-[15%] flex items-center justify-center text-center p-[10px] border-l-[1px] cursor-pointer hover:bg-[#f9f9f9]"
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
          )}
        </div>
        <div className="flex-[30%] ml-8 bg-[#f9f9f9] p-4 max-lg:ml-0">
          <h4 className="font-semibold mb-4 uppercase">ORDER SUMMARY</h4>
          <div className="mt-4 ">
            <div className="mb-2 flex justify-between text-sm font-thin">
              <div className="">Product Total</div>
              <div className="text-right">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(total)
                  .replace(/\.00$/, "")}
              </div>
            </div>
            <div className="mb-2 flex justify-between text-sm font-thin">
              <div className="">Shipping Fee</div>
              <div className="text-right">Free</div>
            </div>
            <div className="pt-5 mb-5 mt-4 border-t-[1px] border-[#eee] flex items-center justify-between">
              <div className="font-medium text-lg">Total</div>
              <div className="font-semibold text-xl">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(total)
                  .replace(/\.00$/, "")}
              </div>
            </div>
          </div>
          <button
            disabled={cartItems === null}
            onClick={() => navigate("/checkout")}
            className="w-full text-sm font-medium text-white bg-black px-4 py-3 mb-5 rounded-md text-center hover:bg-[#595e62] hover:transition-all cursor-pointer"
          >
            CHECKOUT
          </button>
          <div className="mt-2 min-h-[44px]">
            <div className="flex justify-center cursor-pointer">
              <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
              <span className="pl-2">Contact Us</span>
            </div>
          </div>
        </div>
      </div>
      {/* cart foooter */}
      <div className="mt-20 bg-[#f9f9f9] justify-center">
        <h1 className="font-semibold text-xl py-2 flex justify-center">
          Online ordering made easy
        </h1>
        <div className="flex justify-center px-40 max-lg:px-0">
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faTruck} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full max-lg:text-base ">Delivery Options</div>
            <div className="font-thin text-sm max-lg:text-xs">
              Click+Collect in store or have your items delivered straight to
              your door.
            </div>
          </div>
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faTruckRampBox} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full max-lg:text-base ">
              Homewares Change of Mind Policy
            </div>
            <div className="font-thin text-sm max-lg:text-xs">
              We want you to love your new Freedom product as much as we do.
              Return or exchange selected products within 30 days. Conditions
              and exclusions apply.
            </div>
          </div>
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faCreditCard} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full max-lg:text-base ">
              Flexible Payment Options
            </div>
            <div className="font-thin text-sm max-lg:text-xs">
              Buy now, pay later with flexible payment options to suit you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
