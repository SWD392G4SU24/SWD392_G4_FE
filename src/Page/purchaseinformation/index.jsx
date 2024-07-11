import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";

function FillInformationForPurchase() {
  const [payment, setPayment] = useState([]);
  const selectedProduct = useSelector((store) => store.cart.selectedItems);
  console.log(selectedProduct);
  const subtotal = selectedProduct.reduce((acc, item) => {
    const cost = item.Cost.replace(/\./g, "").replace(",", ".");
    const itemPrice = parseFloat(cost) * item.quantity;
    return acc + itemPrice;
  }, 0);

  const formattedSubtotal1 = subtotal.toFixed(0);

  const formattedSubtotal2 = subtotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handlePayment = async () => {
    try {
      const response = await api.post("/create-payment-url", {
        orderType: "VNPay",
        amount: formattedSubtotal1,
        orderDescription: "string",
        name: "string",
      });
      window.location.href = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchPaymentMethod() {
    try {
      const response = await api.get("/paymentMethod");
      const { value } = response.data;
      setPayment(value);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

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
                type="text"
                placeholder=" Họ và tên"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
              />
            </div>
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
            <div className="py-3 flex justify-around">
              {payment.map((method) => (
                <div className="flex items-center" key={method.id}>
                  <input
                    type="radio"
                    id={method.id === 1 ? "vnPay" : "tienMat"}
                    name="paymentMethod"
                    className="pr-2"
                  />
                  <label
                    htmlFor={method.id === 1 ? "vnPay" : "tienMat"}
                    className="pl-2"
                  >
                    {method.name}
                  </label>
                </div>
              ))}
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
            <div className="flex justify-between py-3 font-bold text-xl">
              <h2>Total</h2>
              <h2>{formattedSubtotal2}</h2>
            </div>
            <div className="py-5">
              <div className="flex flex-col border bg-black text-white font-serif">
                <button className="py-2 px-10" onClick={handlePayment}>
                  Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillInformationForPurchase;
