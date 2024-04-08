import { MailOutlined } from '@ant-design/icons';
import { LoginPayload } from '@types';
import { Button, Col, Form, Image, Input, message } from 'antd';
import { login } from 'apis/auth';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';
import http, { setTokenInHeader } from 'utils/http';

import { LoginPage, TextBlock } from '../../styles/authCSS';

const CompanyDescriptionContainer = styled(Col)`
  height: 100vh;
  background-color: ${Colors.PRIMARY};
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
`;

const AuthBlock = styled(Col)`
  display: flex;
  flex-direction: column;
  padding: 150px 20px;
  background-color: ${Colors.WHITE};
  position: relative;
`;

const LoginImageContainer = styled.div`
  background-color: #fff;
  width: 100px;
  height: 80px;
  border-radius: 5px;
  padding: 10px 10px 0 10px;
  box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -webkit-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -moz-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -o-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -ms-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
`;

const LoginImagePartner = styled.div`
  background-color: #fff;
  width: 100px;
  height: 80px;
  border-radius: 5px;
  padding: 10px 10px 0 10px;
`;

const CompanyProfile = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${Colors.WHITE};
`;

const AuthBlockBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const FlexHorizontal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginNew: NextPage = (): JSX.Element => {
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
  const slide = [
    {
      image: '/img/auth/doctor.jpg',
      title: 'Virtual Consultation Services',
      content: 'Telemedicine offers remote access to medical consultations, advice, prescriptions, and follow-up care, eliminating the need for in-person clinic visits.',
      attr: 'Image by <a href="https://www.freepik.com/free-photo/person-using-ai-tool-job_60368920.htm#query=AI-support%20Diagnostics&position=0&from_view=search&track=ais&uuid=24f6e925-c016-42dd-810b-bd96c2110091">Freepik</a>'
    },
    {
      image: '/img/auth/ai_tool.jpg',
      title: 'AI-support Diagnostics',
      content: 'assists in interpreting medical images like X-rays, MRIs, and CT scans.',
      attr: 'Image by <a href="https://www.freepik.com/free-photo/person-using-ai-tool-job_60368920.htm#query=AI-support%20Diagnostics&position=0&from_view=search&track=ais&uuid=24f6e925-c016-42dd-810b-bd96c2110091">Freepik</a>'
    
    },
    {
      image: '/img/auth/family_card.jpg',
      title: 'Health card',
      content: 'provide individuals with access to healthcare services through a membership or insurance card. ',
      attr: 'Image by <a href="https://www.freepik.com/free-photo/person-using-ai-tool-job_60368920.htm#query=AI-support%20Diagnostics&position=0&from_view=search&track=ais&uuid=24f6e925-c016-42dd-810b-bd96c2110091">Freepik</a>'
    },
    {
      image: '/img/auth/community-health.jpg',
      title: 'Community Health Outreach',
      content: 'aims to improve the health and well-being of individuals by providing education, preventive care, and sometimes direct medical services in community.',
      attr: 'Image by <a href="https://www.freepik.com/free-photo/person-using-ai-tool-job_60368920.htm#query=AI-support%20Diagnostics&position=0&from_view=search&track=ais&uuid=24f6e925-c016-42dd-810b-bd96c2110091">Freepik</a>'
    },
    {
      image: '/img/auth/new-technology.jpg',
      title: 'New Technology',
      content: 'of AI-powered diagnostics in medicine to predictive analytics in business, these technologies are revolutionizing decision-making processes.',
      attr: 'Image by <a href="https://www.freepik.com/free-photo/person-using-ai-tool-job_60368920.htm#query=AI-support%20Diagnostics&position=0&from_view=search&track=ais&uuid=24f6e925-c016-42dd-810b-bd96c2110091">Freepik</a>'
    }
  ];
  return (
    <LoginPage style={{ height: '100vh', overflow: 'hidden' }} className="login-page">
      <CompanyDescriptionContainer span={8} className="company-desc-section">
        <div
          className="container"
          style={{
            width: '100%',
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <LoginImageContainer className="logo">
            <Image src="/logo/logo.png" preview={false} alt="Village Doctor" />
          </LoginImageContainer>
        </div>
        <CompanyProfile className="company-profile">
          <div className="text-content">
            <h1>Welcome to</h1>
            <span>Village Doctor</span>
            <p>
              एआई संग एकसाथ सञ्चालित स्वास्थ्य प्रणाली प्राविधिक प्रणाली हो , जसले प्रयोगकर्ताहरूलाई आफ्ना रोगलाई
              चिकित्साकोलागि सहयोग प्रदान गर्दछ र उनी हरूला ई आफ्ना रोगको निश्चित गर्ने थाहा पाइँदइँछ। यस समग्र प्रा वि
              धि क प्रस्ता वली ले वि शेष गरी गा उँका र उनी हरूको आफ्नो भएको स्वा स्थ्य सेवा गर्न सक्दछ, गा उँहरूला ई
              ठूलो फा इदा पुग्दछ।
            </p>
          </div>
          <AuthBlockBottom className="partners">
            <FlexHorizontal className="item-container">
              <LoginImagePartner className="item">
                <Image
                  src="/logo/aeirc_logo.png"
                  preview={false}
                  alt="Village Doctor"
                  style={{ backgroundSize: 'cover', height: '75px', width: '100px' }}
                />
              </LoginImagePartner>
              <LoginImagePartner className="item">
                <Image
                  src="/logo/naat.png"
                  preview={false}
                  alt="Village Doctor"
                  style={{ backgroundSize: 'cover', height: '75px', width: '100px' }}
                />
              </LoginImagePartner>
              <LoginImagePartner className="item">
                <Image
                  src="/logo/trimax_logo.png"
                  preview={false}
                  alt="Village Doctor"
                  style={{ backgroundSize: 'cover', height: '75px', width: '100px' }}
                />
              </LoginImagePartner>
            </FlexHorizontal>
            {/* <Divider style={{ borderBlockStart: '2px solid rgba(5, 5, 5, 0.10)' }} /> */}
            <TextBlock style={{ textAlign: 'center', fontSize: '13px' }}>
              AEIRC | Babarmahal Kathmandu 44600 | 9851046500 <br />@ 2023 AEIRC. All right reserved
            </TextBlock>
          </AuthBlockBottom>
        </CompanyProfile>
      </CompanyDescriptionContainer>
      <AuthBlock span={8} className="login-section">
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
        <AuthBlockBottom>
          <Image src="/img/remote_doctor_nobg.png" preview={false} alt="Village Doctor" />
        </AuthBlockBottom>
      </AuthBlock>
      <CompanyDescriptionContainer span={8} className="services-section">
        <div className='container'>
          <div className="section-title">
            <h1>Our Services</h1>
          </div>
          <div className="services-container">
            {slide.map((slide, index) => (
              <div className="outer" key={index}>
                <Image src={slide.image} alt={slide.attr} preview={false} />
                <div className="overlay">
                  <span className='title'>{slide.title}</span>
                  <span>{slide.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CompanyDescriptionContainer>
    </LoginPage>
  );
};

export default LoginNew;
