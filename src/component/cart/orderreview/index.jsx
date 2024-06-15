import { UserOutlined } from "@ant-design/icons";
import React from "react";

function OrderReview() {
  return (
    <div>
      <h1>Order Review</h1>
      <hr />
      <div>
        <UserOutlined />
        <h1>Sample Item</h1>
        <h3>Quantity</h3>
        <h2>EDIT ORDER</h2>
      </div>
      <div>$100.000</div>
    </div>
  );
}

export default OrderReview;
