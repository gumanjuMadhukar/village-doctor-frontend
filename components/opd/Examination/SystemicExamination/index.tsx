import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

import SystemicNeuroForm from './SystemicNeuro';
import PsychiatryForm from './SystemicPsychiatryExaminationForm';
const SystemicExaminationForm = (patientType: any) => {
  const { TextArea } = Input;
  return (
    <Card title="Systemic Examination / व्यवस्थित परीक्षा" className="mt-10" size="small">
      {(!patientType || !Object.values(patientType).some(val => val)) && (
        <Row>
          <Col span={12}>
            <Card title="Inspection / निरीक्षण" size="small">
              <Form.Item name="inspection">
                <TextArea rows={1} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Palpation / पल्पेशन" size="small">
              <Form.Item name="palpation">
                <TextArea rows={1} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Percussion / पर्कशन" size="small">
              <Form.Item name="percussion">
                <TextArea rows={1} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Auscultation / अस्कल्टेशन" size="small">
              <Form.Item name="auscultation">
                <TextArea rows={1} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      )}
      {patientType?.isNeuroPatient && <SystemicNeuroForm />}
      {patientType?.Cardio && <Card title="Cardio"></Card>}
      {patientType?.isPsychiatryPatient && <PsychiatryForm />}
    </Card>
  );
};

export default SystemicExaminationForm;
