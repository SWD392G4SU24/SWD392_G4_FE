import React from "react";

function OrderReview() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col py-3">
        <div className="py-2 text-gray-500 px-5">
          <h1>Quay về</h1>
        </div>
        <div className="px-5">
          <div className="py-2">
            <h1 className="py-5 font-serif text-2xl">Order Review</h1>
            <hr />
            <div className="flex justify-between gap-5 p-7">
              <div>
                <img src="./src/assets/website/image 17.png" alt="" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-mono">Sample Item</h1>
                <h3 className="font-mono text-gray-500">Quantity</h3>
                <h2 className="pt-28">EDIT ORDER</h2>
              </div>
              <div>$100.000</div>
            </div>
          </div>
          <div className="py-3">
            <h1>Add more your bag</h1>
            <hr />
            <div className="flex gap-4">
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
          </div>
        </div>
      </div>
      <div className="px-28 ">
        <div>
          <h1>Order Total</h1>
          <hr />
          <h1>Subtotal: </h1>
          <button>Điền Thông Tin</button>
        </div>
      </div>
    </div>
  );
}

export default OrderReview;
