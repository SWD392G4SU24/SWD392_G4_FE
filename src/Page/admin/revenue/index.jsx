import { DownOutlined } from "@ant-design/icons";
import { BarChart, LineChart } from "@mui/x-charts";
import { Avatar, Segmented } from "antd";
import "./index.scss";
import { data } from "autoprefixer";
import { Bar } from "react-chartjs-2";
// import React, { useEffect, useState } from "react";
// import api from "../../../config/axios";

function Revenue() {
  //   const [revenues, setRevenue] = useState([]);

  //   const fetchDataRevenue = async () => {
  //     const rs = await api.get(`/revenue/get-data`); //api revenue cua Nam
  //     setRevenue(rs.data);
  //   };

  //   useEffect(() => {
  //     fetchDataRevenue();
  //   });

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <div className="flex w-11/12">
        <h2>JeWellry Dashboard</h2>
        <div>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          <DownOutlined />
          {/* fetch data cua admin */}
        </div>
      </div>

      <Segmented
        options={["Revenue", "Staff", "Counter"]}
        onChange={(value) => console.log(value)}
      />

      <div className="shadow border w-11/12 block m-auto mt-10 p-5">
        <h3>Tổng lợi nhuận</h3>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              curve: "linear",
            },
          ]}
          width={1000}
          height={300}
        />
      </div>

      <div>
        <div>
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}

export default Revenue;
