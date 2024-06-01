import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DarkMode from "./darkmode";
import { Link } from "react-router-dom";

function Header() {
  return (
    //
    <div className="header shadow-md bg-white dark:bg-black/85 dark:text-white duration-200 relative z-40">
      <div className="py-2">
        <div className="container flex justify-between items-center">
          <Link to={``}>
            <div className="header__logo font-serif text-2xl sm:text-3xl flex gap-2 items-center">
              <img
                src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00319_DIAMOND_Jewelry-03.png"
                width={80}
              />
              JeWellry
            </div>
          </Link>
          <div className="flex justify-between items-center gap-4">
            <div className="header__search relative group hidden sm:block">
              <input
                type="text"
                placeholder=" Search..."
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-200 dark:border-gray-500 dark:bg-gray-800"
              />
              <SearchOutlined className="search__logo text-gray-500 group-hover:text-orange-200 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            <button className="bg-gradient-to-r from-orange-200 to-orange-400 dark:from-gray-600 dark:text-white dark:bg-orange-300 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <ShoppingCartOutlined className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-orange-200 to-orange-400 dark:from-gray-600 dark:text-white dark:bg-orange-300 text-white rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-300">
              <UserOutlined />
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
