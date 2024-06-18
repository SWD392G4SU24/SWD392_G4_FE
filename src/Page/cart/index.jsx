import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart() {
  const [dataSource, setDataSource] = useState([]);
  const handleDeleteProduct = async (id) => {
    console.log("delete movie", id);
    const response = await axios.delete(
      `https://6627a8d2b625bf088c092e93.mockapi.io/movies-netflix/${id}`
    );

    console.log(response);
    const listAfterDelete = dataSource.filter((movie) => movie.id !== id);
    setDataSource(listAfterDelete);
  };
  const columns = [
    {
      title: "San Pham",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster_path",
      align: "center",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
    {
      title: "Chi tiet",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Actions",
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
  async function fetchProducts() {
    const response = await axios.get(
      "https://6627a8d2b625bf088c092e93.mockapi.io/movies-netflix"
    );

    console.log(response.data);
    setDataSource(response.data);
  }
  useEffect(function () {
    fetchProducts();
  }, []);
  return (
    <div className="justify-items-center">
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
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          className="w-11/12 m-auto"
        />
      </div>
      <div className="py-2">
        <button className="rounded-sm bg-black text-white py-1 px-10">
          Thanh Toan
        </button>
      </div>
    </div>
  );
}

export default Cart;
