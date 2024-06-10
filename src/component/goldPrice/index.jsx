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
      dataIndex: "n_1",
    },
    {
      title: "Hàm lượng",
      dataIndex: "h_1",
      align: "center",
    },
    {
      title: "Giá bán ra",
      className: "column-money",
      dataIndex: "ps_1",
      align: "center",
      render: (text) => <h3 className="text-green-700 font-semibold">{text}</h3>,
    },
    {
      title: "Giá mua vào",
      className: "column-money",
      dataIndex: "pb_1",
      align: "center",
      render: (text) => <h3 className="text-red-600 font-semibold">{text}</h3>,
    },
    {
      title: "Giá thế giới",
      className: "column-money",
      dataIndex: "pt_1",
      align: "center",
      render: (text) => <h3 className="font-semibold">{text}</h3>,
    },
  ];

  return (
    <div>
      <h1 className="text-center text-3xl mt-5 font-serif text-amber-700">
        Bảng giá vàng
      </h1>
      <h3 className="text-center mb-5 mt-2 text-gray-400">
        Ngày cập nhật: {prices[1]?.d_1}
      </h3>
      <Table
        columns={columns}
        dataSource={prices}
        bordered
        className="w-11/12 m-auto"
      />
    </div>
  );
}

export default GoldPrice;
