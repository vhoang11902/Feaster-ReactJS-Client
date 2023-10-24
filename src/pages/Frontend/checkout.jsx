import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faTruck,
  faTruckRampBox,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "../../components/Breadcrumb/breadCrumb";
import request from "../../utils/request";
function CheckOut() {
  const navigate = useNavigate();
  const routesCheckOut = [
    { path: "/" },
    { path: "/cart", name: "Cart" },
    { name: "Check Out" },
  ];
  const routesPayment = [
    { path: "/" },
    { path: "/cart", name: "Cart" },
    { name: "Check Out" },
    {name:"Payment"},
  ];
  const [cartItems, setCartItems] = useState([]);
  const cartItemsRef = useRef(cartItems)
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const infoRef = useRef(info);
  const totalRef = useRef(total);
  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [editing, setEditing] = useState(true);
  const paymentElement = useRef(null);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    let sum = 0;
    let count = 0;
    if (cartItems !== null) {
      cartItems.forEach((item) => {
      sum += item.quantity * item.price;
      count++;
    });
  }
  setIndex(count);
    setTotal(sum);
  }, [cartItems]);

  const handleEdit = (e) => {
    e.preventDefault();
    setShowPayment(false);
    setEditing(true);
  };

  // Check Input value

  const handlePayment = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!info.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }

    if (!info.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    }

    if (!info.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!info.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (info.phoneNumber.length < 10) {
      validationErrors.phoneNumber = "Phone number should be at least 6 char";
    }

    if (!info.address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (!info.state.trim()) {
      validationErrors.state = "State is required";
    }
    if (!info.city.trim()) {
      validationErrors.city = "City is required";
    }
    if (!info.country.trim()) {
      validationErrors.country = "Country is required";
    }
    if (!info.postalCode.trim()) {
      validationErrors.postalCode = "Postal Code is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setShowPayment(true);
      setEditing(false);
    }
  };

  // place Order Paypal
  useEffect(() => {
    cartItemsRef.current = cartItems;
  },[cartItems]);
  useEffect(() => {
    totalRef.current = total
  }, [total]);

    useEffect(() => {
    infoRef.current = info;
  },[info]);


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalRef.current,
          },
        },
      ],
    });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const orderData = {
        user: infoRef,
        cartItems: cartItemsRef.current,
        status: details.status,
        total: totalRef.current,
      }
      // console.log(orderData)
      request
        .post(`/orderPlace`, orderData)
        .then((response) => {
          console.log(response)
          localStorage.removeItem("cartItems");
          setCartItems([]);
          navigate(`/orderPlace/${response.data}`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <div className="">
      <div className="mb-6">
        <div style={{ display: showPayment ? "none" : "block" }}>
          <BreadCrumb routes={routesCheckOut} />
        </div>
        <div style={{ display: !editing ? "block" : "none" }}>
          <BreadCrumb routes={routesPayment} />
        </div>
      </div>
      <div className="mb-6 flex max-lg:block">
        <div className="flex-[70%]  font-semibold mr-8 max-lg:mb-4 ">
          <h2 className="mb-2 text-2xl">Secure Checkout</h2>
          <h2
            style={{ display: showPayment ? "none" : "block" }}
            className=" text-4xl"
          >
            My Details
          </h2>
          <h2
            style={{ display: !editing ? "block" : "none" }}
            className=" text-4xl"
          >
            Review Order
          </h2>
        </div>
        {/* cart header */}
        <div className="flex-[30%] bg-[#f9f9f9]">
          <div className="px-6 py-[10px] flex justify-between items-center max-lg:px-2">
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
          {/* inputInfo */}
          <div
            name="inputInfo"
            style={{ display: showPayment ? "none" : "block" }}
          >
            <div className="mb-6 flex max-lg:block ">
              <div className="flex-[50%] mx-2">
                <div className="mb-2">First Name:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.firstName}
                  onChange={(e) =>
                    setInfo({ ...info, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">Last Name:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.lastName}
                  onChange={(e) =>
                    setInfo({ ...info, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-6 flex max-lg:block">
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">Phone Number:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.phoneNumber}
                  onChange={(e) =>
                    setInfo({ ...info, phoneNumber: e.target.value })
                  }
                />
                {errors.phoneNumber && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">Email:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
                {errors.email && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-6">
              <div className="mx-2">
                <div className=" mb-2">Address:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.address}
                  onChange={(e) =>
                    setInfo({ ...info, address: e.target.value })
                  }
                />
                {errors.address && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-6 flex max-lg:block">
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">City:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.city}
                  onChange={(e) => setInfo({ ...info, city: e.target.value })}
                />
                {errors.city && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">State:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.state}
                  onChange={(e) => setInfo({ ...info, state: e.target.value })}
                />
                {errors.state && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.state}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-6 flex max-lg:block">
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">Country:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.country}
                  onChange={(e) =>
                    setInfo({ ...info, country: e.target.value })
                  }
                />
                {errors.country && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.country}
                  </span>
                )}
              </div>
              <div className="flex-[50%] mx-2">
                <div className=" mb-2">Postal Code:</div>
                <input
                  className={`w-full h-[2.875rem] rounded-md border-[1px] border-[#CED4DA] py-3 px-5 focus:outline-none bg-[#f9f9f9] "bg-gray-200" : ""
                  }`}
                  placeholder="Label"
                  value={info.postalCode}
                  onChange={(e) =>
                    setInfo({ ...info, postalCode: e.target.value })
                  }
                />
                {errors.postalCode && (
                  <span className="text-red-700 text-xs font-thin">
                    {errors.postalCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Review order */}
          <div
            name="reviewOrder"
            style={{ display: !editing ? "block" : "none" }}
          >
            {cartItems === null ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="mb-6 border-[1px] border-[#eee]"
                  >
                    <div className="m-3 pb-4 border-[#eee] flex mx-[-15px] flex-wrap">
                      <div className="flex-[25%] max-w-[75%] px-4">
                        <div className="ml-4 max-h-[149px] max-w-[149px] min-h-[149px] w-full h-full bg-white flex justify-center items-center">
                          <img
                            src={`http://localhost/feaster/storage/app/public/products/${item.product.product_image}`}
                            alt=""
                          ></img>
                        </div>
                      </div>
                      <div className="flex-[75%] max-w-[75%] px-4 text-sm">
                        <div className="">
                          <div className="max-w-full h-11">
                            <p className="inline-block mt-2 text-base font-medium">
                              {item.product.product_name}
                            </p>
                          </div>
                          <div className="max-w-full">
                            {item.product.attr_value.map((attr, index) => {
                              const match = Object.values(item.attributes).find(
                                (value) => attr.attr_value_id === value
                              );
                              return match ? (
                                <span key={index} className="font-thin">
                                  {attr.value}
                                  {index !==
                                    item.product.attr_value.length - 1 && ", "}
                                </span>
                              ) : null;
                            })}
                          </div>
                          <div className="max-w-full h-11">
                            <div className="items-center flex flex-wrap">
                              <div className="text-sm font-medium flex-[40%] ">
                                {Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })
                                  .format(item.price)
                                  .replace(/\.00$/, "")}
                              </div>
                              <div className="text-sm font-medium flex-[25%] ">
                                Quantity: {item.quantity}
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
                  </div>
                ))}
              </div>
            )}
          </div>
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
          {editing ? (
            <button
              onClick={handlePayment}
              className="w-full text-sm font-medium text-white bg-black px-4 py-3 mb-5 rounded-md text-center hover:bg-[#595e62] hover:transition-all cursor-pointer"
            >
              CHECKOUT
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full text-sm font-medium text-white bg-black px-4 py-3 mb-5 rounded-md text-center hover:bg-[#595e62] hover:transition-all cursor-pointer"
            >
              EDIT YOUR INFORMATION
            </button>
          )}
          <div
            className=""
            ref={paymentElement}
            id="payment"
            style={{ display: showPayment ? "block" : "none" }}
          >
            <PayPalScriptProvider
              options={{
                clientId:
                  "Ad3OrLX9-Ngua6bgco39oNrqV-6KoYgIzy_30VfLyfncj14_2CkctoA8x4SFlNRYU3rMYWYXVYldhUe0",
              }}
            >
              <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
            </PayPalScriptProvider>
          </div>

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
        <div className="flex justify-center px-40">
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faTruck} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full">Delivery Options</div>
            <div className="font-thin text-sm">
              Click+Collect in store or have your items delivered straight to
              your door.
            </div>
          </div>
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faTruckRampBox} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full">
              Homewares Change of Mind Policy
            </div>
            <div className="font-thin text-sm">
              We want you to love your new Freedom product as much as we do.
              Return or exchange selected products within 30 days. Conditions
              and exclusions apply.
            </div>
          </div>
          <div className="flex-[25%] py-[3%] px-[2%] text-center">
            <div className="py-8">
              <FontAwesomeIcon icon={faCreditCard} size="2xl" />
            </div>
            <div className="font-semibold text-lg w-full">
              Flexible Payment Options
            </div>
            <div className="font-thin text-sm">
              Buy now, pay later with flexible payment options to suit you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
