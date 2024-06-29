import React from "react";
import "./index.scss";

function Payment() {
  return (
    <div className="payment">
      <button className="text-sm text-gray-500 pl-5 pt-5 pb-3">Quay ve</button>
      <div className="">
        <div className="pl-96">
          <div className="w-3/6">
            <h1 className="pl-44 py-5 text-2xl">Đơn hàng của bạn</h1>
            <hr />
            <div className="flex justify-between py-3">
              <h1>1 x Sample Item</h1>
              <h1>Tổng : 105.000 vnd</h1>
            </div>
            <hr />
          </div>
        </div>
        <div>
          <h1>
            Nếu bạn chọn <strong style={{ color: "blue" }}>Tiền mặt</strong> vui
            lòng đến cửa hàng gần nhất để thanh toán và nhận hàng.
          </h1>
          <h1>
            Chúng tôi sẽ giữ hàng trong vòng 7 ngày kể từ ngày hoàn thành đơn
            hàng.
          </h1>
        </div>
        <div>
          <h1>
            Hàng sẽ đến trong vòng
            <strong style={{ color: "blue" }}>7 đến 10 ngày</strong>. Cảm ơn bạn
            đã mua lấp lánh từ chúng tôi. Chúc bạn có một ngày tươi đẹp.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Payment;
