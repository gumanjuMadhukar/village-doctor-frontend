import { Button, Form, message } from 'antd';
import { addVitals } from 'apis/admin/vitals';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import MedicalHistory from '.';

interface props {
  handleCancel?: () => void;
  defaultValue?: any;
  form: any;
}

const HistoryForm = ({ handleCancel, defaultValue, form }: props) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (defaultValue) {
      form.setFieldValue('medical_history', defaultValue[0]?.medical_history);
      form.setFieldValue('surgical_history', defaultValue[0]?.surgical_history);
      form.setFieldValue('family_history', defaultValue[0]?.family_history[0]);
      form.setFieldValue('relavant_family_history', defaultValue[0]?.family_history[1]?.family_relavant_history);
    }
  }, [defaultValue, form]);
  const createVitalsMutation = useMutation(addVitals, {
    onSuccess: () => {
      form.resetFields();
      handleCancel && handleCancel();
      queryClient.invalidateQueries('vitalList');
      message.success('Vitals has been added successfully');
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    const formData = {
      date_of_measurement: dayjs().format('YYYY-MM-DD'),
      ...data
    };
    createVitalsMutation.mutate(formData);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <MedicalHistory />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default HistoryForm;
