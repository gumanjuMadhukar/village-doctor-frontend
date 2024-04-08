import { Card, Form, Input } from 'antd';
import React from 'react';

const MensturalHistoryForm = () => {
  return (
    <Card title="Menstural History / मासिक रोग्नी इतिहास" className="mt-10" size="small">
      <Form.Item label="Last Menstural History" name="last_menstural_history">
        <Input />
      </Form.Item>
      <Form.Item label="Menarche / " name="menarche">
        <Input />
      </Form.Item>
      <Form.Item label="Duration Of Period / महिनावारीको अवधि" name="duration_of_period">
        <Input />
      </Form.Item>
      <Form.Item label="Regularity / नियमितता" name="regularity">
        <Input />
      </Form.Item>
      <Form.Item label="Dysmenorrhoea / डिसमेनोरिया " name="dysmenorrhoea">
        <Input />
      </Form.Item>
      <Form.Item label="Amount of Loss" name="amount_of_loss">
        <Input />
      </Form.Item>
    </Card>
  );
};

export default MensturalHistoryForm;
