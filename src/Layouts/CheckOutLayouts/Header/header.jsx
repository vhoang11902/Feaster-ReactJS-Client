import logo from "../../../assets/logo-01.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
      <div className=" h-[100px] top-0 grid grid-cols-6 bg-white shadow-md max-lg:h-[80px]">
        <div className="col-span-2 flex items-center justify-start pl-3">
          <NavLink to="/home" className="p-6">
            <img
              src={logo}
              alt="Logo Feaster"
              className="w-[150px] cursor-pointer max-lg:"
            />
          </NavLink>
        </div>
      </div>
  );
}

export default Header;
