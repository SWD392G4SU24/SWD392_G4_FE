import { Button, Form, Input, Select, Table, Modal } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

function ReOrder() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({});
  const [golds, setGolds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Ngày mua hàng",
      dataIndex: "pickupDate",
      key: "pickupDate",
      align: "center",
      render: (pickupDate) => moment(pickupDate).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Tổng số lượng hàng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Nhân viên giao dịch",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Tổng chi phí",
      dataIndex: "totalCost",
      key: "totalCost",
      align: "center",
      render: (totalCost) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(totalCost),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Chức năng",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id, record) => (
        <Button onClick={() => handleViewOrder(id)}>Xem đơn</Button>
      ),
    },
  ];

  async function handleViewOrder(id) {
    const response = await api.get(`/Order/${id}`);
    console.log(response.data); // Handle response as needed
  }

  async function fetchGolds() {
    try {
      const response = await api.get("/goldBtmc/get-price");
      setGolds(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllReOrder(pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.get(
        `/order/filter-order?PageNumber=${pageNumber}&PageSize=${pageSize}&Type=RE_ORDER`
      );
      setDataSource(response.data.data);
      console.log(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.totalCount,
        pageSize: response.data.pageSize,
        current: pageNumber,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReOrder(values) {
    try {
      await api.post("/re-order/staff-create", values);
      handleHideModal();
      form.resetFields();
      fetchAllReOrder();
      toast.success("Mua lại hàng thành công!");
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  }

  useEffect(() => {
    fetchAllReOrder();
    fetchGolds();
  }, []);

  const handleTableChange = (pagination) => {
    fetchAllReOrder(pagination.current);
  };

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
      <div className="flex flex-row gap-4">
        <div>
          <Button
            className="text-base"
            onClick={() => navigate("/staffsearch")}
          >
            <div className="flex gap-2">
              <div>
                <GrPrevious />
              </div>
              <h1>Quay về</h1>
            </div>
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={handleShowModal}>
            Tạo hóa đơn mua lại hàng
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Đơn hàng mua lại"
        visible={isOpen}
        pagination={handleTableChange}
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
          <Form.Item label="Mã hóa đơn" name="orderDetailID">
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
