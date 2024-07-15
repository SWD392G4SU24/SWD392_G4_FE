import { Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../../config/axios";

function VongTay() {
  const [products, setProduct] = useState([]);
  const [pagination, setPagination] = useState([]);

  const fetchProductAll = async (pageNumber = 1, pageSize = 10) => {
    const response = await api.get(
      // "https://667cd2303c30891b865dc8d6.mockapi.io/productAll"
      `/Product/filter-product?PageNumber=${pageNumber}&PageSize=${pageSize}&CategoryID=${7}`
    );

    setPagination({
      ...pagination,
      total: response.data.totalCount,
      pageSize: response.data.pageSize,
      current: pageNumber,
    });

    console.log(response.data.data);
    setProduct(response.data.data);
  };

  useEffect(() => {
    fetchProductAll();
  }, []);

  const handleVT = (pagination) => {
    fetchProductAll(pagination.current);
  };

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
          {products.map((vt) => (
            <Col
              key={vt.id}
              className="gutter-row justify-center flex flex-col pt-12 paper"
              span={6}
              onChange={handleVT()}
              onClick={() => {
                window.location.href = `/prodetail/${vt.id}`;
              }}
            >
              <img src={vt.imageURL} className="w-40 h-40 " />
              <h3 className="absolute -bottom-5 font-medium w-40">{vt.name}</h3>
              <h3 className="absolute -bottom-10 text-gray-400 w-40">
                {vt.productCost}
              </h3>
            </Col>
          ))}
        </Row>
        <Pagination defaultCurrent={1} total={10} pageSize={10} />;
      </div>
    </div>
  );
}

export default VongTay;
