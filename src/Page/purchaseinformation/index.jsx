import { Radio } from "antd";
import React from "react";

function FillInformationForPurchase() {
  return (
    <div>
      <button
        className="py-5 px-5 text-gray-500"
        onClick={() => {
          window.location.href = "/orderreview";
        }}
      >
        Quay về
      </button>
      <div className="flex items-start">
        <div className="w-3/5 h-screen">
          <div className="p-10">
            <h1 className="py-4 text-2xl">Phiếu Điền Thông Tin</h1>
            <hr className="py-2" />
            <div className="py-3">
              <input
                type="email"
                placeholder=" Email"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
              />
            </div>
            <div className="py-3">
              <input
                type="text"
                placeholder=" Số Điện Thoại"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
              />
            </div>
            <div className="py-3">
              <input
                type="text"
                placeholder=" Địa chỉ"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
              />
            </div>
            <div className="py-3 flex ">
              <div className="pr-2">
                <input
                  type="text"
                  placeholder="Quận"
                  className="border border-gray-300 py-1 px-2"
                  style={{ width: "85%" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Thành phố"
                  className="border border-gray-300 py-1 px-2"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="py-3 flex justify-around">
              <div className="flex items-center ">
                <input
                  type="radio"
                  id="tienMat"
                  name="paymentMethod"
                  className="pr-2"
                />
                <label htmlFor="tienMat" className="pl-2">
                  Tiền mặt
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vnPay"
                  name="paymentMethod"
                  className="pr-2"
                />
                <label htmlFor="vnPay" className="pl-2">
                  VN Pay
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 w-5/12 mt-14">
          <div className="border border-gray-400 shadow-md py-4 px-10">
            <h1 className="px-20 pb-7 font-serif text-2xl">Order Total</h1>
            <hr />
            <div className="pt-5 pb-12">
              <h2 className="pb-2">Mã khuyến mãi (nếu có)</h2>
              <input
                type="text"
                placeholder="Nhập mã khuyến mãi"
                className="border border-gray-300 py-2 px-2"
                style={{ width: "100%" }}
              ></input>
            </div>
            <hr className="py-3" />
            <div className="flex justify-between py-3">
              <h2>Total</h2>
              <h2>100.000 VND</h2>
            </div>
            <div className="py-5">
              <div className="flex flex-col border bg-black text-white font-serif">
                <button className="py-2 px-10">Thanh Toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillInformationForPurchase;
