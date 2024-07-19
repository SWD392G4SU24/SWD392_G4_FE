import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { FaCartPlus, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearAll,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} from "../../../redux/features/cartSlice";
import { Badge, Button, Popconfirm, Radio, Tooltip } from "antd";
import { resetSelectedCustomer } from "../../../redux/features/customerSlice";
import QRCode from "qrcode.react";
import { clearOrderID, setOrderID } from "../../../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";

const StaffOrder = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
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
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [paymentQRUrl, setPaymentQRUrl] = useState("");
  const orderID = useSelector((store) => store.order.orderID);

  console.log(paymentUrl);

  function toggleCart() {
    setShowCart(!showCart);
  }

  async function handleSearchProduct() {
    try {
      const response = await api.get(
        `/Product/filter-product?PageNumber=1&PageSize=10&Name=${name}&CategoryID=${category}`
      );
      setProducts(response.data.data);
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
        promotionID: selectedPromotion,
        paymentMethodID: selectedPaymentMethod,
      };
      const response = await api.post("/order/staff-create", payload);
      const { value } = response.data;
      toast.success("Đã tạo đơn hàng mới thành công!");
      if (selectedPaymentMethod === 1) {
        setPaymentUrl(value);
        setPaymentCompleted(true);
        setShowPaymentQR(true);
        setPaymentQRUrl(value);
        const orderInfo = extractOrderInfo(value);
        dispatch(setOrderID(orderInfo));
      }
    } catch (e) {
      toast.error(e.response.data.value);
    }
  }

  async function handleDelete() {
    await api.delete(`/Order/delete/${orderID}`);
    toast.error("Thanh toán không thành công!");
  }

  async function fetchPaymentMethod() {
    const response = await api.get("/paymentMethod");
    const { value } = response.data;
    setPaymentMethods(value);
  }

  async function fetchPromotionByUserId() {
    const response = await api.get(
      `/Promotion/get-by-userID?PageNumber=1&PageSize=5&UserId=${customer.id}`
    );
    const { value } = response.data;
    setPromotions(value.data);
    console.log(value.data);
  }

  useEffect(() => {
    fetchCates();
    fetchPaymentMethod();
    fetchPromotionByUserId();
  }, []);

  function addToCart(product) {
    if (product.quantity === 0) {
      toast.warn(`Sản phẩm ${product.name} hiện đã hết hàng.`);
    } else {
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
  }

  function extractOrderInfo(url) {
    const regex = /vnp_OrderType=([^&]*)/;
    const match = url.match(regex);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
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

  async function increaseItemQuantity(id) {
    const product = carts.find((item) => item.id === id);
    const product2 = products.find((item) => item.id === id);
    if (product && product.quantity < product2.quantity) {
      dispatch(increaseQuantity(id));
    } else {
      toast.warn(`Số lượng sản phẩm "${product.name}" đã đạt đến giới hạn.`);
    }
  }

  async function decreaseItemQuantity(id) {
    dispatch(decreaseQuantity(id));
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  const handlePromotionSelection = (event) => {
    setSelectedPromotion(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="container mx-auto p-4 flex-1">
        <div className="flex">
          <h1 className="text-3xl font-semibold mb-4">Tìm kiếm sản phẩm</h1>
          <Popconfirm
            title="Hủy quá trình mua hàng"
            description="Bạn có muốn hủy quá trình mua hàng?"
            onConfirm={() => {
              dispatch(resetSelectedCustomer());
              dispatch(clearAll());
              dispatch(clearOrderID());
              navigate("/staffsearch");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Hủy mua hàng</Button>
          </Popconfirm>
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
              <button
                onClick={() => addToCart(product)}
                className="flex justify-center border rounded-md bg-black/80 py-1 px-3 "
              >
                <FaCartPlus className="mr-2 text-2xl text-orange-200" />
                <h1 className="text-white">Thêm vào giỏ hàng</h1>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Button */}
      <div
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full fixed bottom-4 right-4 cursor-pointer flex items-center"
        onClick={toggleCart}
      >
        <span className="mr-2">Giỏ hàng</span>
        {showCart ? (
          <FaTimes className="text-xl" />
        ) : (
          <Badge count={carts ? carts.length : 0}>
            <div className="m-3">
              <FaCartPlus className="text-xl" />
            </div>
          </Badge>
        )}
      </div>

      {/* Cart Content */}
      {showCart && (
        <div className="bg-gray-100 py-4 px-4 fixed bottom-16 left-0 right-0 z-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Badge count={carts ? carts.length : 0}>
                <h2 className="text-xl font-semibold">Giỏ hàng</h2>
              </Badge>
            </div>
            {/* Cart Items */}
            <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
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
                  <div>
                    <h2 className="pb-2">Mã khuyến mãi (nếu có)</h2>
                    <select
                      value={selectedPromotion}
                      onChange={handlePromotionSelection}
                      className="border border-gray-300 py-2 px-2"
                      style={{ width: "100%" }}
                    >
                      <option value="">Chọn mã khuyến mãi</option>
                      {promotions.map((promo) => (
                        <option key={promo.id} value={promo.id}>
                          {promo.id}-{promo.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handlePayment}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
                  >
                    Thanh toán
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Section */}
      {showPaymentQR && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg z-50">
          <h2 className="text-xl font-semibold mb-4">QR Code Thanh toán</h2>
          <div className="flex justify-center">
            <QRCode value={paymentQRUrl} size={200} />
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              handleDelete();
              dispatch(clearAll());
              setShowPaymentQR(false);
            }}
          >
            Đóng QR Code
          </Button>
        </div>
      )}

      {/* Cart Button */}
      <div
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full fixed bottom-4 right-4 cursor-pointer flex items-center"
        onClick={toggleCart}
      >
        <span className="mr-2">Giỏ hàng</span>
        {showCart ? (
          <FaTimes className="text-xl" />
        ) : (
          <Badge count={carts ? carts.length : 0}>
            <div className="m-3">
              <FaCartPlus className="text-xl" />
            </div>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default StaffOrder;
