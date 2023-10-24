import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusOutlined,
  DropboxOutlined
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import "./sideBar.css";
function SideBar() {
  return (
    <aside className="max-lg:hidden">
      <Menu className="w-[302px] p-5 text-base" mode="inline" defaultSelectedKeys={["1"]}>
  <Menu.Item
    key="1"
    icon={<HomeOutlined />}
  >
    <NavLink to="/dashboard" className="">
      Dashboard
    </NavLink>
  </Menu.Item>
  
  <Menu.SubMenu key="2" icon={<AppstoreOutlined />} title="Category">
    <Menu.Item 
      key="2-1"
      icon={<PlusOutlined />}
    >
      <NavLink to="/addCategory" className="">
        Add Category
      </NavLink>
    </Menu.Item>
    <Menu.Item
      key="2-2"
      icon={<AppstoreOutlined />}
    >
      <NavLink to="/allCategory" className="">
        All Category
      </NavLink>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.SubMenu key="3" icon={<AppstoreOutlined />} title="Product">
    <Menu.Item 
      key="3-1"
      icon={<PlusOutlined />}
    >
      <NavLink to="/addProduct" className="">
        Add Product
      </NavLink>
    </Menu.Item>
    <Menu.Item 
      key="3-2"
      icon={<AppstoreOutlined />}
    >
      <NavLink to="/allProduct" className="">
        All Product
      </NavLink>
    </Menu.Item>
  </Menu.SubMenu>

  <Menu.Item
    key="4"
    icon={<DropboxOutlined />}
  >
    <NavLink to="/allOrder" className="">
      All Order
    </NavLink>
  </Menu.Item>
  <Menu.Item
    key="5"
    icon={<DropboxOutlined />}
  >
    <NavLink to="/allComments" className="">
      All Comments
    </NavLink>
  </Menu.Item>
</Menu>
    </aside>
  );
}

export default SideBar;
