import {
  Button,
  DatePicker,
  Modal,
  Table,
  Tag,
  Form,
  Input,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { format, parseISO, setDate } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi"; // Import vietnamese language
import buddhistEra from "dayjs/plugin/buddhistEra";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import { toast } from "react-toastify";
dayjs.extend(buddhistEra);

function ManageForm() {
  const [form] = Form.useForm();
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState({});
  const [currentID, setCurrentID] = useState(null);
  const [day, setDay] = useState();
  const [render, setRender] = useState(0);

  const fetchForms = async () => {
    try {
      const response = await api.get("/Form");
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [render]);

  const fetchCurrentForm = async () => {
    try {
      const response = await api.get(`/Form/${currentID}`);
      form.setFieldsValue({
        ...response.data,
        
      })
      setCurrentForm(response.data);
    } catch (error) {
      console.log("Error fetching form data:", error);
    }
  };

  const showModal = (id) => {
    setCurrentID(id);
    console.log(id);
  };

  const handleCancel = () => {
    setCurrentID(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
    setCurrentID(null);
    setRender(render + 1);
  };

  const handleUpdateForm = async (values) => {
    try {
      const data = {
        ...currentForm,
        content: values.content == null ? currentForm.content : values.content,
        appoinmentDate: day == null ? currentForm.appoinmentDate : day,
        type: currentForm.type,
        id: currentID,
      };

      // const dataStatus = {
      //   formID: currentID,
      //   status: values.status == null ? currentForm.status : values.status,
      // };

      console.log(data);

      await api.patch(
        `/Form/update?FormID=${currentID}&Content=${currentForm.content}&AppointmentDate=${values.appoinmentDate}`,
        data
      );

      await api.put(`/form/update-status`, {
        formID: currentID,
        status: values.status == null ? currentForm.status : values.status,
      });
      // fetchForms();
      handleCancel();
      setRender(render + 1);
    } catch (error) {
      // console.error("Error updating form:", error.response.data.detail);
      // toast.error(error.response.AppointmentDate);
    }
  };

  useEffect(() => {
    fetchCurrentForm();
  }, [currentID !== null]);

  const onChange = (_, dateString) => {
    console.log(dateString);
    setDay(dateString);
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

  const globalBuddhistLocale = {
    ...enUS,
    DatePicker: {
      ...enUS.DatePicker,
      lang: buddhistLocale.lang,
    },
  };

  // const columns = [
  //   {
  //     title: "Loại đơn",
  //     dataIndex: "type",
  //     key: "type",
  //   },
  //   {
  //     title: "Nội dung đơn",
  //     dataIndex: "content",
  //     key: "content",
  //   },
  //   {
  //     title: "Trạng thái",
  //     dataIndex: "status",
  //     key: "status",

  //     render: (text, record) => {
  //       return <Tag color="blue">{record.status}</Tag>;
  //     },
  //   },
  //   {
  //     title: "Ngày hẹn",
  //     dataIndex: "appoinmentDate",
  //     key: "appoinmentDate",
  //     render: (date) => {
  //       const formattedDay = date ? dayjs(date).format("DD-MM-YYYY") : "";
  //       return date && <span>{formattedDay}</span>;
  //     },
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (record) => (
  //       <Button onClick={() => showModal(record.id)}>Chỉnh sửa</Button>
  //     ),
  //   },
  // ];

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div className=" dark:bg-black/85 dark:text-orange-500 h-screen">
      <h1 className="text-4xl text-amber-700 py-7 pl-5">Quản lý đơn</h1>
      {/* <Table columns={columns} dataSource={forms} /> */}
      <Table
        columns={[
          {
            title: "Loại đơn",
            dataIndex: "type",
            key: "type",
            render: (record) => {
              return <h1 className="font-bold font-sans">{record}</h1>;
            },
          },
          {
            title: "Nội dung đơn",
            dataIndex: "content",
            key: "content",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            filters: [
              {
                text: "Pending",
                value: "PENDING",
              },
              {
                text: "Approved",
                value: "APPROVED",
              },
              {
                text: "Reject",
                value: "REJECTED",
              },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (text, record) => {
              return record.status === "APPROVED" ? (
                <Tag color="green">{record.status}</Tag>
              ) : record.status === "PENDING" ? (
                <Tag color="blue">{record.status}</Tag>
              ) : (
                <Tag color="red">{record.status}</Tag>
              );
            },
          },
          {
            title: "Ngày hẹn",
            dataIndex: "appoinmentDate",
            key: "appoinmentDate",
            render: (date) => {
              const formattedDay = date
                ? dayjs(date).format("YYYY-MM-DDHH:mm:ss")
                : "";
              return date && <span>{formattedDay}</span>;
            },
          },
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Button onClick={() => showModal(record.id)}>Chỉnh sửa</Button>
            ),
          },
        ]}
        dataSource={forms}
      />
      <Modal
        title="Chỉnh sửa/Duyệt đơn"
        visible={currentID !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={currentID ? { currentID } : {}}
          onFinish={handleUpdateForm}
        >
          <Form.Item label="Loại đơn" name={"type"}>
            {currentForm.type}
          </Form.Item>
          <Form.Item label="Nội dung đơn" name={"content"}>
            <Input.TextArea defaultValue={currentForm.content} disabled />
          </Form.Item>
          <Form.Item label="Ngày hẹn" name={"appoinmentDate"}>
            <DatePicker
              showTime
              locale={buddhistLocale}
              onChange={onChange}
              format={"YYYY-MM-DD HH:mm:ss"}
            />
            {/* <DatePicker onChange={onChange} format={"DD-MM-YYYY"} /> */}
          </Form.Item>
          <Form.Item label="Trạng thái" name={"status"}>
            <Select
              style={{ width: 150 }}
              defaultValue={currentForm.status}
              onChange={handleChange}
              options={[
                { value: "PENDING", label: "PENDING" },
                { value: "APPROVED", label: "APPROVED" },
                { value: "REJECTED", label: "REJECTED" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageForm;
