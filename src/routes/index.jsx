// layout
import { CheckOutLayouts, HomeLayouts } from "../Layouts";
import { Auth } from "../Layouts"
// Private
import Dashboard from "../pages/Admin/dashboard";
import AddCategory from "../pages/Admin/Category/add-category";
import AllCategory from "../pages/Admin/Category/all-category";
import AddProduct from "../pages/Admin/Product/add-product";
import AllProduct from "../pages/Admin/Product/all-product";
import EditCategory from "../pages/Admin/Category/edit-category";
import EditProduct from "../pages/Admin/Product/edit-product";
import AttrProduct from "../pages/Admin/Product/attr-product";
import Login from "../pages/Admin/Auth/login";
import Register from "../pages/Admin/Auth/register";
import Order from "../pages/Admin/Order/order";
// Public
import Home from "../pages/Frontend/home";
import Category from "../pages/Frontend/category";
import Product from "../pages/Frontend/product";
import ProductSearch from "../pages/Frontend/productSearch";
import Cart from "../pages/Frontend/cart";
import CheckOut from "../pages/Frontend/checkout";
import OrderPlace from "../pages/Frontend/orderPlace";
import OrderDetail from "../pages/Admin/Order/orderDetail";
import Comments from "../pages/Frontend/Comments";
// import CheckOut from "../pages/Frontend/checkout";
const publicRoutes = [
  {path: "/",component: Home,layout: HomeLayouts,},
  {path: "/home",component: Home,layout: HomeLayouts,},
  { path: "/login", component: Login, layout: Auth},
  { path: "/register", component: Register, layout: Auth },
  { path: "/cart", component: Cart, layout: HomeLayouts },
  {path: "/category/:id",component: Category,layout: HomeLayouts,},
  {path: "/product/:id",component: Product,layout: HomeLayouts,},
  {path: "/search/:id",component: ProductSearch,layout: HomeLayouts,},
  

  // Checkout
  { path: "/checkout", component: CheckOut, layout: CheckOutLayouts },
  { path: "/orderPlace/:orderId", component: OrderPlace, layout: CheckOutLayouts },

];

export { publicRoutes };
const privateRoutes = [
  { path: "/dashboard", component: Dashboard, private: true},
  { path: "/addCategory", component: AddCategory, private: true },
  { path: "/editCategory/:id", component: EditCategory, private: true },
  { path: "/allCategory", component: AllCategory, private: true },
  { path: "/addProduct", component: AddProduct, private: true },
  { path: "/allProduct", component: AllProduct, private: true },
  { path: "/allComments", component: Comments, private: true },
  { path: "/editProduct/:id", component: EditProduct, private: true },
  { path: "/attrProduct/:id", component: AttrProduct, private: true },
  { path: "/allOrder", component: Order, private: true },
  { path: "/orderDetail/:id", component: OrderDetail, private: true },
];

export { privateRoutes };
