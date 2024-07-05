import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function VongTay() {
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

  const filterVT = products.filter((prod) => prod.Cate === "Vòng tay");
  console.log(filterVT.map((ht) => ht.Name));

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <div className="w-3/4 m-auto btn_prod text-center pt-8">
        <div>
          <h1 className="title_3 text-4xl pr-10">Vòng tay</h1>
          <h3>Khám phá vòng tay bạc và vàng cho mọi dịp.</h3>
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
          {filterVT.map((vt) => (
            <Col
              key={vt.id}
              className="gutter-row justify-center flex flex-col pt-12 paper"
              span={6}
              onClick={() => {
                window.location.href = `/prodetail/${vt.id}`;
              }}
            >
              <img src={vt.ImageURL} className="w-40 h-40 " />
              <h3 className="absolute -bottom-5 font-medium w-40">
                {vt.Name}
              </h3>
              <h3 className="absolute -bottom-10 text-gray-400 w-40">
                {vt.Cost}
              </h3>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default VongTay;
