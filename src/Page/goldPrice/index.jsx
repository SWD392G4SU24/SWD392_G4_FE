import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function GoldPrice() {
  const [prices, setPrice] = useState([]);

  const fetchPrice = async () => {
    const resp = await axios.get(
      // "http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v"
      "https://6663df16932baf9032a93456.mockapi.io/goldprice"
      // "https://dassie-living-bonefish.ngrok-free.app/goldBtmc/get-price"
    );
    setPrice(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    fetchPrice();
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
      <h1 className="text-center text-3xl pt-6 font-serif text-amber-700">
        Bảng giá vàng
      </h1>
      <h3 className="text-center mb-5 mt-2 text-gray-400">
        Ngày cập nhật: {prices[1]?.createAt}
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
