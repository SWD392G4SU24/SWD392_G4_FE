import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Collapse, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";

function ProductDetail2() {
  const [prodetail, setProdDetail] = useState([]);
  const { id } = useParams();
  const [isFavor, setIsFavor] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = () => {
    axios
      .get(`https://667cd2303c30891b865dc8d6.mockapi.io/productAll/${id}`)
      .then((rs) => {
        setProdDetail(rs.data);
        console.log(rs.data);
      });
  };

  const toggleIcon = () => {
    setIsFavor((prevFavor) => !prevFavor);
  };
  const toggleCart = () => {
    setIsAdd((prevAdd) => !prevAdd);
  };

  const text_1 = `
  - Vàng 14k <br />
  - Dài 20cm <br />
  - Có thể điều chỉnh độ dài từ 16 đến 28 cm <br />
`;

  const text_2 = `
  - Giữ trong hộp trang sức để bảo quản chất lượng <br />
  - Tránh xa bể bơi để ngăn chặn sự đổi màu <br />
  - Chúng tôi khuyên bạn nên làm sạch đồ trang sức của mình sau mỗi 3-4 tháng <br />
`;

  const items = [
    {
      key: "1",
      label: "Chi tiết",
      children: (
        <p
          dangerouslySetInnerHTML={{ __html: text_1 }}
          className="dark:text-white"
        ></p>
      ),
    },
    {
      key: "2",
      label: "Tip & Lưu ý",
      children: (
        <p
          dangerouslySetInnerHTML={{ __html: text_2 }}
          className="dark:text-white"
        ></p>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="pt-14 pb-14 w-full h-full block m-auto dark:bg-black/85 dark:text-white">
      {prodetail && (
        <div key={prodetail.id} className="flex justify-center">
          <div className="img_pd mb-20">
            <img src={prodetail.ImageURL} alt={prodetail.id} />
          </div>
          <div className="pl-20 w-2/5">
            <h1 className="text-3xl title_3">{prodetail.Name}</h1>

            <h3 className="text-gray-500 mt-3">{prodetail.Cost} VNĐ</h3>

            <h3 className="mt-3">{prodetail.Description}</h3>

            <div className="btn_cart mt-7 w-full flex justify-start">
              <Button
                className="bg-black text-white"
                onClick={() => {
                  window.location.href = "/cart";
                }}
              >
                Mua ngay
              </Button>
              <div onClick={toggleCart}>
                {isAdd ? (
                  <Button className="ml-3 mr-3 bg-gray-400 text-white">
                    Đã thêm
                  </Button>
                ) : (
                  <Button className="ml-3 mr-3 bg-black text-white">
                    Thêm vào giỏ hàng
                  </Button>
                )}
              </div>

              <Space className="heart_icon text-xl" onClick={toggleIcon}>
                {isFavor ? (
                  <HeartFilled style={{ color: "#B18165" }} />
                ) : (
                  <HeartOutlined />
                )}
              </Space>
            </div>

            <div className="mt-12 w-96 dark:bg-gray-400/25">
              <Collapse
                bordered={false}
                items={items}
                expandIconPosition={"end"}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail2;