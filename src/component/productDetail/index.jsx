import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Collapse, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function ProductDetail() {
  const [pdetails, setPDetail] = useState([]);
  const [isFavor, setIsFavor] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const fetchPD = async () => {
    const resp = await axios.get(
      `https://6663df16932baf9032a93456.mockapi.io/SP_BanChay`
    );
    setPDetail(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    fetchPD();
  }, []);

  const filteredProduct = pdetails.find((pd) => pd.id === "1");
  const toggleIcon = () => {
    setIsFavor((prevFavor) => !prevFavor);
  };
  const toggleCart = () => {
    setIsAdd((prevAdd) => !prevAdd);
  };

  const text_1 = `
  - Vàng 14k
  - Dài 20cm
  - Có thể điều chỉnh độ dài từ 16 đến 28 cm
`;

  const text_2 = `
  - Giữ trong hộp trang sức để bảo quản chất lượng.
  - Tránh xa bể bơi để ngăn chặn sự đổi màu.
  - Chúng tôi khuyên bạn nên làm sạch đồ trang sức của mình sau mỗi 3-4 tháng.
`;

  const items = [
    {
      key: "1",
      label: "Chi tiết",
      children: <p>{text_1}</p>,
    },
    {
      key: "2",
      label: "Tip & Lưu ý",
      children: <p>{text_2}</p>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="mt-14 mb-14 w-full h-full justify-between flex dark:bg-black/85 dark:text-white">
      {filteredProduct && (
        <div key={filteredProduct.id} className="flex justify-center">
          <div className="img_pd">
            {filteredProduct.jw_image && (
              <img src={filteredProduct.jw_image} alt={filteredProduct.id} />
            )}
          </div>
          <div className="pl-20 mt-4 w-2/5">
            {filteredProduct.jw_name && (
              <h1 className="text-3xl font-serif">{filteredProduct.jw_name}</h1>
            )}

            <h3 className="text-gray-500 mt-3">{filteredProduct.price} VNĐ</h3>

            {filteredProduct.description && (
              <h3 className="mt-3">{filteredProduct.description}</h3>
            )}

            <div className="btn_cart mt-7 w-full flex">
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

            <div className="mt-12 w-96">
              <Collapse
                bordered={false}
                items={items}
                expandIconPosition={"end"}
                // defaultActiveKey={["1"]}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
