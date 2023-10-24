import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import CartContext from "./CartContext";
import DrawerCart from "../../components/CartDrawer/cartDrawer";
// api call
import request from "../../utils/request";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuestion } from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "../../components/Breadcrumb/breadCrumb";
function Product() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category_name = searchParams.get("category");
  const [quantity, setQuantity] = useState(1);
  const minus = () => {
    quantity > 1 && setQuantity((quantity) => quantity - 1);
  };
  const plus = () => {
    quantity < maxQuantity && setQuantity((quantity) => quantity + 1);
  };
  const [selectedValues, setSelectedValues] = useState({});
  const [attribute, setAttribute] = useState([]);
  const [proData, setProData] = useState([]);
  const [cartItems, setCartItems] = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("DESCRIPTION"); // Giá trị ban đầu là tab DESCRIPTION
  const [newPrice, setNewPrice] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const routes = [
    { path: "/" },
    {
      path: `/category/${proData.map((pro) => pro.category_id)}`,
      name: category_name,
    },
    {
      name: proData.map((pro) => pro.product_name),
    },
  ];
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleOpenCartDrawer = () => {
    setIsCartOpen(true);
  };

  const handleCloseCartDrawer = () => {
    setIsCartOpen(false);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const findMatchedSku = () => {
    let matchedSku = null;
    proData.forEach((product) => {
      product.skus.forEach((sku) => {
        const variantValues = sku.variants.map(
          (variant) => variant.attr_value_id
        );
        const isMatched = Object.values(selectedValues).every((value) =>
          variantValues.includes(value)
        );
        if (isMatched) {
          matchedSku = sku;
        }
      });
    });
    return matchedSku;
  };
  useEffect(() => {
    // attribute
    request
      .get("/allAttribute")
      .then((response) => {
        setAttribute(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // product
    request
      .get(`/product/${id}`)
      .then((response) => {
        setProData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const matchedSku = findMatchedSku();
    if (matchedSku) {
      setNewPrice(matchedSku.price);
      setMaxQuantity(matchedSku.stock);
    } else {
      setNewPrice(null);
    }
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [selectedValues]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedSku = findMatchedSku();
    if (!matchedSku) {
      return;
    }

    const product = { ...proData[0], quantity };
    let updatedCartItems = [];

    if (Array.isArray(cartItems)) {
      const index = cartItems.findIndex(
        (item) =>
          item.product.product_id === product.product_id &&
          JSON.stringify(item.attributes) === JSON.stringify(selectedValues)
      );

      if (index === -1) {
        updatedCartItems = [
          ...cartItems,
          {
            id: matchedSku.sku_id,
            product: product,
            price: newPrice,
            quantity: quantity,
            attributes: selectedValues,
          },
        ];
      } else {
        updatedCartItems = cartItems.map((item, itemIndex) => {
          if (itemIndex === index) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }
    } else {
      updatedCartItems = [
        {
          id: matchedSku.sku_id,
          product: product,
          price: newPrice,
          quantity: quantity,
          attributes: selectedValues,
        },
      ];
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    handleOpenCartDrawer();
  };

  return (
    <div className="mx-[100px] mt-5 mb-5 max-lg:mx-[20px] max-w-[1600px] my-[auto]">
      <div className="mb-6">
        <BreadCrumb routes={routes} />
      </div>
      {proData.map((product) => (
        <div>
          <form onSubmit={handleSubmit}>
            <div
              key={product.product_id}
              className="max-w-[1600px] grid grid-cols-[42%,30%] gap-[8%] justify-center max-lg:block"
            >
              <div className="bg-blue-400">
                <div className="bg-white w-full h-full min-h-[529px] flex items-center max-lg:min-h-[329px]">
                  <img
                    alt=""
                    src={`http://localhost/feaster/storage/app/public/products/${product.product_image}`}
                    className="w-full"
                  ></img>
                </div>
              </div>
              <div className="">
                <h1 className="text-[22px] font-semibold leading-[1.08] mb-[14px]">
                  {product.product_name}
                </h1>
                <div className="mb-4">
                  <div className="text-[20px] font-semibold leading-[1.11] mb-[14px]">
                    {newPrice !== null
                      ? Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                          .format(newPrice)
                          .replace(/\.00$/, "")
                      : "Start from " +
                        Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                          .format(product.product_price)
                          .replace(/\.00$/, "")}
                  </div>
                  <div className="flex leading-[17px]">
                    <div className="cursor-pointer">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span className="pl-3 text-sm font-thin underline cursor-pointer">
                      49 Reviews
                    </span>
                  </div>
                </div>
                {attribute.map((attr) => (
                  <div key={attr.id} className="mb-5">
                    <div className="text-lg mb-2">
                      <h2>{attr.attr_name}</h2>
                    </div>
                    <div className="flex flex-wrap">
                      {product.attr_value.map((attrValue) =>
                        attr.id === attrValue.attr_id ? (
                          <label
                            key={attrValue.attr_value_id}
                            className="block mb-2"
                          >
                            <input
                              type="radio"
                              name={attr.attr_name}
                              value={attrValue.attr_value_id}
                              checked={
                                selectedValues[attr.id] ===
                                attrValue.attr_value_id
                              }
                              onChange={() =>
                                setSelectedValues({
                                  ...selectedValues,
                                  [attr.id]: attrValue.attr_value_id,
                                })
                              }
                              className="sr-only" // Ẩn input thực sự
                            />
                            <span
                              className={
                                "flex px-4 h-[40px] justify-center items-center my-1 mr-2 rounded-md cursor-pointer" +
                                (selectedValues[attr.id] ===
                                attrValue.attr_value_id
                                  ? " bg-primary-600 text-white"
                                  : " bg-gray-200 hover:bg-primary-600 hover:text-white")
                              }
                            >
                              {attrValue.value}
                            </span>
                          </label>
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-14 flex bg-[#f9f9f9]">
                  <div className="w-[12%] h-11 border-[#eee] border-y-[1px] border-l-[1px] border-r-[0.5px] flex justify-center items-center rounded-md rounded-tr-none rounded-br-none">
                    Qty
                  </div>
                  <div
                    onClick={minus}
                    className="w-[12%] border-[#eee] h-11 border-y-[1px] border-x-[0.5px] flex justify-center items-center text-xl hover:text-primary-600 cursor-pointer disabled:opacity-50"
                  >
                    -
                  </div>
                  <input
                    type="text"
                    className="w-[12%] h-11 text-lg border-[#eee] border-y-[1px] border-x-[0.5px] text-center bg-[#f9f9f9]"
                    value={quantity}
                    readOnly
                  />
                  <div
                    onClick={plus}
                    className="w-[12%] border-[#eee] h-11 border-y-[1px] border-x-[0.5px] flex justify-center items-center text-xl hover:text-primary-600 cursor-pointer disabled:opacity-50"
                  >
                    +
                  </div>
                  <button
                    type="submit"
                    className="w-[60%] h-11 border-[#eee] flex justify-center items-center text-white bg-black rounded-md rounded-tl-none rounded-bl-none cursor-pointer font-thin uppercase hover:bg-[#595e62] hover:transition-all"
                  >
                    Add To Cart
                  </button>
                  <DrawerCart
                    isOpenCart={isCartOpen}
                    onCloseCart={handleCloseCartDrawer}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="max-w-full">
            <div className="border-y-[1px] flex justify-center uppercase max-lg:block max-lg:mt-10 ">
              <div
                className={`mx-10 cursor-pointer hover:border-b-[4px] max-lg:mx-0 hover:border-black flex items-center h-[50px] `}
                onClick={() => handleTabClick("DESCRIPTION")}
              >
                DESCRIPTION + KEY FEATURES
              </div>
              <div
                className={`mx-10 cursor-pointer hover:border-b-[4px] max-lg:mx-0 hover:border-black flex items-center h-[50px]`}
                onClick={() => handleTabClick("CARE")}
              >
                CARE & WARRANTY
              </div>
              <div
                className={`mx-10 cursor-pointer hover:border-b-[4px] max-lg:mx-0 hover:border-black flex items-center h-[50px]`}
                onClick={() => handleTabClick("DELIVERY")}
              >
                DELIVERY
              </div>
            </div>
            <div className="flex flex-row max-lg:block">
              <div className="w-[70%] h-full py-[10px] max-lg:w-[100%]">
                {activeTab === "DESCRIPTION" && (
                  <div className=" px-[35px] pt-[24px]">
                  {product.product_desc}
                    {/* <div className="mb-[24px]">
                      <h1 className="text-[16px] uppercase mb-[8px]">
                        DESCRIPTION
                      </h1>
                      <div className="text-[14px] font-thin">
                        When unfussy style meets practical function, you get the
                        Freedom floating bed base. It’s set atop dainty yet
                        strong feet that create an illusion of floating. This
                        ensemble base is wrapped in a fabric upholstery that
                        enhances its simplicity and makes maintenance easy. The
                        upholstery is in taupe, a neutral colour that seamlessly
                        blends with most colour palettes. This is the perfect
                        addition to bedrooms and sparerooms - simply add your
                        mattress and you are ready to sleep.
                      </div>
                    </div>
                    <div className="mb-[24px]">
                      <h1 className="text-[16px] uppercase mb-[8px]">
                        KEY FEATURES
                      </h1>
                      <div className="font-thin text-[14px]">
                        <li>
                          Uses FSC certified timber – responsibly managed and
                          environmentally conscious
                        </li>
                        <li>
                          Floating design hides the legs and gives it a sleek,
                          contemporary look
                        </li>
                        <li>Minimalistic durable taupe fabric</li>
                        <li>
                          Australian made and backed by a 10-year warranty
                        </li>
                        <li>Queen size image shown</li>
                        <li>Colour: Taupe</li>
                        <li>Size: King Single</li>
                      </div>
                    </div>
                    <div className="mb-[24px]">
                      <h1 className="text-[16px] uppercase mb-[8px]">
                        SPECS & DETAILS
                      </h1>
                      <div className="font-thin text-[16px] mb-[4px]">
                        Assembled Product Dimensions
                      </div>
                      <div className="font-thin text-[14px]">
                        <li>Width: 106.7 cm</li>
                        <li>Depth: 203.2 cm</li>
                        <li>Height: 35 cm</li>
                        <li>Weight: 41 kg</li>
                      </div>
                    </div> */}
                  </div>
                )}
                {activeTab === "CARE" && (
                  <div className=" px-[35px] pt-[24px]">
                    <div className="mb-[24px]">
                      <h1 className="text-lg uppercase mb-[8px]">
                        CARE AND WARRANTY
                      </h1>
                      <div className="font-thin">
                        <li>Regularly clean dust with a soft dry cloth</li>
                        <li>
                          Avoid harsh chemicals and abrasives as this may cause
                          damage
                        </li>
                        <li>
                          Periodically check all hardware and bolt connections
                          are tight
                        </li>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "DELIVERY" && (
                  <div>ĐÂY LÀ COMPONENT CỦA DELIVERY</div>
                )}
              </div>
              <div className="w-[30%] mr-10 pt-6 max-lg:w-full">
                <div className="bg-[#f9f9f9] rounded-md">
                  <div className="absolute w-[25px] h-[25px] m-3 float-left  border-[2px] border-gray-400 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faQuestion}
                      style={{ color: "#606060" }}
                    />
                  </div>
                  <div className="relative mb-2 py-[13px] pr-[17px] pl-[56px]">
                    <h4 className="text-[18px] font-semibold">
                      Have a question?
                    </h4>
                    <div className="font-thin text-sm">
                      If you would like to know more we would love to help.
                      Visit our contact-us page or speak with a Live Chat team
                      member now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="max-w-full py-8 mb-16">
        <h1 className="text-2xl my-5 ">Related Product</h1>
        <div className="flex overflow-hidden transform-none h-[300px] flex-row">
          <div className="w-[201.833333px] mx-2 border-[1px]">
            <div className="bg-white h-[200px] flex items-center">
              <img
                alt=""
                src={`http://localhost/feaster/storage/app/public/uploads/product/2`}
                className=""
              ></img>
            </div>
            <div className="text-sm mb-3 min-h-[30px]">
              <h2>FREEDOM Floating Bed Base</h2>
            </div>
            <div>$99.95</div>
          </div>
          <div className="w-[201.833333px] mx-2 border-[1px]">
            <div className="bg-white h-[200px] flex items-center">
              <img
                alt=""
                src={`http://localhost/feaster/storage/app/public/uploads/product/2`}
                className=""
              ></img>
            </div>
            <div className="text-sm mb-3 min-h-[30px]">
              <h2>FREEDOM Floating Bed Base</h2>
            </div>
            <div>$99.95</div>
          </div>
          <div className="w-[201.833333px] mx-2 border-[1px]">
            <div className="bg-white h-[200px] flex items-center">
              <img
                alt=""
                src={`http://localhost/feaster/storage/app/public/uploads/product/2`}
                className=""
              ></img>
            </div>
            <div className="text-sm mb-3 min-h-[30px]">
              <h2>FREEDOM Floating Bed Base</h2>
            </div>
            <div>$99.95</div>
          </div>
          <div className="w-[201.833333px] mx-2 border-[1px]">
            <div className="bg-white h-[200px] flex items-center">
              <img
                alt=""
                src={`http://localhost/feaster/storage/app/public/uploads/product/2`}
                className=""
              ></img>
            </div>
            <div className="text-sm mb-3 min-h-[30px]">
              <h2>FREEDOM Floating Bed Base</h2>
            </div>
            <div>$99.95</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
