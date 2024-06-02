import React from "react";
import { Link } from "react-router-dom";
import api from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/counterSlice";

function Login1() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Student", {
        fullName: "LeAnhDuy",
        token: "aaaaaaa",
      });
      dispatch(login(res.data));
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <div>
      <div className="bg-slate-800 border boder-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-black/75 font-bold text-center mb-6">
          Login
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
          </div>
          <div className="relative my-4">
            <input
              type="email"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none
              dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer "
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-1 scale-75 top-3 -z-10 origin-[0]
            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              Your Password
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <label htmlFor="Remember Me">Remember Me</label>
            </div>
            <Link to={``} className="text-black">
              Forgot Password?
            </Link>
          </div>
          <button
            onClick={Login}
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-200 hover:bg-orange-200 hover:text-white py-2 transition-colors duration-300"
          >
            Login
          </button>
          <div>
            <span className="mt-4">
              New Here?{" "}
              <Link to="Register" className="text-black">
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login1;
