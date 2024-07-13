
import { DownOutlined } from "@ant-design/icons";
// import { BarChart, LineChart } from "@mui/x-charts";
import { Avatar, Flex, Segmented, Table, Tabs } from "antd";
import "./index.scss";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { data } from "autoprefixer";
// import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";

function Revenue() {
  const [revenues, setRevenue] = useState([]);
  const [tag, setTag] = useState("Doanh thu");

  const fetchDataRevenue = async () => {
    // const rs = await api.get(`/revenue/get-data`); //api revenue cua Nam
    const rs = await api.get(
      `https://667cd2303c30891b865dc8d6.mockapi.io/revenue`
    ); //api revenue cua Nam
    setRevenue(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchDataRevenue();
  }, []);

  const dataRevenue = [
    {
      name: "01",
      revenue: 4000,
    },
    {
      name: "05",
      revenue: 3000,
    },
    {
      name: "10",
      revenue: 2000,
    },
    {
      name: "15",
      revenue: 2780,
    },
    {
      name: "20",
      revenue: 1890,
    },
    {
      name: "25",
      revenue: 2390,
    },
    {
      name: "30",
      revenue: 3490,
    },
  ];

  const dataRevenueBar = [
    {
      name: "T1",
      revenue: 4000,
    },
    {
      name: "T2",
      revenue: 2800,
    },
    {
      name: "T3",
      revenue: 1890,
    },
    {
      name: "T4",
      revenue: 3500,
    },
    {
      name: "T5",
      revenue: 2900,
    },
    {
      name: "T6",
      revenue: 4500,
    },
    {
      name: "T7",
      revenue: 3490,
    },
    {
      name: "T8",
      revenue: 2790,
    },
    {
      name: "T9",
      revenue: 2990,
    },
    {
      name: "T10",
      revenue: 3890,
    },
    {
      name: "T11",
      revenue: 4090,
    },
    {
      name: "T12",
      revenue: 2990,
    },
  ];

  const dataCounterBar = [
    {
      name: "T1",
      revenue: 3200,
    },
    {
      name: "T2",
      revenue: 2800,
    },
    {
      name: "T3",
      revenue: 1890,
    },
    {
      name: "T4",
      revenue: 3500,
    },
    {
      name: "T5",
      revenue: 2900,
    },
    {
      name: "T6",
      revenue: 4500,
    },
    {
      name: "T7",
      revenue: 3490,
    },
    {
      name: "T8",
      revenue: 2790,
    },
    {
      name: "T9",
      revenue: 2990,
    },
    {
      name: "T10",
      revenue: 3890,
    },
    {
      name: "T11",
      revenue: 4090,
    },
    {
      name: "T12",
      revenue: 2990,
    },
  ];

  const column = [
    {
      title: "Kỳ",
      dataIndex: "month",
    },
    {
      title: "Lượt bán",
      dataIndex: "totalRevenue",
      align: "center",
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    },
  ];

  const staffTable = [
    {
      title: "Tên nhân viên",
      dataIndex: "staffName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Doanh thu",
      dataIndex: "staffRevenue",
      sorter: (a, b) => a.staffRevenue - b.staffRevenue,
    },
  ];

  const handleOnClick = () => {

  };

  return (
    <div className="pb-10">
      <Segmented
        options={["Doanh thu", "Doanh thu nhân viên", "Doanh thu quầy hàng"]}
        onChange={(value) => {
          setTag(value);
          console.log(value);
        }}
        className="ml-16"
      />

      {tag == "Doanh thu" ? (
        <div>
          <div className="shadow border w-11/12 block m-auto mt-10 p-5">
            <h3 className="pb-3 font-bold">Tổng lợi nhuận trong tháng</h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={dataRevenue}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  fill="#000"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-evenly pl-28 gap-5 pb-5">
            <div className="shadow border mt-10 p-5 w-fit">
              <h3 className="font-bold">Thống kê số lượt bán theo từng kỳ</h3>
              <Table
                dataSource={revenues}
                columns={column}
                pagination={false}
                size="small"
                className="p-5"
              />
            </div>

            <div className="shadow border mt-10 w-full mr-28 h-fit p-5">
              <h3 className="font-bold">
                Sơ đồ cột tổng quan từng tháng trong năm
              </h3>
              <ResponsiveContainer width="100%" height={544} className="pt-5">
                <BarChart
                  data={dataRevenueBar}
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : tag == "Doanh thu quầy hàng" ? (
        <div>
          <div className="shadow border w-11/12 block m-auto mt-10 p-5">
            <h3 className="pb-3 font-bold">
              Tổng lợi nhuận của các quầy trong tháng
            </h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={dataRevenue}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  fill="#000"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="table-staff shadow border p-5 mt-10 w-11/12 block m-auto">
            <h3 className="font-bold pb-3">
              Danh sách doanh thu các quầy hàng
            </h3>
            <Table />
          </div>
        </div>
      ) : (
        <div>
          <div className="shadow border w-11/12 block m-auto mt-10 p-5">
            <h3 className="pb-3 font-bold">
              Tổng lợi nhuận của các nhân viên trong tháng
            </h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={dataRevenue}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  fill="#000"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="table-staff shadow border p-5 mt-10 w-11/12 block m-auto">
            <h3 className="font-bold pb-3">
              Danh sách doanh thu các nhân viên theo năm
            </h3>
            <Table columns={staffTable} dataSource={revenues} onC/>
          </div>
        </div>
      )}
    </div>
  );
}

// export default Revenue;
