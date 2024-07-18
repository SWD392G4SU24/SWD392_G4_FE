import { Button, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";

function CheckReceiveOrder() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (pageNumber = 1, pageSize = 10) => {
    try {
      const response = await api.get(
        `/order/filter-order?PageNumber=${pageNumber}&PageSize=${pageSize}&Status=paid`
      );
      setOrders(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.totalCount,
        pageSize: response.data.pageSize,
        current: pageNumber,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleTableChange = (pagination) => {
    fetchOrders(pagination.current);
  };

  const handleConfirmPickup = async (orderId) => {
    try {
      await api.put(`/order/confirm-picked-up`, { orderID: orderId });
      fetchOrders();
    } catch (error) {
      console.error("Error confirming pickup:", error);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Cost",
      dataIndex: "orderDetailsDto",
      key: "productCost",
      render: (orderDetailsDto) => {
        if (orderDetailsDto && orderDetailsDto.length > 0) {
          return orderDetailsDto[0].productCost.toLocaleString() + " VND";
        }
        return "-";
      },
    },
    {
      title: "Buyer ID",
      dataIndex: "buyerID",
      key: "buyerID",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Pickup Date",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (pickupDate) => {
        return new Date(pickupDate).toLocaleString();
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Popconfirm
          title="Xác nhận đơn hàng"
          description="Người mua đã tới nhận hàng?"
          onConfirm={() => handleConfirmPickup(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button>Confirm Pickup</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => navigate("/staffsearch")}>Quay về</Button>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={handleTableChange}
        loading={!orders.length}
      />
    </div>
  );
}

export default CheckReceiveOrder;
