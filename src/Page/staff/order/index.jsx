import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { FaCartPlus, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearAll,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../../redux/features/cartSlice";
import { Badge, Radio, Tooltip } from "antd";
import { resetSelectedCustomer } from "../../../redux/features/customerSlice";
import QRCode from "qrcode.react";

const StaffOrder = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [cates, setCates] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const dispatch = useDispatch();
  const customer = useSelector((store) => store.customer.selectedCustomer);
  const carts = useSelector((store) => store.cart.products);
  const [showCart, setShowCart] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  function toggleCart() {
    setShowCart(!showCart);
  }

  async function handleSearchProduct() {
    try {
      const response = await api.get(
        `/Product/filter-product?PageNumber=1&PageSize=10&Name=${name}&CategoryID=${category}`
      );
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  }

  async function fetchCates() {
    try {
      const response = await api.get("/category");
      const { value } = response.data;
      setCates(value);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePayment() {
    try {
      const orderDetails = carts.map((item) => ({
        productID: item.id,
        quantity: item.quantity,
      }));

      const payload = {
        buyerID: customer.id,
        orderDetails: orderDetails,
        promotionID: "",
        paymentMethodID: selectedPaymentMethod,
      };
      const response = await api.post("/order/staff-create", payload);
      const { value } = response.data;
      setPaymentUrl(value);
      setPaymentCompleted(true);
      toast.success("Mua thành công!");
      console.log(response.data);
    } catch (e) {
      toast.error(e.response.data.detail);
    }
  }

  async function fetchPaymentMethod() {
    const response = await api.get("/paymentMethod");
    const { value } = response.data;
    console.log(value);
    setPaymentMethods(value);
  }

  useEffect(() => {
    fetchCates();
    fetchPaymentMethod();
  }, []);

  function addToCart(product) {
    const existingItem = carts.find((item) => item.id === product.id);
    if (existingItem && existingItem.quantity >= product.quantity) {
      toast.warn(
        `Sản phẩm ${product.name} đã đạt đến giới hạn số lượng có thể thêm.`
      );
    } else {
      dispatch(addProduct(product));
      toast.success(`${product.name} đã được thêm vào giỏ hàng.`);
    }
  }

  function removeFromCart(product) {
    dispatch(removeProduct(product.id));
    toast.warn(`${product.name} đã được xóa khỏi giỏ hàng.`);
  }

  function calculateTotal() {
    return carts.reduce(
      (total, product) => total + product.productCost * product.quantity,
      0
    );
  }

  function increaseItemQuantity(id) {
    dispatch(increaseQuantity(id));
  }

  function decreaseItemQuantity(id) {
    dispatch(decreaseQuantity(id));
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace(/,/g, ".");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-1">
        <div className="flex ">
          <h1 className="text-3xl font-semibold mb-4">Tìm kiếm sản phẩm</h1>
          <button
            onClick={() => {
              dispatch(resetSelectedCustomer());
              dispatch(clearAll());
              window.location.href = "/staffsearch";
            }}
            className="border rounded px-3 py-1 bg-red-500 text-white"
          >
            Hủy mua hàng
          </button>
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Tên sản phẩm..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-1/2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-1/2"
          >
            <option value="">Chọn danh mục sản phẩm</option>
            {cates.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearchProduct}
            className="bg-gradient-to-r from-blue-300 to-blue-400 py-3 px-4 rounded-md"
          >
            <FcSearch className="text-xl " />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-black p-4 rounded-md flex flex-col bg-white/40"
            >
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-5/6 h-2/4"
              />
              <h2 className="text-lg font-semibold ">{product.name}</h2>{" "}
              <p className="text-gray-600">
                <Tooltip title={product.id}>
                  <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap w-60">
                    Mã sản phẩm: {product.id}
                  </span>
                </Tooltip>
              </p>
              <p className="text-orange-300 mt-3">
                {formatPrice(product.productCost)}
              </p>
              <p className="text-black font-normal">
                Số lượng: {product.quantity}
              </p>
              <button onClick={() => addToCart(product)}>
                <FaCartPlus className="mr-2 text-2xl text-orange-300" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="bg-gray-100 py-4 px-4 fixed bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Badge count={carts ? carts.length : 0}>
              <h2 className="text-xl font-semibold">Giỏ hàng</h2>
            </Badge>
            {/* Toggle Cart Visibility Button */}
            <button
              onClick={toggleCart}
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
            >
              {showCart ? "Ẩn giỏ hàng v" : "Hiển thị giỏ hàng ^"}
            </button>
          </div>
          {/* Cart Items */}
          {showCart && (
            <div className="grid grid-cols-1 gap-4">
              {carts.length === 0 ? (
                <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
              ) : (
                carts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-lg shadow-sm p-4"
                  >
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">
                        Giá: {formatPrice(item.productCost)}
                      </p>
                      <p className="text-gray-600">
                        Số lượng mua: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center px-7 gap-5">
                      <button
                        onClick={() => decreaseItemQuantity(item.id)}
                        className="text-red-500 hover:text-red-600 focus:outline-none"
                      >
                        <FaMinus className="text-black" />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseItemQuantity(item.id)}
                        className="text-green-500 hover:text-green-600 focus:outline-none"
                      >
                        <FaPlus className="text-black" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 hover:text-red-600 focus:outline-none pl-40"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              )}
              {/* Total and Payment Button */}
              {carts?.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold">Tổng tiền:</p>
                  <p className="text-lg font-semibold">
                    {formatPrice(calculateTotal())}
                  </p>
                </div>
              )}
              {carts?.length > 0 && (
                <div className="mt-4 flex">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Chọn phương thức thanh toán:
                    </h2>
                    {paymentMethods.map((method) => (
                      <Radio
                        key={method.id}
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      >
                        {method.name}
                      </Radio>
                    ))}
                  </div>
                  <button
                    onClick={handlePayment}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                  >
                    Thanh toán
                  </button>
                  {paymentCompleted && (
                    <div className="flex justify-center mt-4">
                      <QRCode value={paymentUrl} size={200} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StaffOrder;