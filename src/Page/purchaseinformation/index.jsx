import { Input, Radio } from "antd";
import React from "react";

function FillInformationForPurchase() {
  return (
    <div>
      <button className="py-5 px-5 text-gray-500">Quay về</button>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h1 className="py-3">Phiếu Điền Thông Tin</h1>
          <hr />
          <Input type="text" placeholder=" Email" />
          <Input type="text" placeholder=" Số Điện Thoại" />
          <Input type="text" placeholder=" Địa chỉ" />
          <div>
            <Input type="text" placeholder="Quận" />
            <Input type="text" placeholder="Thành phố" />
          </div>
          <div>
            <Radio>Tiền mặt</Radio>
            <Radio>VN Pay</Radio>
          </div>
        </div>
        <div>
          <h1>Order Total</h1>
          <div>
            <h2>Mã khuyến mãi(nếu có)</h2>
            <Input type="text" placeholder="Nhập mã khuyến mãi"></Input>
          </div>
          <hr />
          <div>
            <h2>Total</h2>
            <h2>100.000 VND</h2>
          </div>
          <button>Thanh Toán</button>
        </div>
      </div>
    </div>
  );
}

export default FillInformationForPurchase;
