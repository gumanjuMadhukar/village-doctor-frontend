import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Card, Col, Form, Input, Row, Select } from 'antd';
import { getSelectComplain } from 'apis/admin/complain';
import React from 'react';
import { useQuery } from 'react-query';

import { FormItemAdd, FormItemDelete } from './Modal/AddVitalModal';

const ChiefComplaintForm = (filterOption:any) => {
  const { data: complainList } = useQuery(['complainList'], getSelectComplain);

  const complainOption = complainList?.data?.map((complain: any) => {
    return {
      label: complain.name,
      value: complain.id
    };
  });
  return (
    <Card title="Chief Complaint / प्रमुख गुनासो" className="mt-10" size="small">
      <Form.List name="chief_complaint" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, i) => {
              return (
                <div style={{ position: 'relative' }} key={i}>
                  <div key={field.key} className={`space${i}`}>
                    <Row style={{ width: '100%' }}>
                      <Col md={12}>
                        <Form.Item
                          label={i === 0 && 'Complaint / गुनासो'}
                          name={[field.name, 'complaint_id']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Complain Status'
                            }
                          ]}
                          hasFeedback
                        >
                          <Select
                            showSearch
                            placeholder="Select Complaint / गुनासो चयन गर्नुहोस् "
                            options={complainOption}
                            optionFilterProp="children"
                            filterOption={filterOption}
                            // defaultValue={isFollowUp ? }
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        md={i<1 ? 11 : 10}
                        style={{
                          marginLeft: '15px',
                          marginRight: '15px'
                        }}
                      >
                        <Form.Item
                          label={i === 0 && 'Duration / अवधि'}
                          name={[field.name, 'duration']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Duration status'
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
    </Card>
  );
};

export default ChiefComplaintForm;
