import React from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import axios from "axios";

function Login1() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    const result = await signInWithPopup(auth, googleProvider);

    const token = result.user.accessToken;
    const user = result.user;
    console.log(token);
    console.log(user);
    dispatch(login(result.data));
    // call api BE gui token xuong
    // const response = await axios.get(
    //   "https://d35f-118-69-182-149.ngrok-free.app/api/User/user/login"
    // );
    // console.log(response.data);
  };
  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Student", {
        fullName: "LeAnhDuy",
        token: "aaaaaaa",
      });
      dispatch(login(res.data));
      // dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <div>
      <div
        className="text-white h-[100vh] w-screen flex justify-center items-center bg-cover"
        style={{
          backgroundImage: "url('../src/assets/website/bg-login1.jpg')",
        }}
      >
        <div className="bg-slate-800 border boder-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-black/75 font-bold text-center mb-6">
            Login
          </h1>
          <form action="" className="flex flex-col justify-center items-center">
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
            peer-focus:left-0 peer-focus:text-orange-300 peer-focus:dark:text-orange-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                UserName
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
            peer-focus:left-0 peer-focus:text-orange-300 peer-focus:dark:text-orange-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Your Password
              </label>
              <UnlockOutlined className="absolute top-4 right-4" />
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
            <button
              className="flex justify-center items-center transition-all gap-5 bg-black rounded-full px-14 py-2"
              onClick={handleLoginGoogle}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                alt=""
                width={30}
              />
              <span className="">Login with google</span>
            </button>
            <div>
              <span className="mt-4 px-10">
                New Here?
                <Link to="/Register" className="text-black">
                  Create an Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login1;
