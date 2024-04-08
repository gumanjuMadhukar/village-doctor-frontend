import { MailOutlined } from '@ant-design/icons';
import { LoginPayload } from '@types';
import { Button, Form, Input, message } from 'antd';
import { login } from 'apis/auth';
import CustomLink from 'components/CustomLink';
import urls from 'configs/urls';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import http, { setTokenInHeader } from 'utils/http';

import {
  AuthBlock,
  LoginContainer,
  LoginImageBlock,
  LoginPage,
  TextBlock,
  VerticalDividerLine
} from '../../styles/authCSS';

const Login: NextPage = (): JSX.Element => {
  const router = useRouter();

  const loginMutation = useMutation(login, {
    onSuccess: response => {
      const { token } = response.data;
      const role = response.data.role[0].name;
      const username = response.data.user.name;
      Cookies.set('token', token);
      Cookies.set('role', role);
      Cookies.set('username', username);
      setTokenInHeader(http, token);
      router.push('/dashboard');
    },
    onError: (errData: any) => {
      const errorMessage = errData?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: LoginPayload) => {
    loginMutation.mutate(data);
  };
  return (
    <LoginPage>
      <LoginContainer>
        <LoginImageBlock>
          <img src="/password-login.svg" alt="login" />
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>
          <h2>Login</h2>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input
                name="email"
                id="email"
                type="email"
                size="large"
                placeholder="Email"
                suffix={<MailOutlined />}
                autoComplete="false"
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password
                name="password"
                id="password"
                size="large"
                placeholder="Password"
                type="password"
                autoComplete="false"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block size="large" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <TextBlock>
            <span>
              <CustomLink text="Forgot your Password?" url={urls.forgotPassword} customStyle={{ color: '#aaa' }} />
            </span>
            <br />
            <span>
              Don&apos;t have an Account?&nbsp;&nbsp;
              <CustomLink text="Register" url={urls.register} />
            </span>
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
