import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";

function GoldPrice() {
  const [prices, setPrices] = useState([]);

  const fetchPrices = async () => {
    try {
      const resp = await api.get(
        "/goldBtmc/get-price"
      );
      setPrices(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const columns = [
    {
      title: "Loại vàng",
      dataIndex: "name",
    },
    {
      title: "Hàm lượng",
      dataIndex: "goldContent",
      align: "center",
    },
    {
      title: "Giá bán ra",
      className: "column-money",
      dataIndex: "sellCost",
      align: "center",
      render: (text) => (
        <h3 className="text-green-700 font-semibold">{text}</h3>
      ),
    },
    {
      title: "Giá mua vào",
      className: "column-money",
      dataIndex: "buyCost",
      align: "center",
      render: (text) => <h3 className="text-red-600 font-semibold">{text}</h3>,
    },
  ];

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <h1 className="text-center text-4xl pt-6 text-amber-700">
        Bảng giá vàng
      </h1>
      <h3 className="text-center mb-5 mt-2 text-gray-400">
        Ngày cập nhật: {prices[0]?.createdAt}
      </h3>
      <Table
        columns={columns}
        dataSource={prices}
        bordered
        pagination={false}
        className="gp_tb w-11/12 m-auto pb-20"
      />
    </div>
  );
}

export default GoldPrice;
