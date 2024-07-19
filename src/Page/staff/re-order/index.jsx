import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Modal,
  Typography,
  Space,
} from "antd";
import { GrPrevious } from "react-icons/gr";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/axios";

const { Option } = Select;

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
        <Button type="link" onClick={() => handleViewOrder(id)}>
          Xem đơn
        </Button>
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
      setPagination({
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
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Space>
          <Button type="text" onClick={() => navigate("/staffsearch")}>
            <GrPrevious /> Quay về
          </Button>
          <Button type="primary" onClick={handleShowModal}>
            Tạo hóa đơn mua lại hàng
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title="Đơn hàng mua lại"
        visible={isOpen}
        onCancel={handleHideModal}
        onOk={handleOk}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleReOrder}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Mã hóa đơn"
            name="orderDetailID"
            rules={[{ required: true, message: "Vui lòng nhập mã hóa đơn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            label="Người bán lại"
            name="customerID"
            rules={[{ required: true, message: "Vui lòng nhập người bán!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại vàng"
            name="goldType"
            rules={[{ required: true, message: "Vui lòng chọn loại vàng!" }]}
          >
            <Select>
              {golds.map((gold) => (
                <Option key={gold.name} value={gold.name}>
                  {gold.name} - {gold.karaContent}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Khối lượng vàng"
            name="goldWeight"
            rules={[
              { required: true, message: "Vui lòng nhập khối lượng vàng!" },
            ]}
          >
            <Input type="number" min={0} step="0.01" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ReOrder;
