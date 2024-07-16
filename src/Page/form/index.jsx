import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { addDays, format, formatDate } from "date-fns";

function Form() {
  const [form, setForm] = useState([]);

  const fetchForm = async () => {
    const response = await api.get(`/Form`);
    setForm(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchForm();
  }, []);

  //   const formatDate = (dateStr) => {
  //     const date = new Date(dateStr);
  //     return date.toISOString().split(0, 10);

  //     // return date.toLocaleDateString("en-US"); // Adjust locale as per your requirement
  //   };

  const column = [
    {
      title: "Loại đơn",
      dataIndex: "type",
    },
    {
      title: "Nội dung đơn",
      dataIndex: "content",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => {
        return <Tag color="blue">{record.status}</Tag>;
      },
    },
    {
      title: "Ngày hẹn",
      dataIndex: "appoinmentDate",
      key: "appoinmentDate",
      //   render: (text, record) => {
      //     format(new Date(record.appoinmentDate), "yyyy-MM-dd");
      //   },
      render: (date) => {
        const twoDaysAfter = addDays(new Date(date), 2);
        const formattedTwoDaysAfter = format(twoDaysAfter, "yyyy-MM-dd");

        return date && <span>{formattedTwoDaysAfter}</span>;
      },
    },
  ];
  return (
    <div>
      <h1 className="text-4xl text-amber-700 pb-5 pl-5">Quản lý đơn</h1>
      <Table columns={column} dataSource={form} />
    </div>
  );
}

export default Form;
