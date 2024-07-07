import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  selectProduct,
} from "../../redux/features/cartSlice";

function Cart() {
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const handleDeleteProduct = async (id) => {
    console.log(id);
    dispatch(removeProduct(id));
  };

  const carts = useSelector((store) => store.cart.products);
  console.log(carts);
  console.log(carts);
  const columns = [
    {
      title: "San Pham",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Hinh anh mo ta",
      dataIndex: "ImageURL",
      key: "ImageURL",
      align: "center",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
    {
      title: "Chi tiet",
      dataIndex: "Cate",
      key: "Cate",
      align: "center",
    },
    {
      title: "So luong",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity, record) => (
        <div>
          <Button
            shape="circle"
            icon="-"
            onClick={() => {
              dispatch(decreaseQuantity(record.id));
            }}
          />
          <span style={{ margin: "0 8px" }}>{quantity}</span>
          <Button
            shape="circle"
            icon="+"
            onClick={() => dispatch(increaseQuantity(record.id))}
          />
        </div>
      ),
    },
    {
      title: "Hanh dong",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => handleDeleteProduct(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const count = checked.reduce((total, id) => total + id.quantity, 0);

  console.log(count);
  return (
    <div className="justify-items-center flex flex-col items-center ">
      <div className="rounded-xl shadow-md duration-200 relative z-40 bg-white/50 bottom-1 w-full">
        <div className="flex justify-between items-center py-6 px-6">
          <div className="flex justify-center items-center">
            <ShoppingOutlined className="px-5 text-2xl " />
            <h1 className="text-xl font-mono">Shopping Cart</h1>
          </div>
          <CloseOutlined className="px-5" />
        </div>
      </div>

      <div className="py-1 w-full">
        <Table
          columns={columns}
          dataSource={carts}
          bordered
          className="w-11/12 m-auto"
          rowKey="id"
          rowSelection={{
            onChange: (id, value) => {
              setChecked(value);
            },
          }}
        />
      </div>
      <div></div>
      <div className="flex justify-between w-full px-40 py-20">
        <h1>Tong So Luong Mua: </h1>
        <button
          className="rounded-lg bg-black text-white py-1 px-10"
          onClick={() => {
            dispatch(selectProduct(checked));
            window.location.href = "/orderreview";
          }}
        >
          Mua hàng ({count})
        </button>
      </div>
    </div>
  );
}

export default Cart;
