import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function HoaTai() {
  const [products, setProduct] = useState([]);

  const fetchProductAll = async () => {
    const rs = await axios.get(
      "https://667cd2303c30891b865dc8d6.mockapi.io/productAll"
    );
    setProduct(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchProductAll();
  }, []);

  const filterHT = products.filter((prod) => prod.Cate === "Hoa tai");
  console.log(filterHT.map((ht) => ht.Name));

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <div className="w-3/4 m-auto btn_prod text-center pt-8">
        <div>
          <h1 className="title_3 text-4xl pr-10">Hoa tai</h1>
          <h3>Khám phá hoa tai bạc và vàng cho mọi dịp.</h3>
        </div>
        {/* <Button className="pt-5 pb-5 pl-10 pr-10">XEM THÊM</Button> */}
      </div>

      <div className="pb-28 flex justify-evenly relative">
        <Row
          className="card-list"
          gutter={[
            {
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            },
            32,
          ]}
        >
          {filterHT.map((ht) => (
            <Col
              key={ht.id}
              className="gutter-row justify-center flex flex-col pt-12 paper"
              span={6}
              onClick={() => {
                window.location.href = `/prodetail/${ht.id}`;
              }}
            >
              <img src={ht.ImageURL} className="w-40 h-40 " />
              <h3 className="absolute -bottom-5 left-28 font-medium w-40">
                {ht.Name}
              </h3>
              <h3 className="absolute -bottom-10 left-28 text-gray-400">
                {ht.Cost}
              </h3>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HoaTai;