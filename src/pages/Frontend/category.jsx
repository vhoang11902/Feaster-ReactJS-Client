import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// api call
import request from "../../utils/request";
import ReactPaginate from "react-paginate";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BreadCrumb from "../../components/Breadcrumb/breadCrumb";

function Category() {
  const { id } = useParams();
  const [nameCategory, setNameCategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const routes = [
    { path: "/", name: "Home" },
    { path: `/category/${id}`, name: nameCategory },
  ];

  // State for sorting options
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    request
      .get(`/category/${id}`)
      .then((response) => {
        Object.values(response.data).map((cate) => {
          setNameCategory(cate.category_name);
          setProducts(cate.product);
          return true;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Copy array to avoid mutating original data
  const sortedProducts = [...products];

  if (sortValue === "low_to_high") {
    sortedProducts.sort((a, b) => a.product_price - b.product_price);
  } else if (sortValue === "high_to_low") {
    sortedProducts.sort((a, b) => b.product_price - a.product_price);
  }

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSelectProduct = (product_id) => {
    navigate(`/product/${product_id}?category=${nameCategory}`);
  };

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  return (
    <div className="mx-[100px] mt-5 mb-5 max-lg:mx-[20px]">
      <div className="mb-6">
        <BreadCrumb routes={routes} />
      </div>
      <div className="text-3xl font-bold ">{nameCategory}</div>
      <div className="flex justify-end py-3">
        <span className="pr-3"></span>
        <select
          value={sortValue}
          onChange={handleSortChange}
          className="focus:outline-none h-12 border-[1px] rounded-md px-3 max-lg:h-10"
        >
          <option value="" defaultValue>
            SORT BY RECCOMMEND
          </option>
          <option value="low_to_high">Price: Low to High</option>
          <option value="high_to_low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 px-10 pt-10">
        {currentProducts.map((product) => (
          <div
            onClick={() => handleSelectProduct(product.product_id)}
            key={product.product_id}
            className="w-full min-w-[250px] border-[1px] p-5 cursor-pointer hover:shadow-lg"
          >
            <div className="min-w-[200px] min-h-[250px] mb-5 flex justify-center">
              <img
                alt=""
                className=""
                src={`http://localhost/feaster/storage/app/public/products/${product.product_image}`}
              />
            </div>
            <div className="pt-7">
              <h2 className="font-semibold">{product.product_name}</h2>
              <h2 className="font-thin">Start from</h2>
              <span className="text-2xl font-semibold">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(product.product_price)
                  .replace(/\.00$/, "")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <ReactPaginate
          pageCount={Math.ceil(products.length / productsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center justify-center pb-4 pt-7"}
          disabledClassName={"text-gray-300 pointer-events-none"}
          previousClassName={"px-2 py-1 bg-white mr-3"}
          nextClassName={"px-2 py-1 bg-white ml-3"}
          pageClassName={"px-2 py-1 text-2xl"}
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} size="2xl" />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} size="2xl" />}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
        />
      </div>
    </div>
  );
}

export default Category;
