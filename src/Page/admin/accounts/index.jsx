// import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";

function Accounts() {
  const [form] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [datasource, setDatasource] = useState([]);
  const [pagination, setPagination] = useState({});
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
  ];

  async function fetchAccounts(pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.get(
        `/user/pagination?PageNumber=${pageNumber}&PageSize=${pageSize}`
      );
      setDatasource(response.data.data);
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

  async function handleSubmit(values) {
    try {
      const response = await api.post("/admin/create-account", values);
      toast.success("Tạo thành công!");
      console.log(response.data);
      handleHideModal();
      form.resetFields();
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  }

  async function fetchRoles() {
    const response = await api.get("/role");
    const { value } = response.data;
    console.log(value);
    setRoles(value);
  }

  useEffect(() => {
    fetchAccounts();
    fetchRoles();
  }, []);

  const handleTableChange = (pagination) => {
    fetchAccounts(pagination.current);
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
    <div className="px-16">
      <div className="flex pt-3 pb-12">
        <div className="border rounded-md bg-gray-200 font-medium">
          <h1 className=" px-3 py-1 ">Account</h1>
        </div>
        <div className="flex gap-5">
          <div>
            <Button onClick={handleShowModal}>Đăng ký tài khoản</Button>
            <Modal
              title="Đăng ký tài khoản"
              visible={isOpen}
              onCancel={handleHideModal}
              onOk={handleOk}
            >
              <Form
                labelCol={{
                  span: 24,
                }}
                form={form}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Tên người dùng"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="roleID"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền thông tin này!",
                    },
                  ]}
                >
                  <Select>
                    {roles.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.id}-{role.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="relative group hidden sm:block">
            <input
              placeholder="Search..."
              className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-200"
            />
            <SearchOutlined className="ml-[-25px] mr-2 text-gray-500 group-hover:text-orange-200" />
          </div>
        </div>
      </div>
      <div>
        <Table
          dataSource={datasource}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default Accounts;
