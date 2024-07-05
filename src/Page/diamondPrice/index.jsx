import { Table } from "antd";
import api from "../../config/axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function DiamondPrice() {
  const [prices, setPrice] = useState([]);

  const fetchPrices = async () => {
    try {
      const resp = await api.get(
        // "https://dassie-living-bonefish.ngrok-free.app/diamond/get-price"
        "https://667a1e4918a459f6395263f0.mockapi.io/diamond"
      );
      setPrice(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const filterFirst = prices.filter((p) => p.Date == "16-07-2024");
  // const filterSecond = prices.filter((p) => p.Date == "17-07-2024");
  // const filterThird = prices.filter((p) => p.Date == "18-07-2024");
  console.log(filterFirst);

  const columns = [
    {
      title: "Kích cỡ ",
      dataIndex: "Type",
      key: "Type",
      align: "center",
    },
    {
      title: "Giá bán ra",
      className: "column-money",
      dataIndex: "SellCost",
      key: "SellCost",
      align: "center",
      render: (text) => (
        <h3 className="text-green-700 font-semibold">{text}</h3>
      ),
    },
    {
      title: "Giá mua vào",
      className: "column-money",
      dataIndex: "BuyCost",
      key: "BuyCost",
      align: "center",
      render: (text) => <h3 className="text-red-600 font-semibold">{text}</h3>,
    },
  ];

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <h1 className="text-center text-4xl pt-6 text-sky-600 title-diamond">
        Bảng giá kim cương
      </h1>
      <h3 className="text-center mb-5 mt-2 text-gray-400">
        Ngày cập nhật: {prices[0]?.Date}
      </h3>
      <Table
        columns={columns}
        dataSource={filterFirst}
        bordered
        pagination={false}
        className="dp_tb w-11/12 m-auto pb-20 dark:bg-black/85 dark:text-white"
      />
    </div>
  );
}

export default DiamondPrice;
