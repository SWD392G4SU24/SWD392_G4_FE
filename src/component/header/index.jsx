import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DarkMode from "./darkmode";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Dropdown, Menu, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { clearCart } from "../../redux/features/cartSlice";
import { clearOrderID } from "../../redux/features/orderSlice";
import { resetSelectedCustomer } from "../../redux/features/customerSlice";
import { IoMdLogOut } from "react-icons/io";

function Header() {
  const carts = useSelector((store) => store.cart.products);
  const user = useSelector(selectUser);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserIconClick = () => {
    navigate("/profile");
  };
  const items = [
    {
      key: "1",
      label: <a href="/proall">Xem tất cả</a>,
    },
    {
      key: "2",
      label: <a href="/dc">Dây Chuyền</a>,
    },
    {
      key: "3",
      label: <a href="/vt">Vòng tay</a>,
    },
    {
      key: "4",
      label: <a href="/n">Nhẫn</a>,
    },
    {
      key: "5",
      label: <a href="/ht">Hoa tai</a>,
    },
    {
      key: "6",
      label: <a href="/dh">Đồng hồ</a>,
    },
    {
      key: "7",
      label: <a href="/kg">Kiềng</a>,
    },
    {
      key: "8",
      label: <a href="/lac">Lắc</a>,
    },
  ];
  const userMenuItems = [
    {
      key: "1",
      label: <h1 className="text-sm font-bold">{user?.username}</h1>,
    },
    {
      key: "2",
      label: (
        <a href="/profile" className="text-base">
          Thông tin của tôi
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            dispatch(logout());
            dispatch(clearCart());
            dispatch(clearOrderID());
            dispatch(resetSelectedCustomer());
            navigate("/");
          }}
        >
          <div className="flex justify-center gap-5 text-red-500 text-base">
            <IoMdLogOut />
            <h3>Đăng xuất</h3>
          </div>
        </a>
      ),
    },
  ];

  return (
    //
    <div className="header shadow-md bg-white dark:bg-black/85 dark:text-white duration-200 relative z-40">
      <div className="py-2">
        <div className="container flex justify-between items-center">
          <div className="flex gap-10">
            <Link to={``}>
              <div className="header__logo font-serif text-2xl sm:text-3xl flex gap-2 items-center">
                <img
                  src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00319_DIAMOND_Jewelry-03.png"
                  width={80}
                />
                JeWellry
              </div>
            </Link>

            <Dropdown menu={{ items, selectable: true }}>
              <Space className="font-semibold cursor-pointer hover:text-amber-700 dark:text-white">
                Sản phẩm
              </Space>
            </Dropdown>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div className="header__search relative group hidden sm:block">
              <input
                type="text"
                placeholder="  Search..."
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-200 dark:border-gray-500 dark:bg-gray-800"
              />
              <SearchOutlined className="search__logo text-gray-500 group-hover:text-orange-200 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            <Badge count={carts ? carts.length : 0}>
              <button className="bg-gradient-to-r from-orange-200 to-orange-400 dark:from-gray-600 dark:text-white dark:bg-orange-300 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
                <span className="group-hover:block hidden transition-all duration-200">
                  Order
                </span>
                <ShoppingCartOutlined
                  className="text-xl text-white drop-shadow-sm cursor-pointer"
                  onClick={() => {
                    window.location.href = "/cart";
                  }}
                />
              </button>
            </Badge>
            <div className="">
              {user?.token && user?.username ? (
                <Dropdown overlay={<Menu items={userMenuItems} />}>
                  <div
                    className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-orange-200 to-orange-400 dark:from-gray-600 dark:text-white dark:bg-orange-300 text-white rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                    onClick={handleUserIconClick}
                  >
                    <UserOutlined />
                  </div>
                </Dropdown>
              ) : (
                <Link
                  to={"/login1"}
                  className="px-4 py-2 bg-gradient-to-r from-orange-200 to-orange-400 dark:from-gray-600 dark:text-white dark:bg-orange-300 text-white rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-300"
                >
                  Đăng nhập
                </Link>
              )}
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
