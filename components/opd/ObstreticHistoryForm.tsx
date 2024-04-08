import { Card, Form, Input } from 'antd';
import React from 'react';

const ObstreticHistoryForm = () => {
  return (
    <Card title="Obstretic History / प्रसूति इतिहास" className="mt-10" size="small">
      <Form.Item label="Years of Marriage" name="years_of_marriage">
        <Input />
      </Form.Item>
      <Form.Item label="No of Pregnancy / गर्भावस्था को संख्या" name="no_of_pregnancy">
        <Input />
      </Form.Item>
      <Form.Item label="Outcome Of Pregnancy / गर्भावस्था को परिणाम" name="outcome_of_pregnancy">
        <Input />
      </Form.Item>
      <Form.Item
        label="Complications During Pregnancy / गर्भावस्था को समयमा जटिलताहरू"
        name="complications_during_pregnancy"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mode of Delivery" name="mode_of_delivery">
        <Input />
      </Form.Item>
      <Form.Item label="Last Child Birth / पछिल्लो बच्चा जन्म" name="last_child_birth">
        <Input />
      </Form.Item>
    </Card>
  );
};

export default ObstreticHistoryForm;
