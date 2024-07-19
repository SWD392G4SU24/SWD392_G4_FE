import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";

function ProductAll() {
  const [pics, setPic] = useState([]);
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchPic = async () => {
    const rs = await axios.get(
      "https://667a1e4918a459f6395263f0.mockapi.io/image"
    );
    setPic(rs.data);
    console.log(rs.data);
  };

  const fetchProductAll = async () => {
    const rs = await api.get(`/Product`);
    setProduct(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchPic();
    fetchProductAll();
  }, []);

  const filterPic = pics.find((pic) => pic.id === "2");

  const filterDC = products.filter((prod) => prod.categoryID == "1");
  console.log(filterDC.map((ht) => ht.name));

  const filterVT = products.filter((prod) => prod.categoryID == "2");
  console.log(filterVT.map((ht) => ht.name));

  const filterNh = products.filter((prod) => prod.categoryID == "3");
  console.log(filterNh.map((ht) => ht.name));

  const filterDH = products.filter((prod) => prod.categoryID == "4");
  console.log(filterNh.map((ht) => ht.name));

  const filterHT = products.filter((prod) => prod.categoryID == "5");
  console.log(filterHT.map((ht) => ht.name));

  const filterKg = products.filter((prod) => prod.categoryID == "6");
  console.log(filterNh.map((ht) => ht.name));

  const filterLac = products.filter((prod) => prod.categoryID == "7");
  console.log(filterNh.map((ht) => ht.name));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
                // window.location.href = "/dc";
                navigate("/dc");
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
                  className="pb-16 pt-5 w-36 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${dc.id}`;
                    navigate(`/prodetail/${dc.id}`);
                  }}
                >
                  <img src={dc.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{dc.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(dc.productCost)}
                  </h4>
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
                // window.location.href = "/ht";
                navigate(`/ht`);
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
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${ht.id}`;
                    navigate(`/prodetail/${ht.id}`);
                  }}
                >
                  <img src={ht.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{ht.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(ht.productCost)}
                  </h4>
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
                // window.location.href = "/vt";
                navigate(`/vt`);
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
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${vt.id}`;
                    navigate(`/prodetail/${vt.id}`);
                  }}
                >
                  <img src={vt.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{vt.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(vt.productCost)}
                  </h4>
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
                // window.location.href = "/n";
                navigate(`/n`);
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
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${n.id}`;
                    navigate(`/prodetail/${n.id}`);
                  }}
                >
                  <img src={n.imageURL} className="w-40 h-40" />
                  <h3 className="font-medium">{n.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(n.productCost)}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Đồng hồ</h1>
              <h3>Khám phá đồng hồ bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                // window.location.href = "/dh";
                navigate(`/dh`);
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
            {filterDH.map((dh) => (
              <SwiperSlide key={dh.id}>
                <div
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${dh.id}`;
                    navigate(`/prodetail/${dh.id}`);
                  }}
                >
                  <img src={dh.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{dh.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(dh.productCost)}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Lắc</h1>
              <h3>Khám phá lắc tay/chân bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                // window.location.href = "/lac";
                navigate(`/lac`);
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
            {filterLac.map((lac) => (
              <SwiperSlide key={lac.id}>
                <div
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${lac.id}`;
                    navigate(`/prodetail/${lac.id}`);
                  }}
                >
                  <img src={lac.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{lac.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(lac.productCost)}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Kiềng</h1>
              <h3>Khám phá lắc kiềng bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button
              className="pt-5 pb-5 pl-10 pr-10"
              onClick={() => {
                // window.location.href = "/kg";
                navigate(`/kg`);
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
            {filterKg.map((kg) => (
              <SwiperSlide key={kg.id}>
                <div
                  className="pb-16 pt-5 cursor-pointer"
                  onClick={() => {
                    // window.location.href = `/prodetail/${kg.id}`;
                    navigate(`/prodetail/${kg.id}`);
                  }}
                >
                  <img src={kg.imageURL} className="w-32 h-40" />
                  <h3 className="font-medium">{kg.name}</h3>
                  <h4 className="text-amber-700">
                    {formatCurrency(kg.productCost)}
                  </h4>
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
