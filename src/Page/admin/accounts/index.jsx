// import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";

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
    <div className="px-16">
      <div className="flex pt-3 pb-12">
        <div className="border rounded-md bg-gray-200 font-medium">
          <h1 className=" px-3 py-1 ">Account</h1>
        </div>
        <div className="relative group hidden sm:block">
          <input
            placeholder="Search..."
            className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-200"
          />
          <SearchOutlined className="ml-[-25px] mr-2 text-gray-500 group-hover:text-orange-200" />
        </div>
      </div>
      <div>
        <Table
          dataSource={datasource}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default Accounts;
