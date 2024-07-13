import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../header/index2";

function LayoutOfAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
}

export default LayoutOfAdmin;
