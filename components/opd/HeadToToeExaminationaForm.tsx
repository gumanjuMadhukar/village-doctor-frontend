import { Card, Form, Input } from 'antd';
import React from 'react';

const HeadToToeExaminationaForm = () => {
const { TextArea } = Input;

  return (
    <Card title="Head To Toe Examination / शिरदेखि पाउँ परीक्षण" className="mt-10" size="small">
      <Form.Item name="head_to_toe">
        <TextArea rows={1} />
      </Form.Item>
    </Card>
  );
};

export default HeadToToeExaminationaForm;
