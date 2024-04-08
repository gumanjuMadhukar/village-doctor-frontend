import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';

const FormItemAdd = styled(Button)`
  font-size: 14px;
  color: ${Colors.LIGHT_BLUE};
  border: 0;
  padding-left: 0;
`;

const FormItemDelete = styled(Button)`
  border: 0;
  box-shadow: unset;
  padding-left: 5px;
  color: ${Colors.DANGER};
  &:hover {
    color: ${Colors.DANGER} !important;
  }
`;

const AddAllergiesForm = () => {
  return (
    <Row>
      <Col md={24}>
        <Form.List name="allergies" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div style={{ position: 'relative' }} key={i}>
                    <div key={field.key} className={`space${i}`}>
                      <Row  gutter={24}>
                        <Col md={12}>
                          <Form.Item
                            label={i === 0 && 'Allergies Name / एलर्जीको नाम'}
                            name={[field.name, 'allergen_name']}
                            rules={[
                              {
                                // required: true,
                                message: 'Missing Allergies Name'
                              }
                            ]}
                            hasFeedback
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col md={11}>
                          <Form.Item
                            label={i === 0 && 'Reaction / प्रतिक्रिया'}
                            name={[field.name, 'reaction']}
                            rules={[
                              {
                                // required: true,
                                message: 'Missing Allergies reaction'
                              }
                            ]}
                            hasFeedback
                          >
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
      </Col>
    </Row>
  );
};

export default AddAllergiesForm;
