"use client";

import { Button, ConfigProvider, Form } from "antd";
import { capmoitaikhoanfields } from "../config";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/contexts/notification.context";
import { DashBoardWrap } from "./CapMoiTaiKhoan.styles";
import CustomLoading from "@/components/CustomLoading";
import CustomInput from "@/components/CustomInput";
import AddModal from "./add-modal";
import { userApiRequests } from "@/apiRequests/user";

export default function CapMoiTaiKhoan() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { handleOpenNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form2.resetFields();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    form1.resetFields();
  };

  const handleFinish = async (values: any) => {
    for (const key in values) {
      if (values[key] === undefined) {
        values[key] = "";
      }
    }

    setLoading(true);
    try {
      const res: any = await userApiRequests.themttdonvi({
        ...values,
      });

      if (res.status === 401 || res.status === 400) {
        setLoading(false);
        handleOpenNotification({
          type: "error",
          message: "Thêm mới thông tin đơn vị thất bại",
          description: res?.payload?.message,
        });
        return;
      }

      if (res?.status === 200) {
        form1.resetFields();
        handleOpenNotification({
          type: "success",
          message: "Thêm mới thông tin đơn vị thành công",
          description: "",
        });
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      handleOpenNotification({
        type: "error",
        message: "Thêm mới thông tin đơn vị thất bại",
        description: "",
      });
    }
  };

  const handleCreateAccount = async (values: any) => {
    setLoading(true);

    try {
      const res: any = await userApiRequests.themuser({
        ...values,
        role_ids: [values.role_ids],
      });

      if (res.status === 401 || res.status === 400) {
        setLoading(false);
        handleOpenNotification({
          type: "error",
          message: "Thêm mới người dùng thất bại",
          description: res?.payload?.message,
        });
        return;
      }

      if (res?.status === 200) {
        form1.resetFields();
        handleOpenNotification({
          type: "success",
          message: "Thêm mới người dùng thành công",
          description: "",
        });
        handleCancel();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleOpenNotification({
        type: "error",
        message: "Thêm mới người dùng thất bại",
        description: "",
      });
    }
  };

  return (
    <DashBoardWrap>
      <CustomLoading loading={loading} />
      <div className="content-area">
        <div className="content-area__title">
          <h3>Thêm mới thông tin đơn vị</h3>
          <Button onClick={showModal} type="primary">
            Thêm người dùng
          </Button>
        </div>

        <Form onFinish={handleFinish} form={form1}>
          <div className="form-capmoi">
            <div className="form-capmoi__left">
              <p>{capmoitaikhoanfields.basicInfo.title}</p>
              <div>
                {capmoitaikhoanfields.basicInfo.fields.map((field, index) => {
                  return (
                    <div key={index} style={{ width: field.width }}>
                      <CustomInput
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        configBoderRadius={4}
                        type={field.type}
                        rules={field.rules}
                        formItemStyle={{
                          marginBottom: field?.note ? 0 : 20,
                        }}
                      />
                      {field?.note && (
                        <p
                          style={{
                            fontSize: 12,
                            color: "gray",
                            marginBottom: 16,
                          }}
                        >
                          {field.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="form-capmoi__right">
              <p>{capmoitaikhoanfields.contactInfo.title}</p>
              {capmoitaikhoanfields.contactInfo.fields.map(
                (field: any, index) => {
                  return (
                    <div key={index} style={{ width: field.width }}>
                      <CustomInput
                        label={field.label}
                        name={field.name}
                        placeholder={field.placeholder}
                        configBoderRadius={4}
                        type={field.type}
                        rules={field?.rules}
                        formItemStyle={{
                          marginBottom: 20,
                        }}
                      />
                    </div>
                  );
                }
              )}

              <p>{capmoitaikhoanfields.bankInfo.title}</p>
              {capmoitaikhoanfields.bankInfo.fields.map((field: any, index) => {
                return (
                  <div key={index} style={{ width: field.width }}>
                    <CustomInput
                      label={field.label}
                      name={field.name}
                      placeholder={field.placeholder}
                      configBoderRadius={4}
                      type={field.type}
                      rules={field?.rules}
                      formItemStyle={{
                        marginBottom: 20,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="submit-btn">
            <Form.Item
              style={{
                marginLeft: "8px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 4,
                  },
                }}
              >
                <Button onClick={handleReset} type="default">
                  Làm mới
                </Button>
              </ConfigProvider>
            </Form.Item>
            <Form.Item
              style={{
                marginLeft: "8px",
                display: "flex",
                justifyContent: "flex-end",
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
                  Thêm mới
                </Button>
              </ConfigProvider>
            </Form.Item>
          </div>
        </Form>

        <AddModal
          title="Thêm người dùng"
          isModalOpen={isModalOpen}
          handleCreateAccount={handleCreateAccount}
          handleCancel={handleCancel}
          form={form2}
        />
      </div>
    </DashBoardWrap>
  );
}
