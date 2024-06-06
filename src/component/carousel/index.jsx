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

function Carousel({ numOfSlide, isUseNavigate }) {
  const [pics, setPics] = useState([]);
  const [cates, setCates] = useState([]);

  const fetchPic = async () => {
    const response = await axios.get(
      "https://665aa0df003609eda45e5ea3.mockapi.io/JeWellry"
    );
    console.log(response.data);
    setPics(response.data);
  };

  const fetchCate = async () => {
    const response = await axios.get(
      "https://665aa0df003609eda45e5ea3.mockapi.io/category"
    );
    console.log(response.data);
    setCates(response.data);
  };

  useEffect(() => {
    fetchPic();
    fetchCate();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={numOfSlide}
        spaceBetween={10}
        mousewheel={true}
        keyboard={true}
        navigation={isUseNavigate}
        pagination={true}
        autoplay={{
          delay: 2500,
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
                className="absolute bottom-10 w-full left-48 scale-125"
              />
              <div className="relative left-24">
                <h1 className="text-5xl py-5 text-white font-serif mt-40">
                  {pic.content}
                </h1>
                <h3>{pic.description}</h3>
                <button className="py-1 border-2 border-black rounded-md px-3 mt-5 shadow-md shadow-black/30 ">
                  {pic.bt_name ? "Xem thêm" : {}}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <>
        {/* <div className=""> */}
        <h1 className="text-3xl text-center mt-10 font-serif">
          Shop by categories
        </h1>
        <h3 className="text-center mt-2 mb-10">
          Xin hãy thưởng thức những gì chúng tôi có
        </h3>
        {/* </div> */}
        <Row justify="space-evenly">
          {cates.map((cate) => (
            <Col span={4} key={cate.id}>
              <img src={cate.pic_path} alt="" />
            </Col>
          ))}
        </Row>
      </>
    </>
  );
}

export default Carousel;
