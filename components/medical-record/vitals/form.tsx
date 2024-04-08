import { Button, Form, message } from 'antd';
import { addVitals } from 'apis/admin/vitals';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { getInitials } from 'utils/helpers';

import Vitals from '.';

interface props {
  handleCancel?: () => void;
}
const VitalForm = ({ handleCancel }: props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    setName(getInitials());
  }, []);
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
      created_by: name,
      ...data
    };
    createVitalsMutation.mutate(formData);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Vitals />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button type="ghost">Cancel</Button>
    </Form>
  );
};

export default VitalForm;
