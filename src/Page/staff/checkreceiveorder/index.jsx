import { Button, Popconfirm, Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedCustomer } from "../../../redux/features/customerSlice";

function CheckReceiveOrder() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentStatus, setCurrentStatus] = useState("PAID");

  const userid = useSelector((store) => store.customer.selectedCustomer.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders(currentStatus);
  }, [currentStatus]);

  const fetchOrders = async (status, pageNumber = 1, pageSize = 10) => {
    try {
      const response = await api.get(
        `/order/filter-order?PageNumber=${pageNumber}&PageSize=${pageSize}&Status=${status}&BuyerID=${userid}`
      );
      setOrders(response.data.data);
      setPagination({
        total: response.data.totalCount,
        pageSize: response.data.pageSize,
        current: pageNumber,
      });
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
    }
  };

  const handleTableChange = (pagination) => {
    fetchOrders(currentStatus, pagination.current);
  };

  const handleButtonClick = (status) => {
    setCurrentStatus(status);
  };

  const handleConfirmPickup = async (orderId) => {
    try {
      await api.put(`/order/confirm-picked-up`, { orderID: orderId });
      fetchOrders(currentStatus);
    } catch (error) {
      console.error("Error confirming pickup:", error);
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tổng tiền",
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
      title: "Mã người nhận",
      dataIndex: "buyerID",
      key: "buyerID",
    },
    {
      title: "Tên người nhận",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Ngày mua",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (pickupDate) => {
        return new Date(pickupDate).toLocaleString();
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Chức năng",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.status === "PAID" && (
            <Popconfirm
              title="Xác nhận đơn hàng"
              description="Người mua đã tới nhận hàng?"
              onConfirm={() => handleConfirmPickup(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Confirm Pickup</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type={currentStatus === "PAID" ? "primary" : "default"}
          onClick={() => handleButtonClick("PAID")}
          style={{ marginRight: "10px" }}
        >
          PAID
        </Button>
        <Button
          type={currentStatus === "COMPLETED" ? "primary" : "default"}
          onClick={() => handleButtonClick("COMPLETED")}
          style={{ marginRight: "10px" }}
        >
          COMPLETED
        </Button>
        <Button
          onClick={() => {
            navigate("/staffsearch"), dispatch(resetSelectedCustomer());
          }}
        >
          Quay về
        </Button>
      </div>

      <h2>Đơn hàng với trạng thái : {currentStatus}</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{
          ...pagination,
          onChange: handleTableChange,
        }}
        loading={!orders.length}
      />
    </div>
  );
}

export default CheckReceiveOrder;
