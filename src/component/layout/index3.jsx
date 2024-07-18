import React from "react";
import HeaderStaff from "../header/headerstaff";
import { Outlet } from "react-router-dom";

function LayoutStaff() {
  return (
    <div>
      <HeaderStaff />
      <Outlet />
    </div>
  );
}

export default LayoutStaff;
