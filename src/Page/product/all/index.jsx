import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "antd";

function ProductAll() {
  const [pic, setPic] = useState([]);

  const fetchPic = async () => {
    const rs = await axios.get(
      "https://667a1e4918a459f6395263f0.mockapi.io/image"
    );
    setPic(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchPic();
  }, []);

  const filterPic = pic.find((p) => p.id === "2");

  return (
    <div>
      <img
        src={filterPic?.avatar}
        className="poster w-full bottom-80 relative"
      />
      <div className="absolute top-32 w-3/4 left-44 text-white">
        <h1 className="title text-center text-2xl pt-5 text-yellow-400">
          Bộ sưu tập mùa hè
        </h1>
        <h1 className="title_2 text-center text-3xl pt-5">
          {filterPic?.title}
        </h1>
        <h3 className="pt-5">{filterPic?.description}</h3>
      </div>

      <div>
        <div className="flex w-3/4 m-auto">
          <div className="flex">
            <h1 className="title_3 text-4xl pr-10">Vòng cổ</h1>
            <h3>Khám phá vòng cổ bạc và vàng cho mọi dịp.</h3>
          </div>
          <Button>XEM THÊM</Button>
        </div>

        <div className="flex w-3/4 m-auto">
          <div className="flex">
            <h1 className="title_3 text-4xl pr-10">Hoa tai</h1>
            <h3>Khám phá bông tai bạc và vàng cho mọi dịp.</h3>
          </div>
          <Button>XEM THÊM</Button>
        </div>

        <div className="flex w-3/4 m-auto">
          <div className="flex">
            <h1 className="title_3 text-4xl pr-10">Vòng tay</h1>
            <h3>Khám phá vòng tay bạc và vàng cho mọi dịp.</h3>
          </div>
          <Button>XEM THÊM</Button>
        </div>

        <div className="flex w-3/4 m-auto">
          <div className="flex">
            <h1 className="title_3 text-4xl pr-10">Dây chuyền</h1>
            <h3>Khám phá dây chuyền bạc và vàng cho mọi dịp.</h3>
          </div>

          <Button>XEM THÊM</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductAll;
