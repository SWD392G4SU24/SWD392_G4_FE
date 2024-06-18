import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [quantities, setQuantities] = useState({});
  const handleDeleteProduct = async (id) => {
    console.log("delete movie", id);
    const response = await axios.delete(
      `https://6627a8d2b625bf088c092e93.mockapi.io/movies-netflix/${id}`
    );

    console.log(response);
    const listAfterDelete = dataSource.filter((movie) => movie.id !== id);
    setDataSource(listAfterDelete);
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };
  const columns = [
    {
      title: "San Pham",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hinh anh mo ta",
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
      title: "Quantity",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <div>
          <Button
            shape="circle"
            icon="-"
            onClick={() =>
              handleQuantityChange(id, Math.max(0, quantities[id] - 1))
            }
          />
          <span style={{ margin: "0 8px" }}>{quantities[id]}</span>
          <Button
            shape="circle"
            icon="+"
            onClick={() => handleQuantityChange(id, quantities[id] + 1)}
          />
        </div>
      ),
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

    const initialQuantities = {};
    response.data.forEach((movie) => {
      initialQuantities[movie.id] = 1;
    });
    setQuantities(initialQuantities);
  }
  useEffect(function () {
    fetchProducts();
  }, []);

  const count = selectedRowKeys.reduce(
    (total, key) => total + quantities[key],
    0
  );

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
          dataSource={dataSource}
          bordered
          className="w-11/12 m-auto"
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      </div>
      <div></div>
      <div className="flex justify-between w-full px-40 py-20">
        <h1>Tong Thanh Toan: </h1>
        <button
          className="rounded-lg bg-black text-white py-1 px-10"
          onClick={() => {
            window.location.href = "/orderreview";
          }}
        >
          Mua hàng ({count})
          </button>
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
