import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/axios";
import { selectUser } from "../../../redux/features/counterSlice";
import { setOrderID } from "../../../redux/features/orderSlice";

function OrderReview() {
  const selectedProduct = useSelector((store) => store.cart.selectedItems);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(selectedProduct);
  const subtotal = selectedProduct.reduce((acc, item) => {
    const cost = item.productCost
      .toString()
      .replace(/\./g, "")
      .replace(",", ".");
    const itemPrice = parseFloat(cost) * item.quantity;
    return acc + itemPrice;
  }, 0);

  const formattedSubtotal = subtotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  async function fetchPromotionByUserId() {
    const response = await api.get(
      `/Promotion/get-by-userID?PageNumber=1&PageSize=5&UserId=${user.id}`
    );
    const { value } = response.data;
    setPromotions(value.data);
    console.log(value.data);
  }

  const handlePromotionSelection = (event) => {
    setSelectedPromotion(event.target.value);
  };

  async function handleCreateOrder() {
    const response = await api.post("/order/customer-create", {
      orderDetails: selectedProduct.map((product) => ({
        productID: product.id,
        quantity: product.quantity,
      })),
      promotionID: selectedPromotion,
    });
    const orderID = response.data.value;
    dispatch(setOrderID(orderID));
  }

  useEffect(() => {
    fetchPromotionByUserId();
  }, []);

  return (
    <div className="">
      <div className="pb-2 pt-7 text-gray-500 pl-5 text-lg">
        <button
          onClick={() => {
            window.location.href = "/Cart";
          }}
        >
          Quay về
        </button>
      </div>
      <div className="flex items-start">
        <div className="flex flex-col py-3">
          <div className="px-9">
            <div className="py-2">
              <h1 className="py-5 font-serif text-2xl">Đơn mua hàng</h1>
              <hr />
              <div className="">
                {selectedProduct?.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between gap-5 py-7"
                  >
                    <div>
                      <img
                        src={product.imageURL}
                        style={{ width: "full", height: "300px" }}
                      />
                    </div>
                    <div className="flex flex-col font-mono pr-64">
                      <h1 className="">{product.name}</h1>
                      <h3 className=" text-gray-500">
                        So luong : {product.quantity}
                      </h3>
                      <button
                        className="pt-28 text-amber-700"
                        onClick={() => {
                          window.location.href = "/Cart";
                        }}
                      >
                        Thay đổi đơn hàng
                      </button>
                    </div>

                    <div className="">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-3">
              <h1 className="py-4 font-serif text-xl">Add more your bag</h1>
              <hr />
              <div className="flex gap-10 py-7">
                <div>
                  <img
                    src="./src/assets/website/add these to cart.png"
                    alt=""
                  />
                </div>
                <div>
                  <img src="./src/assets/website/ATC2.png" alt="" />
                </div>
                <div>
                  <img src="./src/assets/website/ATC3.png" alt="" />
                </div>
                <div>
                  <img src="./src/assets/website/ATC4.png" alt="" />
                </div>
                <div>
                  <img src="./src/assets/website/ATC5.png" alt="" />
                </div>
              </div>
              <hr className="py-2" />
            </div>
          </div>
        </div>
        <div className="pr-16 mt-24">
          <div className="rounded-sm border-black bg-white/70 shadow-md ">
            <div className="py-7 px-7 flex flex-col justify-center items-start">
              <div className="flex justify-center px-36 pb-5">
                <h1 className="text-2xl font-serif">Tổng đơn mua</h1>
              </div>
              <div>
                <hr />
                {selectedProduct?.map((product) => (
                  <div key={product.id}>
                    <div className="flex justify-between py-3">
                      <h1 className="">
                        {product.name} x {product.quantity}
                      </h1>
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
                <hr />
                <div className="pt-5 pb-12">
                  {promotions.length > 0 && (
                    <div>
                      <h2 className="pb-2">Mã khuyến mãi (nếu có)</h2>
                      <select
                        value={selectedPromotion}
                        onChange={handlePromotionSelection}
                        className="border border-gray-300 py-2 px-2"
                        style={{ width: "100%" }}
                      >
                        <option value="">Chọn mã khuyến mãi</option>
                        {promotions.map((promo) => (
                          <option key={promo.id} value={promo.id}>
                            {promo.id}-{promo.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex justify-between py-3 font-bold">
                  <h1>Tổng tiền: </h1>
                  <h1>{formattedSubtotal}</h1>
                </div>
                <div className="rounded-sm bg-black text-white py-1 px-28 flex justify-center items-center">
                  <div>
                    <button
                      onClick={() => {
                        handleCreateOrder();
                        window.location.href = "/purchaseinformation";
                      }}
                    >
                      Điền Thông Tin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReview;
