import { DownOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

function HeaderAdmin() {
  return (
    <div className="flex justify-between border py-3 px-10 mb-7 shadow-md">
      <h2 className="font-bold text-xl">Trang tổng quan về JeWellry</h2>
      <div className="flex gap-1">
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        <DownOutlined />
      </div>
    </div>
  );
}

export default HeaderAdmin;
