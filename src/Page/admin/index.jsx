import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { RiPieChartFill } from "react-icons/ri";

function Admin() {
  return (
    <div className="flex flex-col w-full h-screen justify-center dark:bg-black/85 dark:text-white">
      <div className="pb-10">
        <button 
          onClick={() => {
            window.location.href = "/revenue";
          }} 
          className="border shadow-md border-white bg-gradient-to-r dark:from-gray-600 dark:text-white dark:bg-orange-300 dark:border-none" >
          <div className="px-5 py-3 flex gap-2">
            <div className="text-4xl">
              <RiPieChartFill />
            </div>
            <div className="font-serif">
              <h1>Dashboard</h1>
            </div>
          </div>
        </button>
      </div>
      <div>
        <button className="border shadow-md border-white bg-gradient-to-r dark:from-gray-600 dark:text-white dark:bg-orange-300 dark:border-none">
          <div className="px-11 py-3 flex gap-2">
            <div className="text-3xl">
              <HiUserGroup />
            </div>
            <h1 className="font-serif">Users</h1>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Admin;
