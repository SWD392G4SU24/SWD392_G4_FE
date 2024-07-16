import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import api from "../../config/axios";
import { toast } from "react-toastify";

const StaffCounterJewelryStore = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customer, setCustomer] = useState([]);
  const [pagination, setPagination] = useState({});

  async function handleFilterUser(pageNumber = 1, pageSize = 3, RoleId = 3) {
    try {
      const response = await api.get(
        `/user/filter-user?PageNumber=${pageNumber}&PageSize=${pageSize}&FullName=${searchTerm}&Email=${searchTerm}&PhoneNumber=${searchTerm}&RoleID=${RoleId}`
      );
      setCustomer(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.totalCount,
        pageSize: response.data.pageSize,
        current: pageNumber,
      });
      console.log(response.data.data);
    } catch (e) {
      toast.error(e.response.detail);
    }
  }

  async function fetchCustomers() {
    try {
      const response = await api.get("");
    } catch (e) {
      console.log(e);
    }
  }

  
  const customers = [
    {
      id: 1,
      fullName: "John Doe",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      phoneNumber: "987-654-3210",
      email: "jane.smith@example.com",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Gold Necklace",
      image: "https://via.placeholder.com/150",
      quantity: 5,
      price: 500,
    },
    {
      id: 2,
      name: "Diamond Ring",
      image: "https://via.placeholder.com/150",
      quantity: 3,
      price: 1000,
    },
    {
      id: 3,
      name: "Silver Bracelet",
      image: "https://via.placeholder.com/150",
      quantity: 8,
      price: 300,
    },
  ];

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleSelectProduct = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information and Orders History */}
        <div className="border p-4 rounded-lg bg-white">
          <div className="flex">
            <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="border px-2 py-1 rounded-md w-48"
              onChange={handleSearchChange}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              onClick={() => handleFilterUser()}
            >
              Tìm kiếm
            </button>
          </div>
          <ul className="mb-4">
            {customers.map((customer) => (
              <li
                key={customer.id}
                className={`cursor-pointer py-2 ${
                  selectedCustomer && selectedCustomer.id === customer.id
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => handleSelectCustomer(customer)}
              >
                {customer.fullName} - {customer.phoneNumber}
              </li>
            ))}
          </ul>
          {selectedCustomer && (
            <>
              <div className="mb-4">
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {selectedCustomer.fullName}
                </p>
                <p>
                  <span className="font-bold">Phone:</span>{" "}
                  {selectedCustomer.phoneNumber}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {selectedCustomer.email}
                </p>
              </div>
              <h2 className="text-xl font-bold mb-4">Orders History</h2>
              <p>No orders found for this customer.</p>
            </>
          )}
        </div>

        {/* Product List and Order Section */}
        <div className="border p-4 rounded-lg bg-white">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Product List</h2>
            <input
              type="text"
              placeholder="Search product..."
              className="border px-2 py-1 rounded-md w-48"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedProducts.includes(product.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectProduct(product.id)}
              >
                <h3 className="font-bold">{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="mt-2 mb-2"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>
          {/* Order Section */}
          {selectedCustomer && (
            <div className="mt-8">
              <div className="border p-4 rounded-lg bg-white">
                <h2 className="text-xl font-bold mb-4">Order Section</h2>
                {selectedProducts.length > 0 ? (
                  <ul>
                    {selectedProducts.map((productId) => (
                      <li key={productId}>
                        {products.find((p) => p.id === productId)?.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products selected.</p>
                )}
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  onClick={() => console.log("Add to Cart clicked")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffCounterJewelryStore;
