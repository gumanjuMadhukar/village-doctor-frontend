import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

const PastHistoryForm = (props: any) => {
  const { TextArea } = Input;
  const { isPsychiatryPatient } = props;
  return (
    <Card title="Past History / विगतको इतिहास" className="mt-10" size="small">
      <Row>
        <Col span={12}>
          <Card title="Medical History / चिकित्सकिय इतिहास" className="mt-10" size="small">
            <Form.Item name="medical_history">
              <TextArea rows={1} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Surgical History / सर्जिकल इतिहास " className="mt-10" size="small">
            <Form.Item name="surgical_history">
              <TextArea rows={1} />
            </Form.Item>
          </Card>
        </Col>
        {isPsychiatryPatient && (
          <>
            <Col span={12}>
              <Card title="Psychiatry History /  इतिहास" className="mt-10" size="small">
                <Form.Item name="psychiatry_history">
                  <TextArea rows={1} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Substance Abuse History /  इतिहास" className="mt-10" size="small">
                <Form.Item name="substance_abuse_history">
                  <TextArea rows={1} />
                </Form.Item>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default PastHistoryForm;
