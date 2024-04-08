import { Card, Form, Input } from 'antd';
import React from 'react';

const HOPI = (record: any) => {
  const { TextArea } = Input;
  const showDuration = record?.isPsychiatryPatient;
  return (
    <>
      <Card
        title="History of Presenting Illness (HOPI) / प्रस्तुत रोग को  इतिहासका कारण "
        className="mt-10"
        size="small"
      >
        <Form.Item name="hopi" rules={[{ required: true, message: 'Please enter HOPI' }]}>
          <TextArea defaultValue={record?.hopi} rows={2}></TextArea>
        </Form.Item>
      </Card>
      {showDuration && (
        <Card
        title="Total Duration Of Illness "
        className="mt-10"
        size="small"
      >
        <Form.Item name="total_duration_of_illness" rules={[{ required: true, message: 'Please enter the duration' }]}>
          <TextArea defaultValue={record?.hopi} rows={2}></TextArea>
        </Form.Item>
      </Card>
      )}
    </>
  );
};

export default HOPI;
