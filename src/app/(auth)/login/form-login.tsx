"use client";

import React, { useContext, useState } from "react";
import { LoginWrap } from "./Login.styles";
import LoginLeft from "./login-left";
import { Button, ConfigProvider, Form } from "antd";
import CustomInput from "@/components/CustomInput";
import { Images } from "@/assets/images";
import Image from "next/image";
import CustomLoading from "@/components/CustomLoading";
import { NotificationContext } from "@/contexts/notification.context";
import { authApiRequests } from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";

type Props = {};

const FormLogin = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { handleOpenNotification } = useContext(NotificationContext);
  const router = useRouter();
  const { setUser } = useAppContext();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const callback = (error: any) => {
        setLoading(false);
        handleOpenNotification({
          type: "error",
          message: "Đăng nhập thất bại",
          description:
            error.response?.data?.message || error.response?.data?.title,
        });
        console.log("error", error);
      };

      const res: any = await authApiRequests.login({
        ...values,
        donvi_ma_dv: "0103930279-999",
        password: "ncm@123",
        username: "admin",
        reCaptchaToken: "6LfRAYApAAAAAO6tYfzdtFmuRNOtCOH3BxTy9pCM",
      });

      if (res.status === 400) {
        setLoading(false);
        handleOpenNotification({
          type: "error",
          message: "Đăng nhập thất bại",
          description: res?.payload?.message,
        });
        return;
      }

      if (res.payload?.data?.token_info.access_token) {
        await authApiRequests.auth({
          access_token: res.payload?.data?.token_info.access_token,
          refresh_token: res.payload?.data?.token_info.refresh_token,
        });

        console.log(res.payload?.data);

        setUser({
          donvi_ma_dv: res.payload?.data?.profile?.donvi_ma_dv,
          username: res.payload?.data?.profile?.username,
          token_info: res.payload?.data?.token_info,
        });

        // localStorage.setItem(
        //   "token",
        //   JSON.stringify({
        //     access_token: res.payload?.data?.token_info.access_token,
        //     refresh_token: res.payload?.data?.token_info.refresh_token,
        //   })
        // );
        router.push("/", { scroll: false });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleOpenNotification({
        type: "error",
        message: "Đăng nhập thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
      });
    }
  };

  return (
    <LoginWrap>
      <div>
        {loading && <CustomLoading loading={loading} />}
        <div className="login-form__img login-form__img-left">
          <LoginLeft />
        </div>
        <div className="login-form">
          <div className="login-form_logo">
            <Image
              width={360}
              height={100}
              style={{
                height: "auto",
              }}
              src={Images.Logo}
              alt="logo"
              priority={true}
            />
          </div>
          <p className="login-form__wellcome">Welcome Back!</p>
          <p className="login-form__wellcome-sub">Đăng nhập để tiếp tục</p>

          <Form onFinish={handleLogin}>
            <CustomInput
              label="Mã đơn vị"
              name="donvi_ma_dv"
              placeholder="Nhập mã đơn vị"
              type="text"
              stylelabel={{ lineHeight: 1.2, marginBottom: 4 }}
              configBoderRadius="4px"
              rules={[{ required: true, message: "Vui lòng nhập mã đơn vị!" }]}
              style={{ padding: "8px 12px" }}
            />

            <CustomInput
              label="Tên đăng nhập"
              name="username"
              placeholder="Nhập tên đăng nhập"
              type="text"
              stylelabel={{ lineHeight: 1.2, marginBottom: 4 }}
              configBoderRadius="4px"
              rules={[{ required: true, message: "Vui lòng nhập !" }]}
              style={{ padding: "8px 12px" }}
            />

            <CustomInput
              label="Password"
              name="password"
              placeholder="Nhập mật khẩu"
              type="password"
              stylelabel={{ lineHeight: 1.2, marginBottom: 4 }}
              configBoderRadius="4px"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ padding: "8px 12px" }}
            />

            <Form.Item
              style={{
                marginTop: 40,
                width: "100%",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 4,
                    colorPrimary: "#0254e6",
                  },
                  components: {
                    Button: {
                      /* here is your component tokens */
                      paddingBlock: 8,
                    },
                  },
                }}
              >
                <Button htmlType="submit" type="primary">
                  Đăng nhập
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        <div className="login-form__img login-form__img-right">
          <LoginLeft />
        </div>
      </div>
    </LoginWrap>
  );
};

export default FormLogin;
