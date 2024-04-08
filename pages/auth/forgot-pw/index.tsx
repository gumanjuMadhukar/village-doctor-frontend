import { MailOutlined } from '@ant-design/icons';
import { ForgotPasswordPayload, NextPageWithLayout } from '@types';
import { Alert, Button, Form, Input, message } from 'antd';
import { getEmailForForgotPassword } from 'apis/auth';
import AuthLayout from 'components/layout/auth-layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import { officeEmailValidation } from 'utils';
import Colors from 'utils/colors';

import { TextBlock } from '../../../styles/authCSS';

const ForgotPassword: NextPageWithLayout = () => {
  const router = useRouter();
  const [errorMessageText, setErrorMessageText] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const forgotPasswordMutation = useMutation((data: ForgotPasswordPayload) => getEmailForForgotPassword(data));
  const onFinish = (body: ForgotPasswordPayload) => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Sending OTP code.'
    });
    forgotPasswordMutation.mutate(body, {
      onSuccess: (data: any) => {
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'OTP code sent successfully!',
            duration: 2
          });
        }, 1000);
        setErrorMessageText(null);
        const userId = data?.data?.data?.user?.id;
        localStorage.setItem('resetEmail', body?.email);
        router.push(`/auth/reset-verification/${userId}`);
      },
      onError: (data: any) => {
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'error',
            content: 'OTP code not sent!',
            duration: 2
          });
        }, 1000);
        const errMessage = data?.response?.data?.message;
        setErrorMessageText(errMessage);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      {contextHolder}
      <h2>Reset your password</h2>
      <Form name="forgot-password" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            {
              message: 'Provide office email.',
              validator: officeEmailValidation
            }
          ]}
          validateTrigger="onSubmit"
        >
          <Input type="email" size="large" placeholder="Email" suffix={<MailOutlined />} autoComplete="false" />
        </Form.Item>
        {errorMessageText && (
          <div>
            <Alert type="error" message={errorMessageText} banner />
            <br />
          </div>
        )}
        <Form.Item>
          <Button
            style={{
              width: '100%',
              backgroundColor: Colors.PRIMARY,
              color: '#fff'
            }}
            size="large"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <TextBlock>
        {/* <CustomLink text="Back to Login" url={urls.login} customStyle={{ color: '#404040', fontWeight: '400' }} /> */}
      </TextBlock>
    </>
  );
};

ForgotPassword.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
