import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Card, Col, Form, Input, Row, Select } from 'antd';
import { FamilyHistoryOption, PsychiatryFamilyHistoryOption } from 'constants/schema';
import React from 'react';

import { FormItemAdd, FormItemDelete } from './Modal/AddVitalModal';

const FamilyHistoryForm = (FilterOption:any) => {
  const {isPsychiatryPatient} = FilterOption;
  return (
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
                            options={isPsychiatryPatient ? PsychiatryFamilyHistoryOption : FamilyHistoryOption}
                            optionFilterProp="children"
                            filterOption={FilterOption}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        span={ i>0 ? 10 :11}
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
  );
};

export default FamilyHistoryForm;
