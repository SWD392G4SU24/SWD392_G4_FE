import React from "react";
import Login1 from "../login/login";

function Backgournd() {
  return (
    <div
      className="text-white h-[100vh] w-screen flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('../src/assets/website/bg-login1.jpg')" }}
    >
      <Login1 />
    </div>
  );
}

export default Backgournd;
