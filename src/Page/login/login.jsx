import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import { UserOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { toast } from "react-toastify";

function Login1() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser);
  const urlParams = new URLSearchParams(location.search);
  const [verifyMailData, setVerifyMailData] = useState(null);
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
      if (res.data.role === "Manager") {
        navigate("/manager");
      }
      if (res.data.role === "Staff") {
        navigate("/staffsearch");
      }
      if (res.data.role === "Admin") {
        navigate("/dashboard");
      }
      if (res.data.role === "Customer") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  };

  useEffect(() => {
    const fetchUrlData = async () => {
      const verifyMailInfo = {
        token: urlParams.get("token"),
        userid: urlParams.get("userid"),
      };
      console.log(verifyMailInfo);
      setVerifyMailData(verifyMailInfo);
      await handleVerifyEmail(verifyMailInfo);
    };
    fetchUrlData();
  }, [location.search]);

  async function handleVerifyEmail(verifyMailData) {
    try {
      const response = await api.post("/user/verify-email", {
        userID: verifyMailData.userid,
        token: verifyMailData.token,
      });
      toast.success(response.data.value);
    } catch (e) {
      toast.error(e.response.data.value);
    }
  }
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
            Đăng nhập
          </h1>
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
            <button
              type="submit"
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-200 hover:bg-orange-200 hover:text-white py-2 transition-colors duration-300"
            >
              Đăng nhập
            </button>
            <div>
              <span className="mt-4 px-10 flex justify-center gap-3">
                <h1>Bạn chưa có ?</h1>
                <Link to="/Register" className="text-black">
                  Tạo tài khoản
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
