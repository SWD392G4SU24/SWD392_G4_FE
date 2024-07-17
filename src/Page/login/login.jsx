import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { toast } from "react-toastify";

function Login1() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues.data);
  };
  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    const result = await signInWithPopup(auth, googleProvider);

    const token = result.user.accessToken;
    const user = result.user;
    console.log(token);
    console.log(user);
    dispatch(login(result.data));

    const response = await api.get("/login");

    console.log(response.data);
    dispatch(logout());
  };
  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        user: {
          username: username,
          password: password,
        },
      });

      toast.success("Đăng nhập thành công!");
      dispatch(login(res.data));
      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload(); // Reload trang sau khi đăng nhập thành công để thay đổi dc icon đăng nhập trên header
    } catch (error) {
      toast.error(error.response.data.detail);
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
          <div className="pb-3">
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
          </div>
          <div className="px-32">
            <h1>OR</h1>
          </div>
          <form
            action=""
            className="flex flex-col justify-center items-center"
            onClick={Login}
            onSubmit={handleSubmit}
          >
            <div className="relative my-4">
              <input
                type="text"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 
                rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <UserOutlined className="absolute top-3 right-3 text-gray-500" />
            </div>
            <div className="relative my-4">
              <input
                type="password"
                className="block w-72 h-10 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-orange-200 focus:border-orange-200"
                placeholder="Mật khẩu"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              type="submit"
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-200 hover:bg-orange-200 hover:text-white py-2 transition-colors duration-300"
            >
              Login
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
