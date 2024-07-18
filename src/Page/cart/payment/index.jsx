import React, { useEffect, useState } from "react";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/features/cartSlice";
import { clearOrderID } from "../../../redux/features/orderSlice";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const carts = useSelector((store) => store.cart.products);
  const [paymentData, setPaymentData] = useState(null);
  const urlParams = new URLSearchParams(location.search);
  const transactionStatus = urlParams.get("vnp_TransactionStatus");

  useEffect(() => {
    async function fetchHandleCallBack() {
      const response = api.get(
        `/payment-callback?vnp_Amount=${paymentData.vnp_Amount}&vnp_BankCode=${paymentData.vnp_BankCode}&vnp_BankTranNo=${paymentData.vnp_BankTranNo}&vnp_CardType=${paymentData.vnp_CardType}&vnp_OrderInfo=${paymentData.vnp_OrderInfo}&vnp_PayDate=${paymentData.vnp_PayDate}&vnp_ResponseCode=${paymentData.vnp_ResponseCode}&vnp_TmnCode=${paymentData.vnp_TmnCode}&vnp_TransactionNo=${paymentData.vnp_TransactionNo}&vnp_TransactionStatus=${paymentData.vnp_TransactionStatus}&vnp_TxnRef=${paymentData.vnp_TxnRef}&vnp_SecureHash=${paymentData.vnp_SecureHash}`
      );
      const { value } = response.data;
      console.log(value);
    }

    async function handleCallBackAfterPayment() {
      await api.put("/order/callback-after-payment", {
        id: paymentData.vnp_OrderInfo,
      });
    }
    const paymentInfo = {
      vnp_Amount: urlParams.get("vnp_Amount"),
      vnp_BankCode: urlParams.get("vnp_BankCode"),
      vnp_BankTranNo: urlParams.get("vnp_BankTranNo"),
      vnp_CardType: urlParams.get("vnp_CardType"),
      vnp_OrderInfo: urlParams.get("vnp_OrderInfo"),
      vnp_PayDate: urlParams.get("vnp_PayDate"),
      vnp_ResponseCode: urlParams.get("vnp_ResponseCode"),
      vnp_TmnCode: urlParams.get("vnp_TmnCode"),
      vnp_TransactionNo: urlParams.get("vnp_TransactionNo"),
      vnp_TransactionStatus: urlParams.get("vnp_TransactionStatus"),
      vnp_TxnRef: urlParams.get("vnp_TxnRef"),
      vnp_SecureHash: urlParams.get("vnp_SecureHash"),
    };
    setPaymentData(paymentInfo);
    dispatch(clearCart());
    if (transactionStatus === "00") {
      fetchHandleCallBack();
      handleCallBackAfterPayment();
      dispatch(clearOrderID());
    }
  }, [location.search]);

  const handleNavigate = () => {
    if (carts.length > 0) {
      navigate("/cart");
    } else {
      navigate("/proall");
    }
  };

  return (
    <div className="payment pb-10">
      <button
        className="text-sm text-gray-500 pl-5 pt-5 pb-3"
        onClick={handleNavigate}
      >
        Quay về
      </button>
      <div className="flex flex-col items-center">
        <div className="">
          <div className="w-full">
            <h1 className=" py-5 text-2xl text-center font-semibold">
              Đơn hàng của bạn
            </h1>
            <hr />
            {paymentData && (
              <div className="flex justify-between py-3 gap-5">
                <h1>Mã đơn hàng: {paymentData.vnp_OrderInfo}</h1>
                <div className="">|</div>
                <h1>Tổng : {paymentData.vnp_Amount} vnd</h1>
              </div>
            )}
            <hr />
          </div>
        </div>
        <div className="m-7 text-2xl">
          {transactionStatus === "00" ? (
            <div className="success-message">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
              />
              <span className="text-green-500 font-bold">
                Thanh toán thành công!
              </span>
            </div>
          ) : (
            <div className="error-message">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 mr-2"
              />
              <span className="text-red-500 font-bold">
                Thanh toán không thành công!
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h1>
            Nếu bạn chọn{" "}
            <strong style={{ color: "blue" }}>
              {paymentData && paymentData.vnp_CardType}
            </strong>{" "}
            vui lòng đến cửa hàng gần nhất để nhận hàng.
          </h1>
          <h1>
            Chúng tôi sẽ giữ hàng trong vòng 7 ngày kể từ ngày hoàn thành đơn
            hàng.
          </h1>
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
