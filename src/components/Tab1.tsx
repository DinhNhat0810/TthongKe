"use client";

import { Button, ConfigProvider, Form } from "antd";
import CustomInput from "./CustomInput";

export default function Tab1() {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const thangketongquanData = [
    {
      title: "Số lượng MST đã cấp",
    },
    {
      title: "Số lượng cấp mới / gia hạn",
    },
    {
      title: "Số lượng MST đang hoạt động",
    },
    {
      title: "Số lượng HĐ đã phát hành",
    },
    {
      title: "Số lượng user truy cập",
    },
    {
      title: "Thời gian TB ký gửi cấp mã CQT",
    },
  ];

  return (
    <div>
      <Form
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
        onFinish={(values) => {
          handleFinish(values);
        }}
        form={form}
      >
        <CustomInput
          labelHorizontal="Từ ngày"
          name="tungay"
          placeholder="Từ ngày"
          size="large"
          configBoderRadius={4}
          type="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
          formItemStyle={{}}
        />

        <CustomInput
          labelHorizontal="Đến ngày"
          name="denngay"
          placeholder="Đến ngày"
          size="large"
          configBoderRadius={4}
          type="date"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
          formItemStyle={{
            marginLeft: "8px",
          }}
          //   disabledDate={(data: any) =>
          //     disabledDate(data, form.getFieldValue("tungay"))
          //   }
        />

        <Form.Item
          style={{
            marginLeft: "8px",
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 4,
              },
            }}
          >
            <Button htmlType="submit" type="primary">
              Lấy dữ liệu
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>

      <div className="tab1-content">
        {thangketongquanData.map((item, index) => {
          return (
            <div className="tab1-content-item" key={index}>
              <div className="tab1-content-item-label">{item?.title}</div>
              <div className="tab1-content-item-value">100</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
