import { Tabs } from "antd";
import React from "react";
import Accounts from "../accounts";
import Revenue from ".";

function AdminPage2() {
  const items = [
    {
      key: "1",
      label: "Quản lý doanh thu",
      children: <Revenue />,
    },
    {
      key: "2",
      label: "Tài khoản",
      children: <Accounts />,
    },
  ];
  return (
    <div className=" dark:text-white  dark:bg-black">
      <Tabs
        centered
        defaultActiveKey="1"
        items={items}
        onChange={(value) => {
          console.log(value);
        }}
        className="dark:text-white"
      />
    </div>
  );
}

export default AdminPage2;
