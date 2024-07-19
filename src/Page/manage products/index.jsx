import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import uploadFile from "../../utils/upload";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const navigate = useNavigate();
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [diamonds, setDiamonds] = useState([]);
  const [golds, setGolds] = useState([]);
  const [cates, setCates] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formInitialValues, setFormInitialValues] = useState({});
  const handleDeleteProduct = async (id) => {
    console.log("delete product", id);
    const response = await api.delete(`/Product/delete/${id}`);

    console.log(response);
    const listAfterDelete = dataSource.filter((product) => product.id !== id);
    setDataSource(listAfterDelete);
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageURL",
      key: "imageURL",
      render: (imageURL) => <Image src={imageURL} width={200} />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Loại vàng",
      dataIndex: "goldType",
      key: "goldType",
    },
    {
      title: "Khối lượng vàng",
      dataIndex: "goldWeight",
      key: "goldWeight",
    },
    {
      title: "Loại kim cương",
      dataIndex: "diamondType",
      key: "diamondType",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <div className="flex">
          <Button onClick={() => handleEditProduct(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteProduct(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setFormInitialValues(product); // Set initial form values
    setIsEditModalVisible(true);
    setFileList([
      {
        uid: product.id,
        name: "image.png",
        status: "done",
        url: product.imageURL,
      },
    ]);
  };

  const handleUpdateProduct = async (values) => {
    try {
      if (!values.goldType) {
        values.goldType = "";
      }
      if (!values.diamondType) {
        values.diamondType = "";
      }
      const response = await api.patch(`/Product/update`, values);
      console.log(response);
      const updatedProducts = dataSource.map((product) =>
        product.id === values.id ? response.data : product
      );
      setDataSource(updatedProducts);
      setIsEditModalVisible(false);
      toast.success("Cập nhật sản phẩm thành công!");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật sản phẩm không thành công. Vui lòng thử lại sau!");
    }
  };

  // Modal close handler
  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setCurrentProduct(null);
    form.resetFields();
  };
  async function fetchProducts() {
    try {
      const response = await api.get("/Product");
      setDataSource(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchDiamonds() {
    try {
      const response = await api.get("/diamond/get-db-price");
      setDiamonds(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchGolds() {
    try {
      const response = await api.get("/goldBtmc/get-price");
      setGolds(response.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchDiamonds();
    fetchProducts();
    fetchGolds();
    fetchCates();
  }, []);

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleHideModal() {
    setIsOpen(false);
  }

  function handleOk() {
    form.submit();
  }

  async function handleSubmit(values) {
    try {
      console.log(values);
      console.log(values.imageURL.file.originFileObj);
      const url = await uploadFile(values.imageURL.file.originFileObj);
      values.imageURL = url;
      console.log(values);
      if (!values.goldType) {
        values.goldType = "";
      }
      if (!values.diamondType) {
        values.diamondType = "";
      }
      const response = await api.post("/Product/create", values);
      toast.success("Tạo thành công!");
      console.log(response.data);
      setDataSource([...dataSource, response.data]);
      fetchProducts();

      handleHideModal();

      form.resetFields();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { errors } = error.response.data;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            errors[key].forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      }
    }
  }

  return (
    <div className="product-management py-5 px-20">
      <Button onClick={() => navigate("/manager")}>Quay ve</Button>
      <Button
        type="primary"
        onClick={handleShowModal}
        className="bg-gradient-to-r from-orange-300 to-orange-400 text-white"
      >
        Tạo sản phẩm
      </Button>

      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Add new product"
        visible={isOpen}
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryID"
            rules={[{ required: true }]}
          >
            <Select>
              {cates.map((cate) => (
                <Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Poster"
            name="imageURL"
            rules={[{ required: true }]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 6 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="Gold Type" name="goldType">
            <Select>
              {golds.map((gold) => (
                <Option key={gold.name} value={gold.name}>
                  {gold.name}-{gold.karaContent}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Gold Weight" name="goldWeight">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Diamond Type" name="diamondType">
            <Select>
              {diamonds.map((diamond) => (
                <Option key={diamond.name} value={diamond.name}>
                  {diamond.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa sản phẩm"
        visible={isEditModalVisible}
        onCancel={handleModalCancel}
        footer={null} // No footer for simplicity
      >
        <Form
          form={form}
          initialValues={formInitialValues}
          onFinish={handleUpdateProduct}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="imageURL"
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryID"
            rules={[{ required: true }]}
          >
            <Select>
              {cates.map((cate) => (
                <Option key={cate.id} value={cate.id}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Gold Type" name="goldType">
            <Select>
              {golds.map((gold) => (
                <Option key={gold.name} value={gold.name}>
                  {gold.name}-{gold.karaContent}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Khối lượng vàng" name="goldWeight">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Loại kim cương" name="diamondType">
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterClose: () => setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default ManageProducts;
