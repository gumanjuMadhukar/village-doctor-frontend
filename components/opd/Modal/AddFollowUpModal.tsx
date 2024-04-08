import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, message,Modal, Radio, Row, Select } from 'antd';
import { addNurseFollow } from 'apis/admin/followup';
import { FollowUpConditionOption, Vitals, YesNoOption } from 'constants/schema';
import dayjs from 'dayjs';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

import { FieldItemWrapper, FormItemAdd, FormItemDelete, FormSpace } from './AddVitalModal';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  recordId?: any;
}

const FollowUpDesign = styled.div``;
const CustomizedButtonGroup = styled.div`
  margin-top: '10px';
`;

const AddFollowUpModal = ({ isModalOpen, handleCancel, recordId }: Props) => {
  const [form] = Form.useForm();
  const createFollowUpMutation = useMutation(addNurseFollow, {
    onSuccess: () => {
      message.success("Nurse Follow Up has been added:")
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  })
  const onSubmit = (data:any) => {
    console.log(data?.vitals, "vdata");
    let pulseValue = "";
      let tempValue = "";
      let bpValue = "";
      let saturation = "";
      let respiration = "";
    data.vitals.forEach((vital: any) => {
      // Extract name and measurement from each vital object
      const { name, measurement } = vital;
      if (name === "pulse") {
        pulseValue = measurement;
      } else if (name === "temperature") {
        tempValue = measurement;
      } else if (name === "blood_pressure") {
        bpValue = measurement;
      } else if (name === "saturation") {
        saturation = measurement;
      } else if (name === "respiration") {
        respiration = measurement;
      }
    });
    const formData = {
      conditions: data.conditions,
      medication: data.medication,
      reaction: data.reaction,
      add_on_symptoms: data.add_on_symptoms,
      followUp_vital: {
        pulse: pulseValue ? pulseValue : "-" ,
        temperature: tempValue ? tempValue : "-",
        respiration:respiration ? respiration :"-",
        saturation:saturation ? saturation : "-",
        blood_pressure: bpValue ? bpValue: "-",
        date_of_measurement: dayjs().format("YYYY-MM-DD"),
      }
    }
    console.log(formData);
    createFollowUpMutation.mutate(formData)
  }
  return (
    <FollowUpDesign>
      <Modal title="Follow Up Form" open={isModalOpen} onCancel={handleCancel} footer={null} width="60vw">
        <h2>{recordId}</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item name="conditions" label="Condition">
            <Select options={FollowUpConditionOption} />
          </Form.Item>
          <Form.Item name="medication" label="Medication (round the clock)">
            <Radio.Group options={YesNoOption} />
          </Form.Item>
          <Form.Item name="reaction" label="Reaction">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="add_on_symptoms" label="Add on Symptoms">
            <Input placeholder="" />
          </Form.Item>
          <Form.List name="vitals" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, i) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <FieldItemWrapper style={{ position: 'relative' }} key={i}>
                      <FormSpace key={field.key} align="baseline" className={`space${i}`}>
                        <Row>
                          <Col md={12} className="gutter-row">
                            <Form.Item
                              label={i === 0 && 'TPRB'}
                              name={[field.name, 'name']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Martial Status'
                                }
                              ]}
                              hasFeedback
                            >
                              <Select placeholder="Select Vitals" options={Vitals} />
                            </Form.Item>
                          </Col>
                          <Col
                            md={9}
                            style={{
                              marginLeft: '15px',
                              marginRight: '15px'
                            }}
                          >
                            <Form.Item
                              label={i === 0 && 'Measurement'}
                              name={[field.name, 'measurement']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing String Amount'
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
                      </FormSpace>
                    </FieldItemWrapper>
                  );
                })}

                <Form.Item>
                  <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                    Add
                  </FormItemAdd>
                </Form.Item>
              </>
            )}
          </Form.List>
          <CustomizedButtonGroup>
            <Button
              size="large"
              style={{
                backgroundColor: Colors.DANGER,
                color: '#fff',
                marginLeft: '10px'
              }}
              onClick={handleCancel}
            >
              Close Ticket
            </Button>

            <Button
              style={{
                backgroundColor: Colors.PRIMARY,
                color: '#fff',
                marginLeft: '10px'
              }}
              size="large"
              htmlType="submit"
            >
              Add to Queried
            </Button>
          </CustomizedButtonGroup>
        </Form>
      </Modal>
    </FollowUpDesign>
  );
};

export default AddFollowUpModal;
