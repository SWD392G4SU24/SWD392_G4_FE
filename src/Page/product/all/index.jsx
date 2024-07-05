import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

function ProductAll() {
  const [pics, setPic] = useState([]);
  const [products, setProduct] = useState([]);

  const fetchPic = async () => {
    const rs = await axios.get(
      "https://667a1e4918a459f6395263f0.mockapi.io/image"
    );
    setPic(rs.data);
    console.log(rs.data);
  };

  const fetchProductAll = async () => {
    const rs = await axios.get(
      "https://667cd2303c30891b865dc8d6.mockapi.io/productAll"
    );
    setProduct(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchPic();
    fetchProductAll();
  }, []);

  const filterPic = pics.find((pic) => pic.id === "2");

  const filterHT = products.filter((prod) => prod.Cate === "Hoa tai");
  console.log(filterHT.map((ht) => ht.Name));

  const filterVT = products.filter((prod) => prod.Cate === "Vòng tay");
  console.log(filterVT.map((ht) => ht.Name));

  const filterDC = products.filter((prod) => prod.Cate === "Dây chuyền");
  console.log(filterDC.map((ht) => ht.Name));

  const filterNh = products.filter((prod) => prod.Cate === "Nhẫn");
  console.log(filterNh.map((ht) => ht.Name));

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <img
        src={filterPic?.avatar}
        className="poster w-full bottom-8 relative"
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
        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Dây chuyền</h1>
              <h3>Khám phá dây chuyền bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                window.location.href = "/dc";
              }}
            >
              XEM THÊM
            </Button>
          </div>

          <Swiper
            centeredSlides={false}
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="swiperNhan"
          >
            {filterDC.map((dc) => (
              <SwiperSlide key={dc.id}>
                <div
                  className="pb-16 pt-5 w-36"
                  onClick={() => {
                    window.location.href = `/prodetail/${dc.id}`;
                  }}
                >
                  <img src={dc.ImageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{dc.Name}</h3>
                  <h4>{dc.Cost}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Hoa tai</h1>
              <h3>Khám phá hoa tai bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                window.location.href = "/ht";
              }}
            >
              XEM THÊM
            </Button>
          </div>

          <Swiper
            centeredSlides={false}
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="swiperNhan"
          >
            {filterHT.map((ht) => (
              <SwiperSlide key={ht.id}>
                <div
                  className="pb-16 pt-5"
                  onClick={() => {
                    window.location.href = `/prodetail/${ht.id}`;
                  }}
                >
                  <img src={ht.ImageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{ht.Name}</h3>
                  <h4>{ht.Cost}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Vòng tay</h1>
              <h3>Khám phá vòng tay bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                window.location.href = "/vt";
              }}
            >
              XEM THÊM
            </Button>
          </div>

          <Swiper
            centeredSlides={false}
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="swiperNhan"
          >
            {filterVT.map((vt) => (
              <SwiperSlide key={vt.id}>
                <div
                  className="pb-16 pt-5"
                  onClick={() => {
                    window.location.href = `/prodetail/${vt.id}`;
                  }}
                >
                  <img src={vt.ImageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{vt.Name}</h3>
                  <h4>{vt.Cost}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Nhẫn</h1>
              <h3>Khám phá nhẫn bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                window.location.href = "/n";
              }}
            >
              XEM THÊM
            </Button>
          </div>

          <Swiper
            centeredSlides={false}
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="swiperNhan"
          >
            {filterNh.map((n) => (
              <SwiperSlide key={n.id}>
                <div
                  className="pb-16 pt-5"
                  onClick={() => {
                    window.location.href = `/prodetail/${n.id}`;
                  }}
                >
                  <img src={n.ImageURL} className="w-40 h-40" />
                  <h3 className="font-medium">{n.Name}</h3>
                  <h4>{n.Cost}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ProductAll;
