import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, message } from "antd";
import React from "react";

function Cart() {
  const columns = [
    {
      title: "San Pham",
      dataIndex: "",
    },
    {
      title: "Chi tiet",
      dataIndex: "",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: () => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="">
      <div className="rounded-xl shadow-2xl duration-200 relative z-40 bg-white/50 bottom-1">
        <div className="flex justify-between items-center py-6 px-6">
          <div className="flex justify-center items-center">
            <ShoppingOutlined className="px-5 text-2xl " />
            <h1 className="text-xl font-mono">Shopping Cart</h1>
          </div>
          <CloseOutlined className="px-5" />
        </div>
      </div>
      <div className="py-1">
        <Table columns={columns} />
      </div>
      <div className="py-2 ">
        <button className="rounded-sm bg-black text-white py-1 px-10">
          Thanh Toan
        </button>
      </div>
    </div>
  );
}

export default Cart;
