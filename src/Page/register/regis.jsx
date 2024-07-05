import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    roleID: 2,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      console.log("Mật khẩu nhập lại không khớp");
      return;
    }
    try {
      const response = await axios.post(
        "https://dassie-living-bonefish.ngrok-free.app/register",
        userData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="text-white h-[100vh] w-full flex justify-center items-center bg-cover"
        style={{
          backgroundImage: "url('../src/assets/website/bg-login1.jpg')",
        }}
      >
        <div className="bg-slate-800 border boder-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-black/75 font-bold text-center mb-6">
            ĐĂNG KÝ
          </h1>
          <form action="" onSubmit={registerUser}>
            <div className="relative my-4">
              <input
                type="email"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 
                rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <UserOutlined className="absolute top-3 right-3 text-gray-500" />
            </div>
            <div className="relative my-4">
              <input
                type="text"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Họ và tên"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                type="text"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Tên người dùng"
                name="userName"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                type="text"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Địa chỉ"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                type="text"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Số điện thoại"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                type="password"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Mật khẩu"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-4">
              <input
                type="password"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <button
              type="submit"
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-200 hover:bg-orange-200 hover:text-white py-2 transition-colors duration-300"
            >
              Đăng ký
            </button>
            <div>
              <span className="mt-4 flex justify-center">
                Đã có tài khoản?
                <div>
                  <Link to="/Login1" className="text-black">
                    Đăng nhập
                  </Link>
                </div>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
