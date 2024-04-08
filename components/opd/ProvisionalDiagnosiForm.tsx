import { Card, Form, Input } from 'antd';
import React from 'react';

const ProvisionalDiagnosiForm = () => {
    const {TextArea} = Input;
  return (
    <Card title="Provisional Diagnosis / अस्थायी निदान" className="mt-10" size="small">
      <Form.Item name="provisional_diagnosis" rules={[{ required: true, message: 'Please enter the Diagnosis!' }]}>
        <TextArea rows={2} />
      </Form.Item>
    </Card>
  );
};

export default ProvisionalDiagnosiForm;
