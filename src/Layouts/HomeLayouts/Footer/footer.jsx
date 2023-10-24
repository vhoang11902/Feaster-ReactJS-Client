import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,faFacebook,faYoutube, faTwitter
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-[#595e62] text-white pt-[70px] px-[150px] max-lg:px-[50px]">
      <div className="grid grid-cols-3 justify-between pb-[30px] max-lg:grid-cols-1">
        <div className="col-span-1 max-lg:grid-flow-row">
          <ul className="">
            <li className="text-xl mb-[20px] ">
              <h3>GET HELP</h3>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>Delivery Information</span>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>Product Care</span>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>Help Centre</span>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <ul>
            <li className="text-xl mb-[20px] ">
              <h3>INFORMATION</h3>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>Our Story</span>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>Contact Us</span>
            </li>
            <li className="pb-[12px] hover:pl-2 transition-all cursor-pointer">
              <span>As Seen In</span>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <ul>
            <li className="text-xl mb-[20px] ">
              <h3>SUBSCRIBE TO NEWSLETTERS</h3>
            </li>
            <li>
              <input className="w-[60%] h-[45px] p-4 z-10 relative text-lg border-2 rounded-md bg-white focus:outline-none text-black " placeholder="Your email" type="footer_right-join-email" />
              <button className="border-2 h-[45px] px-5 rounded-3xl ml-4 hover:bg-white hover:text-black focus:bg-none" >SUBMIT</button>
            </li>
            <div className="flex items-center pt-5">
              <span className="font-semibold text-lg pr-2 ">Follow us!</span>
              <span>
              <FontAwesomeIcon icon={faFacebook} size="2xl" style={{color: "#ffffff",}} className="px-4 py-2 cursor-pointer "/>
              </span>
              <span>
              <FontAwesomeIcon icon={faInstagram} size="2xl" style={{color: "#ffffff"} } className="px-4 py-2 cursor-pointer "/>
              </span>
              <span>
              <FontAwesomeIcon icon={faYoutube} size="2xl" className="px-4 py-2 cursor-pointer "/>
              </span>
              <span>
              <FontAwesomeIcon icon={faTwitter} size="2xl" className="px-4 py-2 cursor-pointer "/>
              </span>
            </div>
          </ul>
        </div>
      </div>
      <div className="border-t-2 mt-[25px] py-[25px] flex justify-end">
        <div className="justify-end items-center">Copyright © 2023 Feaster</div>

      </div>
    </footer>
  );
}

export default Footer;
