import React from "react";
import { AiFillProduct } from "react-icons/ai";
import { IoTicket } from "react-icons/io5";

function Manager() {
  return (
    <div className="flex flex-col w-full h-screen justify-center dark:bg-black/85 dark:text-white">
      <div className="pb-10">
        <button
          className="border shadow-md border-white bg-gradient-to-r dark:from-gray-600 dark:text-white dark:bg-orange-300 dark:border-none"
          onClick={() => {
            window.location.href = "/crudproduct";
          }}
        >
          <div className="px-5 py-3 flex gap-2">
            <div className="text-4xl">
              <AiFillProduct />
            </div>
            <div className="font-serif">
              <h1>Sản phẩm</h1>
            </div>
          </div>
        </button>
      </div>
      <div>
        <button className="border shadow-md border-white bg-gradient-to-r dark:from-gray-600 dark:text-white dark:bg-orange-300 dark:border-none">
          <div className="px-7 py-4 flex gap-3">
            <div className="text-3xl">
              <IoTicket />
            </div>
            <h1 className="font-serif">Voucher</h1>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Manager;
