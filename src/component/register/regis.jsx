import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

function Register() {
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
            Register
          </h1>
          <form action="">
            <div className="relative my-4">
              <input
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none
            dark:focus:border-orange-200 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-200 peer "
                placeholder=""
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-1 scale-75 top-3 -z-10 origin-[0]
          peer-focus:left-0 peer-focus:text-orange-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Your Email
              </label>
              <UserOutlined className="absolute top-4 right-4" />
            </div>
            <div className="relative my-4">
              <input
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none
            dark:focus:border-orange-200 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-200 peer "
                placeholder=""
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-1 scale-75 top-3 -z-10 origin-[0]
          peer-focus:left-0 peer-focus:text-orange-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Your Password
              </label>
              <UnlockOutlined className="absolute top-4 right-4" />
            </div>
            <div className="relative my-4">
              <input
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none
            dark:focus:border-orange-200 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-200 peer "
                placeholder=""
              />
              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-1 scale-75 top-3 -z-10 origin-[0]
          peer-focus:left-0 peer-focus:text-orange-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Confirm Password
              </label>
              <UnlockOutlined className="absolute top-4 right-4" />
            </div>
            <button
              type="submit"
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-200 hover:bg-orange-200 hover:text-white py-2 transition-colors duration-300"
            >
              Register
            </button>
            <div>
              <span className="mt-4">
                Already Create an Account?
                <Link to="/Login1" className="text-black">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
