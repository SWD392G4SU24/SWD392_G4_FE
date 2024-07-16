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
  const [counter, setCounter] = useState([]);
  const [staff, setStaff] = useState([]);
  const [tag, setTag] = useState("Doanh thu");

  // const fetchDataRevenue = async () => {
  //   // const rs = await api.get(`/revenue/get-data`); //api revenue cua Nam
  //   const rs = await api.get(
  //     `https://667cd2303c30891b865dc8d6.mockapi.io/revenue`
  //   ); //api revenue cua Nam
  //   setRevenue(rs.data);
  //   console.log(rs.data);
  // };

  const fetchCounterRevenue = async (
    startDate = "2024-07-10",
    endDate = "2024-08-14"
  ) => {
    const response = await api.get(
      `/counter/filter-revenue?StartDate=${startDate}&EndDate=${endDate}`
    );
    setCounter(response.data);
    console.log(response.data);
  };

  const fetchRevenue = async (year = "2024") => {
    const response = await api.get(`/order/get-revenue?Year=${year}`);
    setRevenue(response.data);
  };

  const fetchStaffRevenue = async (
    startDate = "2024-07-10",
    endDate = "2024-08-14"
  ) => {
    const response = await api.get(
      `staff/filter-revenue?StartDate=${startDate}&EndDate=${endDate}`
    );
    setStaff(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchRevenue();
    fetchCounterRevenue();
    fetchStaffRevenue();
  }, []);

  const sum = Object.keys(revenues);
  const lastKey = sum[sum.length - 1];
  const lastData = revenues[lastKey];

  const dataSource = Object.keys(revenues)
    .slice(0, -1)
    .map((key) => ({
      key: key,
      revenue: revenues[key].revenue,
      totalReOrder: revenues[key].totalReOrder,
      completeOrers: revenues[key].completeOrers,
      refundOrders: revenues[key].refundOrders,
      reOrders: revenues[key].reOrders,
    }));

  const column = [
    {
      title: "Kỳ",
      dataIndex: "key",
      align: "center",
    },
    {
      title: "Lượt bán",
      dataIndex: "revenue",
      align: "center",
      sorter: (a, b) => a.revenue - b.revenue,
      render: (text, record) => formatCurrency(record.revenue),
    },
  ];

  const staffTable = [
    {
      title: "Tên nhân viên",
      dataIndex: "fullName",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    // },
    {
      title: "Doanh thu",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      align: "center",
      render: (text, record) => formatCurrency(record.totalPrice)
    },
  ];

  const counterTable = [
    {
      title: "Tên quầy",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Số lượng đơn hàng bán ra",
      dataIndex: "ordersNumber",
      align: "center",
    },
    {
      title: "Doanh thu",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      align: "center",
      render: (text, record) => formatCurrency(record.totalPrice),
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const sumCounter = counter.reduce((acc, curr) => acc + curr?.totalPrice, 0);
  const sumStaff = staff.reduce((acc, curr) => acc + curr?.totalPrice, 0);

  const handleOnClick = (id) => {
    console.log(id);
  };

  return (
    <div className="pb-10 dark:text-white dark:bg-black">
      <Segmented
        options={["Doanh thu", "Doanh thu nhân viên", "Doanh thu quầy hàng"]}
        onChange={(value) => {
          setTag(value);
          console.log(value);
        }}
        className="ml-16 dark:bg-gray-700 dark:text-white "
      />

      {tag == "Doanh thu" ? (
        <div className=" dark:text-white dark:bg-black/85">
          <div className="mt-10 flex justify-center gap-10">
            <div className="border w-72 rounded-md pl-5 p-4 shadow-md">
              <h3>Tổng doanh thu</h3>
              <h2 className="text-2xl font-bold my-2">
                {formatCurrency(lastData?.revenue)}
              </h2>
              <h3 className="text-gray-500">+20% so với tháng trước</h3>
            </div>
            <div className="border w-72 rounded-md pl-5 p-4 shadow-md">
              <h3>Tổng doanh thu của nhân viên</h3>
              <h2 className="text-2xl font-bold my-2">
                {formatCurrency(sumStaff)}
              </h2>
              <h3 className="text-gray-500">+10% so với tháng trước</h3>
            </div>
            <div className="border w-72 rounded-md pl-5 p-4 shadow-md">
              <h3>Tổng doanh thu của từng quầy</h3>
              <h2 className="text-2xl font-bold my-2">
                {formatCurrency(sumCounter)}
              </h2>
              <h3 className="text-gray-500">-8% so với tháng trước</h3>
            </div>
          </div>

          <div className="shadow border w-11/12 block m-auto mt-10 p-5 rounded-md">
            <h3 className="pb-3 font-bold">Tổng lợi nhuận trong tháng</h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={dataSource}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3399ff"
                  fill="#3399ff"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-evenly pl-28 gap-3 pb-5">
            <div className="shadow border mt-10 p-5 w-fit rounded-md">
              <h3 className="font-bold">Thống kê số lượt bán theo từng kỳ</h3>
              <Table
                dataSource={dataSource}
                columns={column}
                pagination={false}
                size="small"
                className="table-revenue p-5 "
              />
            </div>

            <div className="shadow border mt-10 w-full mr-28 h-fit p-5 rounded-md">
              <h3 className="font-bold">
                Sơ đồ cột tổng quan từng tháng trong năm
              </h3>
              <ResponsiveContainer
                width="100%"
                height={544}
                className="pt-5 pl-5"
              >
                <BarChart
                  data={dataSource}
                  margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="key" />
                  {/* <YAxis tickFormatter={(value) => formatCurrency(value)} /> */}
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3399ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : tag == "Doanh thu quầy hàng" ? (
        <div>
          <div className="shadow border w-11/12 block m-auto mt-10 p-5 rounded-md">
            <h3 className="pb-3 font-bold">
              Tổng lợi nhuận của các quầy trong tháng
            </h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={counter}
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
                  dataKey="totalPrice"
                  stroke="#000"
                  fill="#000"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="table-staff shadow border p-5 mt-10 w-11/12 block m-auto rounded-md">
            <h3 className="font-bold pb-3">
              Danh sách doanh thu các quầy hàng
            </h3>
            <Table columns={counterTable} dataSource={counter} />
          </div>
        </div>
      ) : (
        <div>
          <div className="shadow border w-11/12 block m-auto mt-10 p-5 rounded-md">
            <h3 className="pb-3 font-bold">
              Tổng lợi nhuận của các nhân viên trong tháng
            </h3>

            <ResponsiveContainer width="100%" height={300} className="text-sm">
              <LineChart
                width={500}
                height={200}
                data={staff}
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
                  dataKey="totalPrice"
                  stroke="#000"
                  fill="#000"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="table-staff shadow border p-5 mt-10 w-11/12 block m-auto rounded-md">
            <h3 className="font-bold pb-3">
              Danh sách doanh thu các nhân viên theo năm
            </h3>
            <Table
              columns={staffTable}
              dataSource={staff}
              rowKey="id"
              onRow={(record) => ({ onClick: () => handleOnClick(record.id) })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Revenue;
