import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import en from "antd/es/date-picker/locale/en_US";
import { toast } from "react-toastify"; // Import toast for notifications

function ManagePromotion() {
  const form = useForm();
  const [promotions, setPromotions] = useState([]);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await api.get(`/Promotion`);
      setPromotions(response.data.value);
      console.log(response.data.value);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    form.submit();
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
      });
      console.log("Create promotion response:", response.data);
      toast.success("Tạo thành công!"); // Notify success
      fetchPromotions(); // Refresh promotions after creation
      handleCancel(); // Close modal after successful creation
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error("Error creating promotion:", error);
      // Handle error (show message, retry, etc.)
    }
  };

  const buddhistLocale = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: "YYYY-MM-DD",
      fieldDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
      yearFormat: "YYYY",
      cellYearFormat: "YYYY",
    },
  };

  const onChange = (_, dateString) => {
    console.log("Selected date:", dateString);
    setDay(dateString);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
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
            title: "% Giảm",
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
            title: "Quy đổi ra xu",
            dataIndex: "exchangePoint",
            key: "exchangePoint",
            align: "center",
          },
          {
            title: "Có hiệu lực đến",
            dataIndex: "expiresTime",
            key: "expiresTime",
          },
        ]}
        dataSource={promotions}
      />

      <Modal
        title="Create Promotion"
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Conditions of Use"
            name="conditionsOfUse"
            rules={[
              {
                required: true,
                message: "Điều kiện sử dụng không được để trống",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="% Reduced"
            name="reducedPercent"
            rules={[
              { required: true, message: "Giảm tối đa không được để trống" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Maximum Reduce"
            name="maximumReduce"
            rules={[
              { required: true, message: "Giảm tối đa không được để trống" },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Exchange Points"
            name="exchangePoint"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Expires Time"
            name="expiresTime"
            rules={[
              { required: true, message: "Ngày hiệu lực không được để trống" },
            ]}
          >
            <DatePicker
              showTime
              locale={buddhistLocale}
              onChange={onChange}
              format={"YYYY-MM-DD HH:mm:ss"}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagePromotion;
