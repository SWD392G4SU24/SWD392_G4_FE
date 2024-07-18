import { Button, Input, Modal, Select, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";

function ReOrder() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [golds, setGolds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày mua hàng",
      dataIndex: "pickupDate",
      key: "pickupDate",
    },
    {
      title: "Tổng số lượng hàng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Người bán lại",
      dataIndex: "buyerID",
      key: "buyerID",
    },
    {
      title: "Tổng chi phí",
      dataIndex: "totalCost",
      key: "totalCost",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      dataIndex: "id",
      key: "id",
    },
  ];

  async function fetchGolds() {
    try {
      const response = await api.get("/goldBtmc/get-price");
      setGolds(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllOrder() {
    const response = await api.get("/Order");
    const { value } = response.data;
    setDataSource(value);
  }

  async function handleReOrder(values) {
    try {
      const response = await api.post("/re-order/staff-create", values);
      setDataSource([...dataSource, response.data]);
      handleHideModal();
      form.resetFields();
      toast.success("Mua lại hàng thành công!");
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  }

  useEffect(() => {
    fetchAllOrder();
    fetchGolds();
  });

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleHideModal() {
    setIsOpen(false);
  }

  function handleOk() {
    form.submit();
  }

  return (
    <div>
      <Button type="primary" onClick={handleShowModal}>
        Tạo hóa đơn mua lại hàng
      </Button>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Đơn hàng mua lại"
        open={isOpen}
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleReOrder}
        >
          <Form.Item label="Mã đơn hàng" name="orderDetailID">
            <Input />
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity">
            <Input />
          </Form.Item>
          <Form.Item label="Người bán lại" name="customerID">
            <Input />
          </Form.Item>
          <Form.Item label="Gold Type" name="goldType">
            <Select>
              {golds.map((gold) => (
                <Option key={gold.name} value={gold.name}>
                  {gold.name}-{gold.karaContent}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Khối lượng vàng" name="goldWeight">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ReOrder;
