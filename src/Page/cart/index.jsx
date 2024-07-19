import { CloseOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  selectProduct,
} from "../../redux/features/cartSlice";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/counterSlice";
function Cart() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleDeleteProduct = async (id) => {
    console.log(id);
    dispatch(removeProduct(id));
  };

  const carts = useSelector((store) => store.cart.products);
  console.log(carts);
  console.log(carts.length);

  async function fetchProducts() {
    const response = await api.get("/Product");
    setProducts(response.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function increaseItemQuantity(id) {
    const product = carts.find((item) => item.id === id);
    const product2 = products.filter((item) => item.id === id);
    if (product && product.quantity < product2[0].quantity) {
      dispatch(increaseQuantity(id));
    } else {
      toast.warn(`Số lượng sản phẩm "${product.name}" đã đạt đến giới hạn.`);
    }
  }

  async function decreaseItemQuantity(id) {
    dispatch(decreaseQuantity(id));
  }

  const handleBuyButtonClick = () => {
    if (user === null) {
      navigate("/login1");
      dispatch(clearAll());
      toast.warn("Bạn phải đăng nhập để tiếp tục mua hàng!");
    } else {
      dispatch(selectProduct(checked));
      navigate("/orderreview");
    }
  };
  const columns = [
    {
      title: "San Pham",
      dataIndex: "name",
      key: "name",
      render: (value) => {
        return <p className="w-12">{value}</p>;
      },
    },
    {
      title: "Hinh anh mo ta",
      dataIndex: "imageURL",
      key: "imageURL",
      align: "center",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
    {
      title: "Chi tiet",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "So luong",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity, record) => (
        <div className="flex">
          <Button
            shape="circle"
            icon="-"
            onClick={() => {
              decreaseItemQuantity(record.id);
            }}
          />
          <span style={{ margin: "0 8px" }}>{quantity}</span>
          <Button
            shape="circle"
            icon="+"
            onClick={() => increaseItemQuantity(record.id)}
          />
        </div>
      ),
    },
    {
      title: "Hanh dong",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn muốn xóa sản phẩm này ra khỏi giỏ hàng?"
          onConfirm={() => handleDeleteProduct(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  const count = checked.reduce((total, id) => total + id.quantity, 0);
  console.log(count);

  return (
    <div className="">
      <div className="rounded-xl shadow-md duration-200 relative z-40 bg-white/50 bottom-1 w-full">
        <div className="flex justify-between items-center py-6 px-6">
          <div className="flex justify-center items-center">
            <ShoppingOutlined className="px-5 text-2xl " />
            <h1 className="text-xl font-mono">Shopping Cart</h1>
          </div>
          <CloseOutlined className="px-5" />
        </div>
      </div>

      <div className="py-1 w-full">
        <Table
          columns={columns}
          dataSource={carts}
          bordered
          rowKey="id"
          rowSelection={{
            onChange: (id, value) => {
              setChecked(value);
            },
          }}
        />
      </div>
      <div className="flex justify-between w-full px-40 py-20">
        <h1>Tổng Số Lượng Mua: </h1>
        <button
          className="rounded-lg bg-black text-white py-1 px-10"
          onClick={() => {
            // dispatch(selectProduct(checked));
            // navigate("/orderreview");
            handleBuyButtonClick();
          }}
        >
          Mua hàng ({count})
        </button>
      </div>
    </div>
  );
}

export default Cart;
