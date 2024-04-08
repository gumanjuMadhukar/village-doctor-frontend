import { NextPageWithLayout, ResetPasswordPayload } from '@types';
import { Alert, Button, Form, Input } from 'antd';
import { resetPassword } from 'apis/auth';
import CustomLink from 'components/CustomLink';
import AuthLayout from 'components/layout/auth-layout';
import urls from 'configs/urls';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import Colors from 'utils/colors';

import { TextBlock } from '../../../styles/authCSS';

const ResetPassword: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const resetPasswordMutation = useMutation((data: ResetPasswordPayload) => resetPassword(data));

  const onFinish = (formValues: any) => {
    const userId = Number(id);
    const data = { ...formValues, userId };

    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        setErrorMessageText(null);
        router.push(`/auth/login`);
      },
      onError: (errData: any) => {
        const errors = errData?.response?.data?.errors;
        const errorMessages = errors?.map((item: any) => item.errors.matches);
        const message = errData?.response?.data?.message;
        setErrorMessageText(errorMessages || message);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <h2>Create New Password</h2>
      <Form name="resetPassword" onFinish={onFinish} autoComplete="off">
        <Form.Item name="newPassword" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password size="large" placeholder="Password" autoComplete="false" type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              }
            })
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" autoComplete="false" type="password" />
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
        <CustomLink text="Back to Login" url={urls.login} customStyle={{ color: '#404040', fontWeight: '400' }} />
      </TextBlock>
    </>
  );
};

ResetPassword.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ResetPassword;
