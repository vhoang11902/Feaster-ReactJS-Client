import { FaMagnifyingGlass, FaUserLarge, FaBars } from "react-icons/fa6";
import logo from "../../../assets/logo-01.png";
import React, { useState } from "react";
import { Drawer, Menu, Popover } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import requestPrivate from "../../../utils/requestPrivate";

function Header() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    requestPrivate
      .post('/logout',)
      .then((response) => {
        navigate("/login");
        console.log(localStorage.getItem('auth-token'))
        localStorage.removeItem('auth-token');
        console.log(localStorage.getItem('auth-token'))
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const content =
    ((
      <div>
        <NavLink to="/dashboard" className="">
          Dashboard
        </NavLink>
      </div>
    ),
    (
      <div>
        <div onClick={handleLogout} className="cursor-pointer">
          Logout
        </div>
      </div>
    ));
  const text = <span>Title</span>;
  return (
    <div className="sticky top-0 bg-white h-[60px] grid grid-cols-5 bg-blue shadow-lg z-30">
      <div className="flex col-span-1 items-center justify-start pl-7">
        <NavLink to="/home" className="">
          <img
            src={logo}
            alt="Logo Feaster"
            className="w-[120px] cursor-pointer"
          />
        </NavLink>
      </div>
      <div className="flex col-span-4 items-center justify-between px-9 ">
        <FaBars className="lg:hidden" type="primary" onClick={showDrawer} />
        <Drawer
          Drawer
          title="Menu"
          placement="left"
          width={300}
          onClose={onClose}
          open={open}
        >
          <Menu className="" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/" className="">
                Dashboard
              </NavLink>
            </Menu.Item>
            <Menu.SubMenu key="2" icon={<AppstoreOutlined />} title="Category">
              <Menu.Item key="2-1" icon={<PlusOutlined />}>
                <NavLink to="/addCategory" className="">
                  Add Category
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2-2" icon={<AppstoreOutlined />}>
                <NavLink to="/allCategory" className="">
                  All Category
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="3" icon={<AppstoreOutlined />} title="Product">
              <Menu.Item key="3-1" icon={<PlusOutlined />}>
                <NavLink to="/addProduct" className="">
                  Add Product
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3-2" icon={<AppstoreOutlined />}>
                <NavLink to="/allProduct" className="">
                  All Product
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Drawer>
        <div className="flex items-center">
          <span className="mr-4">
            <FaMagnifyingGlass />
          </span>
          <input
            className="border-none focus:outline-none bg-none"
            placeholder="Search now"
          ></input>
        </div>
        <div>
          <span>
            <Popover
              placement="bottomRight"
              title={text}
              content={content}
              trigger="click"
            >
              <FaUserLarge className="cursor-pointer" />
            </Popover>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
