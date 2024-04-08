import { MailOutlined } from '@ant-design/icons';
import { LoginPayload } from '@types';
import { Button, Form, Image, Input, message } from 'antd';
import { login } from 'apis/auth';
import MySlider from 'components/slider';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import Slider from 'react-slick';
import http, { setTokenInHeader } from 'utils/http';

import { CompanyInfo, CompanySlider, LoginPage, TextBlock } from '../../styles/authCSS';
import {
  AuthBlock,
  AuthBlockBottom,
  CompanyDescriptionContainer,
  CompanyProfile,
  LoginImageContainer,
  Services
} from '../../styles/newLoginPage';

const NewLogin: NextPage = (): JSX.Element => {
  const router = useRouter();

  const loginMutation = useMutation(login, {
    onSuccess: response => {
      const { access_token } = response.data;
      const role = response.data.user.roles[0].name;
      const username = response.data.user.username;
      Cookies.set('token', access_token);
      Cookies.set('role', role);
      Cookies.set('username', username);
      setTokenInHeader(http, access_token);
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
  const slides = [
    { image: '/logo/aeirc_logo.png' },
    { image: '/logo/naat.png' },
    { image: '/logo/trimax_logo.png' },
    { image: '/logo/aeirc_logo.png' },
    { image: '/logo/naat.png' },
    { image: '/logo/trimax_logo.png' },
    { image: '/logo/aeirc_logo.png' },
    { image: '/logo/naat.png' },
    { image: '/logo/trimax_logo.png' }
  ];
  const slide = [
    {
      image: '/img/auth/analysis.jpg',
      title: 'Data Management',
      content: 'Secure storage and easy access to records.'
    },
    {
      image: '/img/auth/doctor.jpg',
      title: 'Remote doctor',
      content: 'Easier consultations with distant specialists'
    },
    {
      image: '/img/auth/machine.jpg',
      title: 'Technological Advancements',
      content: ' Innovative tools enhancing healthcare delivery.'
    },
    {
      image: '/img/auth/note.jpg',
      title: 'Convenience',
      content: 'Easy scheduling, no travel, and reduced wait times.'
    }
  ];
  return (
    <>
      <CompanyInfo>
        <LoginPage>
          <CompanyDescriptionContainer span={8}>
            <div className="welcome-section">
              <div className="text-content">
                <h1>
                  Welcome To <span>Village Doctor</span>
                </h1>
                <p>
                  Distance cant diminish the care of a virtual doctor, bridging gaps to deliver healing wherever needed.
                </p>
              </div>
              <div className="image-container">{/* <Image src={}></Image> */}</div>
            </div>
            <CompanyProfile>
              <p>
                Create a virtual-healthcare system that combines the power of Artificial Intelligence (AI) to assist
                users in diagnosing their health issues and connect them with experienced senior consultants through
                virtual video consultations. This comprehensive solution targets rural areas, like Palika Chauki, to
                ensure healthcare access for underserved communities.
              </p>
            </CompanyProfile>
            <TextBlock style={{ textAlign: 'center' }}>
              AEIRC | Babarmahal Kathmandu 44600 | 9851046500 <br />@ 2023 AEIRC. All right reserved
            </TextBlock>
          </CompanyDescriptionContainer>
          <AuthBlock span={8}>
            <div className="login-form">
              <div className="section-title">
                <h1>Login</h1>
              </div>
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
                  <Button type="primary" block size="large" htmlType="submit" style={{ width: '100px' }}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <AuthBlockBottom>
              <Image src="/img/remote_doctor_nobg.png" preview={false} alt="Village Doctor" />
            </AuthBlockBottom>
          </AuthBlock>
          <CompanyDescriptionContainer span={8}>
            <div
              className="container"
              style={{
                width: '100%',
                textAlign: 'right',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <LoginImageContainer>
                <Image src="/logo/logo.png" preview={false} alt="Village Doctor" />
              </LoginImageContainer>
            </div>
            <div className="right-content">
              <h2>
                In the simplicity of rural life, the <span>Village Doctor</span> dedication shines as a guiding light.
              </h2>
            </div>
            <Services>
              <Slider
                slidesToShow={2}
                slidesToScroll={1}
                autoplay={true}
                speed={3000}
                pauseOnHover={false}
                className={'services-slider'}
                prevArrow={<></>}
                nextArrow={<></>}
              >
                {slide.map((slide, index) => (
                  <div className="outer" key={index}>
                    <Image src={slide.image} alt={`Slide ${index}`} preview={false} />
                    <div className="overlay">
                      <h2>{slide.title}</h2>
                      <p>{slide.content}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </Services>
          </CompanyDescriptionContainer>
        </LoginPage>
        <CompanySlider>
          <MySlider slides={slides} />
        </CompanySlider>
      </CompanyInfo>
    </>
  );
};

export default NewLogin;
