import { NextPageWithLayout } from '@types';
import { Alert, Button, Form, Input, Modal, Typography } from 'antd';
import { otpVerify, resendOtpVerify } from 'apis/auth';
import AuthLayout from 'components/layout/auth-layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

const SuccessWrapper = styled.div`
  text-align: center;
  padding: 30px 0px 20px 0px;
  img {
    margin-bottom: 15px;
  }
`;

const ResgistrationSuccess = styled.div`
  font-size: 24px;
`;

const ResgistrationSuccessFooter = styled.div``;

const Verification: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(true);
  const otpVerificationMutation = useMutation((data: any) => otpVerify(data));
  const resendOtpVerificationMutation = useMutation((data: any) => resendOtpVerify(data));
  const router = useRouter();
  const { verification } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTimer = localStorage.getItem('otpTimer');
    if (!storedTimer) {
      localStorage.setItem('otpTimer', '180');
      setSeconds(180);
    } else {
      setSeconds(parseInt(storedTimer, 10));
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
      localStorage.setItem('otpTimer', '0');
      return () => null;
    }
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    if (seconds !== 180) {
      localStorage.setItem('otpTimer', seconds.toString());
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const onFinish = (otpCode: any) => {
    const userId = Number(verification);
    const { otp: otpString } = otpCode;
    const otp = Number(otpString);

    const data = { otp, userId };
    otpVerificationMutation.mutate(data, {
      onSuccess: () => {
        setErrorMessageText(null);
        setIsModalOpen(true);
      },
      onError: (errData: any) => {
        const errors = errData?.response?.data?.errors;
        const errorMessages = errors?.map((item: any) => item.errors.matches);
        const message = errData?.response?.data?.message;
        setErrorMessageText(errorMessages || message);
      }
    });
  };

  const handleResendOtp = () => {
    const userId = Number(verification);
    resendOtpVerificationMutation.mutate(userId, {
      onSuccess: () => {
        setExpired(false);
        setSeconds(180);
      }
    });
  };

  const validateOtpLength = (_rule: any, value: any) => {
    if (value.length !== 4) {
      return Promise.reject(new Error('The input value must be exactly 4 characters'));
    }
    return Promise.resolve();
  };
  return (
    <>
      <Head>
        <title>OTP Verification</title>
      </Head>
      <h2 style={{ fontSize: '30px', margin: '0' }}>Verification Code</h2>
      <p>Please enter the verification code</p>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: 'Please input OTP sent in your email!'
            },
            {
              message: 'OTP must be 4 characters.',
              validator: validateOtpLength
            }
          ]}
          validateTrigger="onSubmit"
        >
          <Input type="text" size="large" placeholder="Enter OTP" autoComplete="false" />
        </Form.Item>
        {!expired && (
          <p style={{ color: '#1890FF' }}>
            {minutes < 10 ? `0${minutes}` : minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
          </p>
        )}
        {errorMessageText && (
          <div>
            <Alert type="error" message={errorMessageText} banner />
            <br />
          </div>
        )}
        <span>
          Didn&apos;t receive the OTP?&nbsp;
          <Typography.Link
            style={{
              color: !expired ? Colors.DISABLED : Colors.PRIMARY,
              pointerEvents: !expired ? 'none' : 'auto',
              cursor: !expired ? 'not-allowed' : 'pointer'
            }}
            onClick={handleResendOtp}
          >
            Resend OTP
          </Typography.Link>
        </span>
        <br />
        <br />
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
            Verify Now
          </Button>
        </Form.Item>
      </Form>
      <Modal footer={false} closable={false} open={isModalOpen} centered>
        <SuccessWrapper>
          <img src="/checkmark.svg" className="sidebar-logo" alt="logo.png" />
          <ResgistrationSuccess>Registration completed successfully</ResgistrationSuccess>
          <ResgistrationSuccessFooter>
            Congratulations, your account has been successfully created.{' '}
          </ResgistrationSuccessFooter>
          <Button
            style={{
              marginTop: 32,
              backgroundColor: Colors.PRIMARY,
              color: Colors.WHITE
            }}
            size="large"
            onClick={() => router.push(`/auth/login`)}
          >
            Back to Login
          </Button>
        </SuccessWrapper>
      </Modal>
    </>
  );
};
Verification.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Verification;
