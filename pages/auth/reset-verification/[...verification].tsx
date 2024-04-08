import { ForgotPasswordPayload, NextPageWithLayout } from '@types';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { forgotPasswordOtpVerify, getEmailForForgotPassword } from 'apis/auth';
import AuthLayout from 'components/layout/auth-layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Colors from 'utils/colors';

const ResetVerification: NextPageWithLayout = () => {
  const [errorMessageText, setErrorMessageText] = useState(null);
  const [seconds, setSeconds] = useState(180);
  const [expired, setExpired] = useState(false);
  const router = useRouter();
  const { verification } = router.query;

  const forgotPasswordVerification = useMutation((data: any) => forgotPasswordOtpVerify(data));
  const forgotPasswordMutation = useMutation((data: ForgotPasswordPayload) => getEmailForForgotPassword(data));

  useEffect(() => {
    const storedTimer = localStorage.getItem('timer');
    if (!storedTimer) {
      localStorage.setItem('timer', '180');
      setSeconds(180);
    } else {
      setSeconds(parseInt(storedTimer, 10));
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setExpired(true);
      localStorage.setItem('timer', '0');
      return () => null;
    }
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    if (seconds !== 180) {
      localStorage.setItem('timer', seconds.toString());
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
    forgotPasswordVerification.mutate(data, {
      onSuccess: () => {
        setErrorMessageText(null);
        localStorage.removeItem('resetEmail');
        router.push(`/auth/reset-password/${userId}`);
      },
      onError: (errData: any) => {
        const errorMessages = errData?.response?.data?.message;
        setErrorMessageText(errorMessages);
      }
    });
  };

  const handleResendOtp = () => {
    const data = {
      email: localStorage.getItem('resetEmail') || ''
    };
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setExpired(false);
        setSeconds(180);
        setErrorMessageText(null);
      },
      onError: (errData: any) => {
        const message = errData?.response?.data?.message;
        setErrorMessageText(message);
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
        <title>Reset Password Verification</title>
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
          <Input
            type="text"
            size="large"
            placeholder="Enter OTP"
            autoComplete="false"
            onChange={() => setErrorMessageText(null)}
          />
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
            // onClick={showModal}
          >
            Verify Now
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
ResetVerification.getLayout = function (page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ResetVerification;
