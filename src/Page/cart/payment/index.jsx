import React, { useEffect, useState } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Payment() {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const transactionStatus = urlParams.get("vnp_TransactionStatus");

    if (transactionStatus === "00") {
      const paymentInfo = {
        vnp_Amount: urlParams.get("vnp_Amount"),
        vnp_BankCode: urlParams.get("vnp_BankCode"),
        vnp_BankTranNo: urlParams.get("vnp_BankTranNo"),
        vnp_CardType: urlParams.get("vnp_CardType"),
        vnp_OrderInfo: urlParams.get("vnp_OrderInfo"),
        vnp_PayDate: urlParams.get("vnp_PayDate"),
        vnp_TmnCode: urlParams.get("vnp_TmnCode"),
        vnp_TransactionNo: urlParams.get("vnp_TransactionNo"),
        vnp_TxnRef: urlParams.get("vnp_TxnRef"),
      };
      setPaymentData(paymentInfo);
    }
  }, [location.search]);

  if (!paymentData) {
    return (
      <div className="payment">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="payment">
      <button
        className="text-sm text-gray-500 pl-5 pt-5 pb-3"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Quay về
      </button>
      <div className="">
        <div className="pl-96">
          <div className="w-3/6">
            <h1 className="pl-44 py-5 text-2xl">Đơn hàng của bạn</h1>
            <hr />
            <div className="flex justify-between py-3">
              <h1>{paymentData.vnp_OrderInfo}</h1>
              <h1>Tổng : {paymentData.vnp_Amount} vnd</h1>
            </div>
            <hr />
          </div>
        </div>
        <div>
          {paymentData && (
            <div className="success-message">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
              />
              <span className="text-green-500 font-bold">
                Thanh toán thành công!
              </span>
            </div>
          )}
          <h1>
            Nếu bạn chọn{" "}
            <strong style={{ color: "blue" }}>
              {paymentData.vnp_CardType}
            </strong>{" "}
            vui lòng đến cửa hàng gần nhất để thanh toán và nhận hàng.
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
