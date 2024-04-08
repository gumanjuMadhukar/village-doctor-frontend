import { Card, Col, Form, Input, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';

const ChildForm = () => {
  const [protocol, setProtocol] = useState<string>('');

  const onProtocolChange = ({ target: { value } }: RadioChangeEvent) => {
    setProtocol(value);
  };
  const { TextArea } = Input;
  return (
    <>
      <Col span={12} style={{ padding: '0px' }}>
        <Card title="Birth History / जन्म इतिहास" className="mt-10" size="small">
          <Form.Item name="birth_history" >
            <TextArea rows={1} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={12} style={{ padding: '0px' }}>
        <Card
          title="Immunization History (As Per National Immunization History) / खोप इतिहास"
          className="mt-10"
          size="small"
        >
          <Form.Item name="immunization_history">
            <Radio.Group
              options={[
                { label: 'Yes / हो', value: '1' },
                { label: 'No / होइन', value: '0' }
              ]}
              onChange={onProtocolChange}
              value={protocol}
              optionType="button"
            />
          </Form.Item>
        </Card>
      </Col>
      <Col span={12} style={{ padding: '0px' }}>
        <Card title="Nutrition History / पोषण इतिहास" className="mt-10" size="small">
          <Form.Item name="nutrition_history" >
            <TextArea rows={1} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={12} style={{ padding: '0px' }}>
        <Card title="Development History / विकास इतिहास" className="mt-10" size="small">
          <Form.Item name="development_history">
            <TextArea rows={1} />
          </Form.Item>
        </Card>
      </Col>
    </>
  );
};

export default ChildForm;
