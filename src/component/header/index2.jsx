import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import DarkMode from "./darkmode";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cartSlice";
import { clearOrderID } from "../../redux/features/orderSlice";
import { resetSelectedCustomer } from "../../redux/features/customerSlice";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  console.log(user);

  const items = [
    {
      key: "1",
      label: <p>{user?.username}</p>,
      icon: <SmileOutlined />,
    },
    {
      key: "2",
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
          Logout
        </a>
      ),
    },
  ];
  return (
    <div className="flex justify-between border py-3 px-10 shadow-md dark:bg-black dark:text-white ">
      <h2 className="font-bold text-xl">Trang tổng quan về JeWellry</h2>
      <div className="flex gap-3">
        <div className="flex gap-1">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
        <div>
          <DarkMode />
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
