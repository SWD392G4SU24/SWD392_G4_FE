import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Col, Row } from "antd";
import "./index.scss";
import api from "../../config/axios";

function Carousel({ numOfSlide, isUseNavigate }) {
  const [pics, setPics] = useState([]);
  const [cates, setCates] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchPic = async () => {
    const response = await axios.get(
      "https://665aa0df003609eda45e5ea3.mockapi.io/JeWellry"
    );
    console.log(response.data);
    setPics(response.data);
  };

  const fetchCate = async () => {
    const response = await api.get(
      // "https://665aa0df003609eda45e5ea3.mockapi.io/category"
      "/category"
    );
    const { value } = response.data;
    setCates(value);
  };

  const fetchProduct = async () => {
    const response = await api.get(
      // "https://6663df16932baf9032a93456.mockapi.io/SP_BanChay"
      "/Product"
    );
    console.log(response.data);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchPic();
    fetchCate();
    fetchProduct();
  }, []);

  const handleOnClickCate = (id) => {
    id === "1"
      ? (window.location.href = `/dc`)
      : id === "5"
      ? (window.location.href = `/ht`)
      : id === "2"
      ? (window.location.href = `/vt`)
      : id === "3"
      ? (window.location.href = `/n`)
      : id === "4"
      ? (window.location.href = `/dh`)
      : id === "6"
      ? (window.location.href = `/kg`)
      : (window.location.href = `/lac`);
  };

  const handleOnClickDetail = (id) => {
    window.location.href = `/prodetail/${id}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Swiper
        slidesPerView={numOfSlide}
        spaceBetween={15}
        mousewheel={true}
        keyboard={true}
        navigation={isUseNavigate}
        pagination={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay, Mousewheel, Keyboard]}
        className={`carousel ${numOfSlide > 1 ? "mutil-slide_item" : ""}`}
      >
        {pics.map((pic) => (
          <SwiperSlide
            key={pic.id}
            className={`${numOfSlide > 1 ? "mutil-slide_item" : ""}`}
          >
            <div className="poster h-96">
              <img
                src={pic.poster_path}
                alt=""
                className="absolute bottom-10 w-full left-44 scale-125"
              />
              <div className="relative left-24">
                <h1 className="text-5xl py-5 text-white mt-40">
                  {pic.content}
                </h1>
                <h3>{pic.description}</h3>
                {/* <button className="py-1 border-2 border-black rounded-md px-3 mt-5 shadow-md shadow-black/30 ">
                  {pic.bt_name}
                </button> */}
                {pic.id === "3" ? (
                  <button
                    className="py-1 border-2 border-black rounded-md px-3 mt-5 shadow-md shadow-black/30"
                    onClick={() => {
                      window.location.href = "/GoldPrice";
                    }}
                  >
                    {pic.bt_name}
                  </button>
                ) : pic.id === "2" ? (
                  <button
                    className="py-1 border-2 border-black rounded-md px-3 mt-5 shadow-md shadow-black/30"
                    onClick={() => {
                      window.location.href = "/proall";
                    }}
                  >
                    {pic.bt_name}
                  </button>
                ) : (
                  <button
                    className="py-1 border-2 border-black rounded-md px-3 mt-5 shadow-md shadow-black/30"
                    onClick={() => {
                      window.location.href = "/aboutus";
                    }}
                  >
                    {pic.bt_name}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <>
        <h1 className="text-3xl text-center mt-20 font-serif">
          Phân loại sản phẩm
        </h1>
        <h3 className="text-center mt-2 mb-10">
          Xin hãy thưởng thức những gì chúng tôi có
        </h3>

        <Swiper
          slidesPerView={4}
          spaceBetween={8}
          freeMode={true}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          {cates.map((cate) => (
            <SwiperSlide
              key={cate.id}
              onClick={() => {
                handleOnClickCate(cate.id);
                console.log(cate.id);
              }}
            >
              <div className="ml-20 pb-16 pt-2 swiper-img-container cursor-pointer">
                <a className="cateLink">
                  {cate.id === "1" ? (
                    <img src="https://i.imgur.com/RNxL7JQ.png" />
                  ) : cate.id === "3" ? (
                    <img src="https://i.imgur.com/BLPmNge.png" />
                  ) : cate.id === "4" ? (
                    <img src="https://i.pinimg.com/564x/a2/33/4a/a2334a2ce4bfd9d582ec959906a1cff3.jpg" />
                  ) : cate.id === "5" ? (
                    <img src="https://i.imgur.com/cdocnbx.png" />
                  ) : cate.id === "6" ? (
                    <img src="https://i.pinimg.com/564x/1b/57/77/1b5777410ab602fadcf8c0e8d567ab54.jpg" />
                  ) : cate.id === "7" ? (
                    <img src="https://i.pinimg.com/564x/1c/07/fa/1c07fa0ea62e3e02b09e3b7f94c1b8f7.jpg" />
                  ) : (
                    <img src="https://i.imgur.com/laou9su.png" />
                  )}
                  {/* <img src={cate.pic_path} alt="" /> */}
                  <h2 className="flex justify-center w-48 font-medium text-center text-xl font-serif">
                    {cate.name}
                  </h2>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>

      <>
        <h1 className="text-center text-3xl mt-20 font-serif">
          Sản phẩm bán chạy
        </h1>
        <h3 className="text-center mt-2 mb-5">
          Sản phẩm bán chạy trong mùa xuân
        </h3>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          autoplay={{
            delay: 3500,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {products.map((prd) => (
            <SwiperSlide
              key={prd.id}
              onClick={() => {
                handleOnClickDetail(prd.id);
                console.log(prd.id);
              }}
            >
              <div className="ml-20 pb-16 pt-2 swiper-img-container cursor-pointer spLink">
                <img src={prd.imageURL} />
                <h3 className="font-medium w-48">{prd.name}</h3>
                <h4 className="text-amber-700">
                  {formatCurrency(prd.productCost)}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </>
  );
}

export default Carousel;
