import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";

function Accounts() {
  const [datasource, setDatasource] = useState([]);
  const [pagination, setPagination] = useState({});
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
  ];

  async function fetchAccounts(pageNumber = 1, pageSize = 10) {
    try {
      const response = await api.get(
        `/user/pagination?PageNumber=${pageNumber}&PageSize=${pageSize}`
      );
      setDatasource(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.data.totalCount,
        pageCount: response.data.data.pageCount,
        current: response.data.data.pageNumber,
        pageSize: response.data.data.pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleTableChange = (pagination) => {
    fetchAccounts(pagination.current);
  };

  return (
    <div>
      <Table
        dataSource={datasource}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Accounts;
