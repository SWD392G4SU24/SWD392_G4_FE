import React from "react";
import "./index.scss";

function Tutorial() {
  return (
    <div className="mb-24">
      <h1 className="text-3xl font-bold my-10 text-center font-serif text-orange-700">
        Hướng Dẫn Đo Size Trang Sức
      </h1>
      <div className="img_ring flex w-9/12 block m-auto gap-10 items-start">
        <img src="https://i.pinimg.com/564x/b4/69/4d/b4694dc0744716d3359e7cd4db142dc4.jpg" />
        <div>
          <div className="hover:text-orange-700">
            <h3
              className="text-2xl font-bold mb-2"
              onClick={() => (window.location.href = "/ringtutor")}
            >
              Hướng dẫn đo size, kích cỡ nhẫn
            </h3>
            <p className="text-gray-500 w-4/5">
              JeWellry sẽ hướng dẫn bạn cách đo kích thước nhẫn tại nhà & cách
              bí mật đo nhẫn để tạo bất ngờ cho món quà dành tặng người thân,
              nhất là đối với những thời khắc đặc biệt trong đời. Với những bí
              quyết trong bài, bạn có thể dễ...
            </p>
          </div>
          <button
            className="bg-black hover:bg-amber-800 text-white py-1 px-4 mt-5"
            onClick={() => (window.location.href = "/ringtutor")}
          >
            Xem thêm
          </button>
        </div>
      </div>

      <div className="img_ring flex w-9/12 block m-auto gap-10 items-start mt-10">
        <img src="https://www.pnj.com.vn/blog/wp-content/uploads/2021/01/3-cach-do-size-lac-vong-tay-don-gian-thumnail-534x462.jpg" />
        <div>
          <div className="hover:text-orange-700">
            <h3
              className="text-2xl font-bold mb-2"
              onClick={() => (window.location.href = "/braceletutor")}
            >
              Hướng dẫn đo size lắc và vòng tay
            </h3>
            <p className="text-gray-500 w-4/5">
              Hiện nay, việc mua sắm trang sức Online rất được ưa chuộng và phổ
              biến với nhiều tiện ích như: tiết kiệm thời gian, mua sắm bất kỳ
              lúc nào hay bất kỳ nơi đâu, ngoài ra còn có thể bí mật tạo bất ngờ
              bằng món quà tặng...
            </p>
          </div>
          <button
            className="bg-black hover:bg-amber-800 text-white py-1 px-4 mt-5"
            onClick={() => (window.location.href = "/braceletutor")}
          >
            Xem thêm
          </button>
        </div>
      </div>

      <div className="img_ring flex w-9/12 block m-auto gap-10 items-start mt-10">
        <img src="https://i.pinimg.com/564x/d4/6e/14/d46e14dc92fd83977de2ed00693af835.jpg" />
        <div>
          <div className="hover:text-orange-700">
            <h3
              className="text-2xl font-bold mb-2"
              onClick={() => (window.location.href = "/necklacetutor")}
            >
              Hướng dẫn đo size dây chuyền, dây cổ và kiềng
            </h3>
            <p className="text-gray-500 w-4/5">
              Để mua một món đồ trang sức như dây chuyền, dây cổ và kiềng… không
              đơn giản như bạn nghĩ, đặc biệt là làm quà tặng. Ngoài việc lựa
              chọn những mẫu mã phù hợp thì kích thước phù hợp cũng là vấn đề
              bạn cần quan tâm. Trong...
            </p>
          </div>
          <button
            className="bg-black hover:bg-amber-800 text-white py-1 px-4 mt-5"
            onClick={() => (window.location.href = "/necklacetutor")}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
