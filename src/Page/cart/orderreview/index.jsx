import React from "react";

function OrderReview() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col py-3">
        <div className="py-2 text-gray-500 px-5">
          <button
            onClick={() => {
              window.location.href = "/cart";
            }}
          >
            Quay về
          </button>
        </div>
        <div className="px-9">
          <div className="py-2">
            <h1 className="py-5 font-serif text-2xl">Order Review</h1>
            <hr />
            <div className="flex justify-between gap-5 py-7">
              <div>
                <img src="./src/assets/website/image 17.png" alt="" />
              </div>
              <div className="flex flex-col font-mono pr-64">
                <h1 className="">Sample Item</h1>
                <h3 className=" text-gray-500">Quantity</h3>
                <button
                  className="pt-28 text-amber-700"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  EDIT ORDER
                </button>
              </div>
              <div>$100.000</div>
            </div>
          </div>
          <div className="py-3">
            <h1 className="py-4 font-serif text-xl">Add more your bag</h1>
            <hr />
            <div className="flex gap-10 py-7">
              <div>
                <img src="./src/assets/website/add these to cart.png" alt="" />
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
      <div className="pr-16 pt-36 ">
        <div className="rounded-sm border-black bg-white/70 shadow-md ">
          <div className="py-5 px-7 flex flex-col justify-center ">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-serif">Order Total</h1>
            </div>
            <hr />
            <div className="flex justify-between py-3">
              <h1 className="">1 Sample Item</h1>
              <h1>$100.000</h1>
            </div>
            <hr />
            <div className="flex justify-between py-3 font-bold">
              <h1>Subtotal: </h1>
              <h1>$100.000</h1>
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
  );
}

export default OrderReview;
