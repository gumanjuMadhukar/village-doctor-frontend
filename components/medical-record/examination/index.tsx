import { Alert, Button, Card, Checkbox, Col, Form, Radio, RadioChangeEvent, Row, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import BMICalculateForm from 'components/opd/BMICalculateForm';
import { GeneralAppearanceOption, PilccodOption } from 'constants/schema';
import React, { useState } from 'react';

interface CheckboxStyle {
  flexDirection?: 'row' | 'column';
}

const checkboxStyle: CheckboxStyle = {
  flexDirection: 'column'
};
const Examination = () => {
  const [GCSCheck, setGCSCheck] = useState(false);
  const [showGCS, setShowGCS] = useState(true);
  const [eyeOpenningValue, setEyeOpenningValue] = useState(0);
  const [verbalResponseValue, setVerbalResponseValue] = useState(0);
  const [motorResponseValue, setMotorResponseValue] = useState(0);
  const [GCSValue, setGCSValue] = useState(0);

  const onGCSChecked = () => {
    setGCSCheck(!GCSCheck);
    setShowGCS(true);
  };
  const onEyeOpeningChange = (e: RadioChangeEvent) => {
    setEyeOpenningValue(e.target.value);
  };

  const onVerbalResponseChange = (e: RadioChangeEvent) => {
    setVerbalResponseValue(e.target.value);
  };
  const onMotorResponseChange = (e: RadioChangeEvent) => {
    setMotorResponseValue(e.target.value);
  };

  const GCSCalculate = () => {
    const GCSValue = eyeOpenningValue + verbalResponseValue + motorResponseValue;
    setGCSValue(GCSValue);
    setShowGCS(false);
  };

  const onClose = () => {};
  return (
    <Card title="Examination / परीक्षण" className="mt-10" size="small">
      <Row>
        <Col span={24}>
          <Card title="General Appearance " className="mt-10" size="small">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={24} style={{ display: 'flex', alignItems: 'baseline' }}>
                <Form.Item name="general_appearance_type">
                  <Checkbox.Group options={GeneralAppearanceOption} />
                </Form.Item>
                <Checkbox onChange={onGCSChecked}>GCS</Checkbox>
              </Col>
            </Row>
          </Card>
          {GCSCheck && (
            <Row style={{ flexWrap: 'wrap' }}>
              {showGCS && (
                <>
                  <Col span={24}>
                    <Card title="GCS" size="small">
                      <Row>
                        <Col span={8}>
                          <Form.Item label="Eye Openning" name="eye_openning">
                            <Radio.Group onChange={onEyeOpeningChange} value={eyeOpenningValue}>
                              <Space direction="vertical">
                                <Radio value={4}>Spontaneous</Radio>
                                <Radio value={3}>To Sound</Radio>
                                <Radio value={2}>To Pressure</Radio>
                                <Radio value={1}>None</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Verbal Response" name="verbal_response">
                            <Radio.Group onChange={onVerbalResponseChange} value={verbalResponseValue}>
                              <Space direction="vertical">
                                <Radio value={5}>Oriented</Radio>
                                <Radio value={4}>Confused</Radio>
                                <Radio value={3}>Words</Radio>
                                <Radio value={2}>Sounds</Radio>
                                <Radio value={1}>None</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label="Motor Response" name="motor_response">
                            <Radio.Group onChange={onMotorResponseChange} value={motorResponseValue}>
                              <Space direction="vertical">
                                <Radio value={6}>Obey Commands</Radio>
                                <Radio value={5}>Localising Pain</Radio>
                                <Radio value={4}>Normal Flexion</Radio>
                                <Radio value={3}>Abnormal Flexion</Radio>
                                <Radio value={2}>Extension</Radio>
                                <Radio value={1}>None</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" onClick={() => GCSCalculate()}>
                      Calculate GCS
                    </Button>
                  </Col>
                </>
              )}
              <Col span={12}>
                <Alert message={` GCS : ${GCSValue.toLocaleString()}`} type="error" closable onClose={onClose} />
              </Col>
            </Row>
          )}
        </Col>
        <Col span={24}>
          <BMICalculateForm />
        </Col>
        <Col span={12}></Col>
        <Col span={12}>
          <Card title="PILCCOD" className="mt-10" size="small">
            <Form.Item name="pilccod">
              <Checkbox.Group
                options={PilccodOption}
                style={checkboxStyle}
                className="pilccod"
              />
            </Form.Item>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Head To Toe Examination / शिरदेखि पाउँ परीक्षण" className="mt-10" size="small">
            <Form.Item name="head_to_toe">
              <TextArea rows={1} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Systemic Examination / व्यवस्थित परीक्षा" className="mt-10" size="small">
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
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Examination;
