import React from "react";
import { useDispatch, useSelector } from "react-redux";

function OrderReview() {
  const selectedProduct = useSelector((store) => store.cart.selectedItems);
  console.log(selectedProduct);
  // const subtotal = useSelector(sumCostSelectedProducts);
  const subtotal = selectedProduct.reduce((acc, item) => {
    const cost = item.Cost.replace(/\./g, "").replace(",", ".");
    const itemPrice = parseFloat(cost) * item.quantity;
    return acc + itemPrice;
  }, 0);

  const formattedSubtotal = subtotal.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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
              <h1 className="py-5 font-serif text-2xl">Order Review</h1>
              <hr />
              <div className="">
                {selectedProduct?.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between gap-5 py-7"
                  >
                    <div>
                      <img src={product.ImageURL} />
                    </div>
                    <div className="flex flex-col font-mono pr-64">
                      <h1 className="">{product.Name}</h1>
                      <h3 className=" text-gray-500">
                        So luong : {product.quantity}
                      </h3>
                      <button
                        className="pt-28 text-amber-700"
                        onClick={() => {
                          window.location.href = "/Cart";
                        }}
                      >
                        EDIT ORDER
                      </button>
                    </div>
                    
                    <div className="">
                      {(
                        parseFloat(
                          product.Cost.replace(/\./g, "").replace(",", ".")
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
            <div className="py-5 px-7 flex flex-col justify-center items-start">
              <div className="flex justify-center px-24 pb-5">
                <h1 className="text-2xl font-serif">Order Total</h1>
              </div>
              <div>
                <hr />
                {selectedProduct?.map((product) => (
                  <div key={product.id}>
                    <div className="flex justify-between py-3">
                      <h1 className="">{product.Name}</h1>
                      <h1>
                        {(
                          parseFloat(
                            product.Cost.replace(/\./g, "").replace(",", ".")
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
                <div className="flex justify-between py-3 font-bold">
                  <h1>Subtotal: </h1>
                  <h1>{formattedSubtotal}</h1>
                </div>
                <div className="rounded-sm bg-black text-white py-1 px-28 flex justify-center items-center">
                  <div>
                    <button
                      onClick={() => {
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
