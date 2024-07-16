import { Button, DatePicker, Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { addDays, format, formatDate } from "date-fns";
import { render } from "@testing-library/react";

function Form() {
  const [form, setForm] = useState([]);
  const [open, setOpen] = useState([]);

  const fetchForm = async () => {
    const response = await api.get(`/Form`);
    setForm(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchForm();
  }, []);

  const showModal = (id) => {
    setOpen(true);
    console.log(id);
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={showModal(record.id)}>Chỉnh sửa</Button>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-4xl text-amber-700 pb-5 pl-5">Quản lý đơn</h1>
      <Table columns={column} dataSource={form} />

      <Modal
        title="Chỉnh sửa/Duyệt đơn"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          {/* {form.map((f) => ( */}
          <Form.Item label="Loại đơn">MAINTANANCE</Form.Item>
          <Form.Item label="Nội dung đơn">
            <p>fiuuhehfnanvjdkjvhuheignvnven</p>
          </Form.Item>
          <Form.Item label="Ngày hẹn">
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Tag color="blue">PENDING</Tag>
          </Form.Item>
          {/* ))} */}
        </Form>
      </Modal>
    </div>
  );
}

export default Form;
