import { Col, Row, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../../config/axios";

function DayChuyen() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchProductAll = async (pageNumber = 1, pageSize = 10) => {
    try {
      const response = await api.get(
        `/Product/filter-product?PageNumber=${pageNumber}&PageSize=${pageSize}&CategoryID=${7}`
      );

      setPagination({
        ...pagination,
        total: response.data.totalCount,
        pageSize: response.data.pageSize,
        current: pageNumber,
      });

      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductAll();
  }, []);

  const handlePageChange = (page, pageSize) => {
    fetchProductAll(page);
  };

  const handleClick = (dc) => {
    window.location.href = `/prodetail/${dc.id}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="dark:bg-black/85 dark:text-white">
      <div className="w-3/4 m-auto btn_prod text-center pt-8">
        <div>
          <h1 className="title_3 text-4xl pr-10">Dây chuyền</h1>
          <h3>Khám phá dây chuyền bạc và vàng cho mọi dịp.</h3>
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
          {products.map((dc) => (
            <Col
              key={dc.id}
              className="gutter-row justify-between flex flex-col pt-12 paper  "
              span={6}
              onClick={() => handleClick(dc)}
            >
              <img src={dc.imageURL} className="w-50 h-50 " alt={dc.name} />
              <h3 className="absolute -bottom-5 font-medium w-50">{dc.name}</h3>
              <h3 className="absolute -bottom-10 text-amber-700 w-50">
                {formatCurrency(dc.productCost)}
              </h3>
            </Col>
          ))}
        </Row>
      </div>

      {pagination.total > 0 && (
        <div className="text-center my-4 ">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default DayChuyen;
