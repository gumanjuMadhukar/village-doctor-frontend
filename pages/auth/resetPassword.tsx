import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NextPage } from 'next';
import React from 'react';
import Colors from 'utils/colors';

import {
  AuthBlock,
  LoginContainer,
  LoginImageBlock,
  LoginPage,
  PageLogo,
  TextBlock,
  VerticalDividerLine
} from '../../styles/authCSS';

const ResetPassword: NextPage = (): JSX.Element => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    // validate your userinfo
  };

  return (
    <LoginPage>
      <PageLogo>
        <img src="/diagonal-technologies-logo.png" alt="diagonal-technologies-logo" width="200px" />
      </PageLogo>
      <LoginContainer>
        <LoginImageBlock>
          <img src="/password-login.svg" alt="login" />
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>
          <h3>Reset your password</h3>
          <form onSubmit={onSubmit}>
            <Form.Item>
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
          </form>
          <TextBlock>
            <span>
              <a style={{ color: '#aaa' }} href="/login">
                Back to login
              </a>
            </span>
          </TextBlock>
        </AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default ResetPassword;
