import { Button, ConfigProvider, Form } from "antd";
import CustomInput from "../../../../../CMSS/ThongKee/src/components/CustomInput";

export default function Tab2() {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

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
          labelHorizontal="Nhập mã đơn vị"
          name="tungay"
          placeholder="Nhập mã đơn vị"
          configBoderRadius={4}
          type="text"
          rules={[{ required: true, message: "Vui lòng nhập mã đơn vị" }]}
          formItemStyle={{}}
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
    </div>
  );
}
