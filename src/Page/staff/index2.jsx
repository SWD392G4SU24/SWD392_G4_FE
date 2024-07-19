import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, Form, Modal, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "../../redux/features/customerSlice";
import { useNavigate } from "react-router-dom";

const UserSearch = () => {
  const [form] = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [userCurrent, setUserCurrent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = `/user/filter-user?PageNumber=1&PageSize=10&FullName=${fullName}&PhoneNumber=${phoneNumber}`;
      const response = await api(apiUrl);
      setSearchResults(response.data.data);
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  };

  async function fetchCurrentUser() {
    const response = await api.get("/user-current");
    setUserCurrent(response.data);
  }

  async function handleSubmit(values) {
    try {
      const response = await api.post("/register", values);
      toast.success("Tạo thành công!");
      console.log(response.data);
      handleHideModal();
      form.resetFields();
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  }

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleHideModal() {
    setIsOpen(false);
  }

  function handleOk() {
    form.submit();
  }

  const handleBuyClick = (user) => {
    dispatch(setSelectedCustomer(user));
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5 text-2xl text-orange-300 font-semibold">
        <h1>{userCurrent.counter}</h1>
      </div>
      <div className="flex ">
        <h1 className="text-2xl font-medium mb-4">
          Tìm kiếm thông tin khách hàng
        </h1>
        <div>
          <Button type="primary" onClick={handleShowModal}>
            Đăng ký tài khoản
          </Button>
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
                label="Mật khẩu"
                name="password"
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
              <Form.Item name="roleID" initialValue={3} hidden>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="px-1 mt-1 block w-full border-gray-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      <div>
        {searchResults === null && (
          <p className="text-gray-500">
            Hãy nhập thông tin bạn muốn tìm và nhấp vào Tìm kiếm.
          </p>
        )}
        {searchResults && searchResults.length > 0 && (
          <div className="border-t border-gray-200 mt-4">
            <h2 className="text-lg font-bold mt-4">Kết quả tìm kiếm</h2>
            {searchResults.map((user) => (
              <div key={user.id} className="p-4 border-b border-gray-200 flex">
                <div>
                  <p>
                    <strong>Họ và tên:</strong> {user.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {user.phoneNumber}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {user.address}
                  </p>
                  <p>
                    <strong>Điểm thưởng:</strong> {user.point}
                  </p>
                </div>
                <div>
                  {" "}
                  <div>
                    <button
                      className="mt-2 border rounded-lg p-3 bg-green-500 text-white"
                      onClick={() => {
                        handleBuyClick(user);
                        navigate("/stafforder");
                      }}
                    >
                      Mua hàng
                    </button>
                  </div>
                  <div>
                    <button
                      className="mt-2 border rounded-lg py-3 px-4 bg-gray-300 text-black"
                      onClick={() => {
                        handleBuyClick(user);
                        navigate("/checkreceive");
                      }}
                    >
                      Xem đơn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
