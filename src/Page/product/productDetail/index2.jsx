import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Collapse, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearAll } from "../../../redux/features/cartSlice";
import api from "../../../config/axios";
import { selectId } from "../../../redux/features/counterSlice";
function ProductDetail2() {
  const [prodetail, setProdDetail] = useState([]);
  const { id } = useParams();
  const [isFavor, setIsFavor] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectId);
  const fetchProductDetail = () => {
    api 
      .get(`/Product/${id}`)
      .then((rs) => {
        setProdDetail(rs.data);
      });
  };
  console.log(prodetail);

  useEffect(() => {
    fetchProductDetail();
    checkFavoriteStatus();
  }, [id, userId]);
  
  const checkFavoriteStatus = () => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    const isFavorite = favorites.some(favorite => favorite.id === id);
    setIsFavor(isFavorite);
  };
  
  const toggleIcon = () => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    const itemIndex = favorites.findIndex(favorite => favorite.id === id);
  
    if (itemIndex !== -1) {
      // Remove the item if it's already in the favorites
      favorites.splice(itemIndex, 1);
      setIsFavor(false);
    } else {
      // Add the item to the favorites
      const newItem = {
        id: id,
        name: prodetail.name,
        productCost: prodetail.productCost,
        imageURL: prodetail.imageURL
      };
      favorites.push(newItem);
      setIsFavor(true);
    }
  
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  };
  
  // const toggleIcon = () => {
  //   setIsFavor((prevFavor) => !prevFavor);
  // };
  
  
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="pt-14 pb-14 w-full h-full block m-auto dark:bg-black/85 dark:text-white">
      {prodetail && (
        <div key={prodetail?.id} className="flex justify-center">
          <div className="img_pd mb-20">
            <img src={prodetail?.imageURL} alt={prodetail.id} />
          </div>
          <div className="pl-20 w-2/5">
            <h1 className="text-3xl title_3">{prodetail?.name}</h1>

            <h3 className="text-gray-500 mt-3">{formatCurrency(prodetail?.productCost)}</h3>

            <h3 className="mt-3">{prodetail?.description}</h3>

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
                  <>
                    <Button
                      className="ml-3 mr-3 bg-black text-white"
                      onClick={() => {
                        dispatch(addProduct(prodetail));
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>

                    <Button onClick={() => dispatch(clearAll())}>
                      Clear All
                    </Button>
                  </>
                )}
              </div>

              <Space className="heart_icon text-xl ml-5" onClick={toggleIcon}>
                {isFavor ? (
                  <div class="tooltip">
                  <HeartFilled style={{ color: "#B18165" }} />
                  <span class="tooltiptext"> Bỏ Thích</span>
                  </div>
                ) : (
                  <div class="tooltip">
                  <HeartOutlined />
                  <span class="tooltiptext"> Yêu thích</span>
                  </div>
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