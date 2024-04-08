import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Card, Col, Form, Input, Radio, Row, Select } from 'antd';
import { FormItemAdd, FormItemDelete } from 'components/opd/Modal/AddVitalModal';
import { FamilyHistoryOption } from 'constants/schema';
import React, { useState } from 'react';
const { TextArea } = Input;

const MedicalHistory = () => {
  const [protocol, _setProtocol] = useState<string>('');
  const onProtocolChange = () => {};
  return (
    <div>
      <Card title="Past History / विगतको इतिहास" className="mt-10" size="small">
        <Row>
          <Col span={12}>
            <Card title="Medical History / चिकित्सकिय इतिहास" className="mt-10" size="small">
              <Form.Item name="medical_history">
                <TextArea rows={2} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Surgical History / सर्जिकल इतिहास " className="mt-10" size="small">
              <Form.Item name="surgical_history">
                <TextArea rows={2} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ padding: '0px' }}>
            <Card title="Birth History / जन्म इतिहास" className="mt-10" size="small">
              <Form.Item name="birth_history" rules={[{ required: true, message: 'Please enter the field!' }]}>
                <TextArea rows={2} />
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
              <Form.Item name="nutrition_history">
                <TextArea rows={2} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12} style={{ padding: '0px' }}>  
            <Card title="Development History / विकास इतिहास" className="mt-10" size="small">
              <Form.Item name="development_history">
                <TextArea rows={2} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Family History / पारिवारिक इतिहास" className="mt-10" size="small">
        <Form.List name="family_history" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => {
                return (
                  <div style={{ position: 'relative' }} key={i}>
                    <div key={field.key} className={`space${i}`}>
                      <Row style={{ width: '100%' }}>
                        <Col span={12}>
                          <Form.Item label={i === 0 && 'Question'} name={[field.name, 'question']} hasFeedback>
                            <Select
                              showSearch
                              placeholder="Select Question"
                              options={FamilyHistoryOption}
                              optionFilterProp="children"
                              // filterOption={filterOption }
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          span={10}
                          style={{
                            marginLeft: '15px',
                            marginRight: '15px'
                          }}
                        >
                          <Form.Item label={i === 0 && 'Answer / जवाफ'} name={[field.name, 'answer']}>
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col md={1}>
                          {i !== 0 && (
                            <FormItemDelete
                              onClick={() => {
                                // removeAddition(i);
                                remove(field.name);
                              }}
                            >
                              <DeleteOutlined />
                            </FormItemDelete>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}

              <Form.Item>
                <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                  Add / थप्नुहोस्
                </FormItemAdd>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Other Relevant Family History" name="relavant_family_history">
          <Input></Input>
        </Form.Item>
      </Card>
      <Col span={24} className="mt-10 main-div">
        <Card title="Treatment History / उपचारको इतिहास" className="mt-10" size="small">
          <Form.Item name="treatment_history">
            <TextArea rows={2} />
          </Form.Item>
        </Card>
      </Col>
    </div>
  );
};

export default MedicalHistory;
