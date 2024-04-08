import { Image } from 'antd';
import React from 'react';
import { AuthBlock, LoginContainer, LoginImageBlock, LoginPage, PageLogo, VerticalDividerLine } from 'styles/authCSS';

type AuthLayoutProps = React.PropsWithChildren;

const AuthLayout: React.FC<AuthLayoutProps> = props => {
  const { children } = props;
  return (
    <LoginPage>
      <PageLogo>
        <Image src="/nextly-logo.svg" alt="logo" width="168px" preview={false}/>
      </PageLogo>
      <LoginContainer>
        <LoginImageBlock>
          <Image src="/password-login.svg" alt="login" preview={false} />
        </LoginImageBlock>
        <VerticalDividerLine />
        <AuthBlock>{children}</AuthBlock>
      </LoginContainer>
    </LoginPage>
  );
};

export default AuthLayout;
