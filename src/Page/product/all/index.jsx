import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Col, Row } from "antd";

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
    <div>
      <img
        src={filterPic?.avatar}
        className="poster w-full bottom-80 relative"
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
            <Button className="pt-5 pb-5 pl-10 pr-10">XEM THÊM</Button>
          </div>

          <div className="pt-10 pb-10 flex justify-evenly">
            <Row
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
              {filterDC.map((dc) => (
                <Col
                  key={dc.id}
                  className="gutter-row justify-center flex flex-col w-32"
                  span={6}
                >
                  <img src={dc.ImageURL} className="w-24 h-40" />
                  <h3>{dc.Name}</h3>
                  <h3>{dc.Cost}</h3>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Hoa tai</h1>
              <h3>Khám phá hoa tai bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button className="pt-5 pb-5 pl-10 pr-10">XEM THÊM</Button>
          </div>

          <div className="pt-10 pb-10 flex justify-evenly">
            <Row
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
                  className="gutter-row justify-center flex"
                  span={6}
                >
                  <img src={ht.ImageURL} className="w-40 h-40" />
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Vòng tay</h1>
              <h3>Khám phá vòng tay bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button className="pt-5 pb-5 pl-10 pr-10">XEM THÊM</Button>
          </div>
          <div className="pt-10 pb-10 flex justify-evenly">
            <Row
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
                  className="gutter-row justify-center flex"
                  span={6}
                >
                  <img src={vt.ImageURL} className="w-40 h-40" />
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div>
          <div className="flex w-3/4 m-auto btn_prod">
            <div className="flex">
              <h1 className="title_3 text-4xl pr-10">Nhẫn</h1>
              <h3>Khám phá nhẫn bạc và vàng cho mọi dịp.</h3>
            </div>
            <Button className="pt-5 pb-5 pl-10 pr-10">XEM THÊM</Button>
          </div>

          <div className="pt-10 pb-10 flex justify-evenly">
            <Row
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
              {filterNh.map((n) => (
                <Col
                  key={n.id}
                  className="gutter-row justify-center flex"
                  span={6}
                >
                  <img src={n.ImageURL} className="w-40 h-40" />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAll;
