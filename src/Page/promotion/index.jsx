import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import en from "antd/es/date-picker/locale/en_US";
import { toast } from "react-toastify"; // Import toast for notifications
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function ManagePromotion() {
  const [form] = useForm();
  const [promotions, setPromotions] = useState([]);
  const [day, setDay] = useState(null);
  const [render, setRender] = useState(0);
  const [currentID, setCurrentID] = useState(null);
  const [currentPro, setCurrentPro] = useState({});

  const user = useSelector(selectUser);

  useEffect(() => {
    fetchPromotions();
  }, [render]);

  const fetchPromotions = async () => {
    try {
      const response = await api.get(`/Promotion`);
      setPromotions(response.data.value);
      console.log(response.data.value);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    console.log(currentID);
    if (currentID && currentID !== 0) {
      api.get(`/Promotion/${currentID}`).then((response) => {
        setCurrentPro(response.data.value);
        // form.setFieldsValue(response.data);
        console.log(response.data.value);
      });
    } else {
      form.resetFields();
    }
  }, [currentID]);

  const handleCancel = () => {
    setCurrentID(null);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleDelete = (id) => {
    api.delete(`/Promotion/delete/${id}`);
    console.log(id);
    message.success("Xóa mã thành công");
    setRender(render + 1);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Hủy xóa mã");
  };

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    try {
      const response = await api.post(`/Promotion/create`, {
        description: values.description,
        conditionsOfUse: values.conditionsOfUse,
        reducedPercent: values.reducedPercent,
        maximumReduce: values.maximumReduce,
        exchangePoint: values.exchangePoint,
        expiresTime: day,
        userID: user.id,
      });
      console.log("Create promotion response:", response.data);
      toast.success("Tạo thành công!");
      fetchPromotions();
      handleCancel();
      form.resetFields();
      setRender(render + 1);
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Đã xảy ra lỗi khi tạo mã khuyến mãi.");
    }
  };

  const buddhistLocale = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: "YYYY-MM-DD",
      fieldDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
      yearFormat: "YYYY",
      cellYearFormat: "YYYY",
    },
  };

  const onChange = (_, dateString) => {
    console.log("Selected date:", dateString);
    setDay(dateString);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setCurrentID(0);
        }}
        className="mt-7 ml-5 bg-gradient-to-r from-orange-300 to-orange-400 text-white"
      >
        Tạo mã khuyến mãi
      </Button>

      <Table
        columns={[
          {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Điều kiện sử dụng",
            dataIndex: "conditionsOfUse",
            key: "conditionsOfUse",
          },
          {
            title: "Phần trăm được giảm",
            dataIndex: "reducedPercent",
            key: "reducedPercent",
            align: "center",
          },
          {
            title: "Giảm tối đa",
            dataIndex: "maximumReduce",
            key: "maximumReduce",
            align: "center",
          },
          {
            title: "Điểm quy đổi",
            dataIndex: "exchangePoint",
            key: "exchangePoint",
            align: "center",
          },
          {
            title: "Có hiệu lực đến",
            dataIndex: "expiresTime",
            key: "expiresTime",
          },
          {
            title: "",
            dataIndex: "",
            render: (_, value) => {
              return (
                <Space>
                  <Button onClick={() => setCurrentID(value.id)}>
                    Chỉnh sửa
                  </Button>
                  <Popconfirm
                    title="Xóa mã khuyến mãi"
                    description="Bạn có chắc muốn xóa mã khuyến mãi này?"
                    onConfirm={() => handleDelete(value.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
        dataSource={promotions}
      />

      <Modal
        title={`${
          currentID === 0 ? "Tạo mã khuyến mãi" : "Chỉnh sửa mã khuyến mãi"
        }`}
        open={currentID !== null}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Mô tả"
            name={"description"}
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea
              rows={2}
              defaultValue={currentID !== 0 ? currentPro?.description : ""}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng mã khuyến mãi"
            name={"conditionsOfUse"}
            rules={[
              {
                required: true,
                message: "Số lượng mã khuyến mãi không được để trống",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "150px",
              }}
              defaultValue={currentID !== 0 ? currentPro?.conditionsOfUse : ""}
              min={0}
              max={10000}
            />
          </Form.Item>
          <Form.Item
            label="Phần trăm được giảm"
            name={"reducedPercent"}
            rules={[
              {
                required: true,
                message: "Phần trăm được giảm không được để trống",
              },
            ]}
          >
            <InputNumber
              defaultValue={currentID !== 0 ? currentPro?.reducedPercent : ""}
              min={0}
              max={100}
              style={{
                width: "150px",
              }}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace("%", "")}
              // onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Giảm tối đa"
            name={"maximumReduce"}
            rules={[
              { required: true, message: "Giảm tối đa không được để trống" },
            ]}
          >
            <InputNumber
              style={{
                width: "150px",
              }}
              defaultValue={formatCurrency(
                currentID !== 0 ? currentPro?.maximumReduce : ""
              )}
            />
          </Form.Item>
          <Form.Item
            label="Điểm quy đổi"
            name={"exchangePoint"}
            rules={[
              { required: true, message: "Điểm quy đổi không được để trống" },
            ]}
          >
            <InputNumber
              style={{
                width: "150px",
              }}
              defaultValue={currentID !== 0 ? currentPro?.exchangePoint : ""}
            />
          </Form.Item>
          <Form.Item
            label="Có hiệu lực đến"
            name={"expiresTime"}
            rules={[
              { required: true, message: "Ngày hiệu lực không được để trống" },
            ]}
          >
            <DatePicker
              showTime
              locale={buddhistLocale}
              onChange={onChange}
              format={"YYYY-MM-DDHH:mm:ss"}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagePromotion;
