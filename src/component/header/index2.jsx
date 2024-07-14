import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/counterSlice";

function HeaderAdmin() {
  const dispatch = useDispatch();

  const items = [
    {
      key: "1",
      label: "Admin Name",
      icon: <SmileOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            dispatch(logout());
            window.location.href = "/login1";
          }}
        >
          Logout
        </a>
      ),
    },
  ];
  return (
    <div className="flex justify-between border py-3 px-10 mb-7 shadow-md">
      <h2 className="font-bold text-xl">Trang tổng quan về JeWellry</h2>
      <div className="flex gap-1">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}

export default HeaderAdmin;
