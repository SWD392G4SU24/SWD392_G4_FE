import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { selectUser } from "../../redux/features/counterSlice";
import { Tooltip } from "antd";

function FillInformationForPurchase() {
  const [userCurrent, setUserCurrent] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const selectedProduct = useSelector((store) => store.cart.selectedItems);
  const user = useSelector(selectUser);
  const orderID = useSelector((store) => store.order.orderID);
  console.log(orderID);
  console.log(user);
  console.log(selectedProduct);

  const subtotal = selectedProduct?.reduce((acc, item) => {
    const cost = item.productCost
      .toString()
      .replace(/\./g, "")
      .replace(",", ".");
    const itemPrice = parseFloat(cost) * item.quantity;
    return acc + itemPrice;
  }, 0);

  const formattedSubtotal1 = subtotal?.toFixed(0);

  const formattedSubtotal2 = subtotal?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handlePayment = async () => {
    try {
      const response = await api.post("/create-payment-url", {
        orderType: orderID,
        amount: formattedSubtotal1,
      });
      window.location.href = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchCurrentUser() {
    try {
      const response = await api.get("/user-current");
      console.log(response.data);
      setUserCurrent(response.data);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
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
                name="fullName"
                placeholder=" Họ và tên"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></input>
            </div>
            <div className="py-3">
              <input
                type="email"
                name="email"
                placeholder=" Email"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-3">
              <input
                type="text"
                name="phoneNumber"
                placeholder=" Số Điện Thoại"
                className="py-1 border border-gray-300 px-2"
                style={{ width: "100%" }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="py-3">
              <div className="bg-gray-100 border border-gray-300 rounded-md p-4 hover:shadow-lg transition duration-300">
                <p className="font-bold text-lg">Hình thức thanh toán:</p>
                <div className="flex items-center mt-2">
                  <span className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center transition duration-300">
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                    VNPay
                  </span>
                  <p className="ml-2">Chọn hình thức thanh toán VNPay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 w-5/12 mt-14">
          <div className="border border-gray-400 shadow-md py-4 px-10">
            <h1 className="px-16 pb-7 font-serif text-2xl">Đơn mua hàng</h1>
            <hr className="" />
            {selectedProduct?.map((product) => (
              <div key={product.id}>
                <div className="flex justify-between py-3 gap-5 w-full">
                  <div>
                    <h1 className="">{product.name}</h1>
                    <h1 className="text-sm text-gray-500">
                      Số lượng: {product.quantity}
                    </h1>
                  </div>
                  <h1>
                    {(
                      parseFloat(
                        product.productCost
                          .toString()
                          .replace(/\./g, "")
                          .replace(",", ".")
                      ) * product.quantity
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </h1>
                </div>
              </div>
            ))}
            <hr />
            <div className="flex justify-between mt-5 font-bold text-xl">
              <h2>Tổng:</h2>
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
