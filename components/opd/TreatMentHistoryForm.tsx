import { Card, Form, Input } from 'antd';
import React from 'react';

const TreatMentHistoryForm = () => {
    const {TextArea} = Input;
  return (
    <Card title="Treatment History / उपचारको इतिहास" className="mt-10" size="small">
      <Form.Item name="treatment_history">
        <TextArea rows={2} />
      </Form.Item>
    </Card>
  );
};

export default TreatMentHistoryForm;
