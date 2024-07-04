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

function ManageProducts() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteProduct = async (id) => {
    console.log("delete product", id);
    const response = await axios.delete(
      `https://dassie-living-bonefish.ngrok-free.app/Product/delete/${id}`
    );

    console.log(response);
    const listAfterDelete = dataSource.filter((product) => product.id !== id);
    setDataSource(listAfterDelete);
  };
  const columns = [
    // {
    //   title: "Sản phẩm",
    //   dataIndex: "name",
    //   key: "name",
    // },
    {
      title: "Sản phẩm",
      dataIndex: "id",
      key: "id",
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
      dataIndex: "categoryID",
      key: "categoryID",
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
      render: (id) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => handleDeleteProduct(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
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
  async function fetchProducts() {
    try {
      const response = await api.get(
        "https://dassie-living-bonefish.ngrok-free.app/Product"
      );
      setDataSource(response.data.value);
    } catch (e) {
      console.log(e);
    }

    // setDataSource(response.data);
  }

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
    console.log(values);
    console.log(values.imageURL.file.originFileObj);
    const url = await uploadFile(values.imageURL.file.originFileObj);
    values.imageURL = url;
    console.log(values);
    const response = await axios.post(
      "https://dassie-living-bonefish.ngrok-free.app/Product/create",
      {
        goldWeight: values.goldWeight,
        goldType: values.goldType,
        diamondType: values.diamondType,
        imageURL: values.imageURL,
        quantity: values.quantity,
        description: values.description,
        categoryID: values.categoryID,
      }
    );
    console.log(response);
    setDataSource([...dataSource, response.data]);

    // hide modal
    handleHideModal();

    // clear form
    form.resetFields();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-management py-5">
      <Button type="primary" onClick={handleShowModal}>
        Add new product
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
              <Option value={1}>Vòng cổ</Option>
              <Option value={2}>Nhẫn</Option>
              <Option value={3}>Khuyên tai</Option>
              <Option value={4}>Vòng tay</Option>
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
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Gold Type"
            name="goldType"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={1}>14k</Option>
              <Option value={2}>18k</Option>
              <Option value={3}>24k</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Gold Weight"
            name="goldWeight"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Diamond Type"
            name="diamondType"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={1}>3ly6</Option>
              <Option value={2}>3ly6</Option>
              <Option value={3}>3ly6</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={2} />
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
