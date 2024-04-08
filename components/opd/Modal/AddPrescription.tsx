import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space } from 'antd';
import { createNewMedication } from 'apis/admin/medication';
import { rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient, useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

const { TextArea } = Input;
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  patient_id: string;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;
const FieldItemWrapper = styled.div`
  .ant-space-item {
    > .ant-row {
      > .ant-col {
        padding-right: 20px;
        .ant-radio-group {
          width: 100%;
          label {
            width: 100%;
          }
        }
      }
      &:last-child() {
        padding-right: 0;
      }
    }
  }
`;
const FormSpace = styled(Space)`
  &.space0 {
    .ant-space-item {
      &:last-child {
        display: flex;
        align-items: center;
      }
    }
  }
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
const FormItemAdd = styled(Button)`
  font-size: 14px;
  color: ${Colors.LIGHT_BLUE};
  border: 0;
  padding-left: 0;
`;

const AddPrescriptionModal = ({ isModalOpen, handleCancel, patient_id }: Props) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const [_startDate, setStartDate] = useState<Date | null | string>();
  const [_endDate, setEndDate] = useState<Date | null | string>();
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      setDateRangeValue(dates);
    }
  };

  const queryClient = new QueryClient();
  const router = useRouter();
  const createMedicationMutation = useMutation(createNewMedication, {
    onSuccess: () => {
      form.resetFields();
      handleCancel();
      queryClient.invalidateQueries('vitalList');
      router.push(`/ward/opd/${patient_id}`);
      message.success('Medication has been added successfully');
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    const medication = data?.medication?.map((data: any) => {
      return {
        medication_name: data.medication_name,
        dosage: data.dosage,
        quantity: 1,
        timing: data.timing,
        form: data.form,
        from: dayjs(data.duration[0]).format('YYYY-MM-DD'),
        to: dayjs(data.duration[1]).format('YYYY-MM-DD'),
        notes: data.notes
      };
    });

    const newData = {
      medication: medication,
      medical_record_id: patient_id
    };

    createMedicationMutation.mutate(newData);
  };

  return (
    <Modal
      title="CREATE NEW MEDICATION"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      style={{ marginRight: '60px' }}
    >
      <Form form={form} preserve={false} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row style={{ justifyContent: 'space-between' }}>
          <Form.List name="medication" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, i) => {
                  return (
                    <FieldItemWrapper style={{ position: 'relative' }} key={i}>
                      <FormSpace key={field.key} align="baseline" className={`space${i}`}>
                        <Row>
                          <Col span={4}>
                            <Form.Item label={i === 0 && 'Medicine Name'} name={[field.name, 'medication_name']}>
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item label={i === 0 && 'Dose'} name={[field.name, 'dosage']}>
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Row
                              style={{
                                justifyContent: 'space-between',
                                justifyItems: 'flex-start'
                              }}
                            >
                              <Col span={12}>
                                <Form.Item label={i === 0 && 'Times Per Day'} name={[field.name, 'quantity']}>
                                  <Select
                                    defaultValue="1"
                                    style={{ width: 100 }}
                                    allowClear
                                    options={[
                                      { value: '1', label: 'One' },
                                      { value: '2', label: 'Two' },
                                      { value: '3', label: 'Three' },
                                      { value: '4', label: 'Four' },
                                      { value: '5', label: 'Five' },
                                      { value: '6', label: 'Six' },
                                      { value: '7', label: 'Seven' },
                                      { value: '8', label: 'Eight' },
                                      { value: '9', label: 'Nine' },
                                      { value: '10', label: 'Ten' }
                                    ]}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label={i === 0 && 'Timing'} name={[field.name, 'timing']}>
                                  <Select
                                    defaultValue=""
                                    style={{ width: 100 }}
                                    allowClear
                                    options={[
                                      { value: 'before_meal', label: 'Before Meal' },
                                      { value: 'after_meal', label: 'After Meal' }
                                    ]}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={3}>
                            <Form.Item label={i === 0 && 'Medicine Type'} name={[field.name, 'form']}>
                              <Select
                                defaultValue=""
                                style={{ width: 100 }}
                                allowClear
                                options={[
                                  { value: 'LIQUID', label: 'Liquid' },
                                  { value: 'CAPSULE', label: 'Capsule' },
                                  { value: 'TABLET', label: 'Tablet' }
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item label={i === 0 && 'Duration'} name={[field.name, 'duration']}>
                              <RangePicker
                                allowClear
                                autoComplete="false"
                                presets={rangePresets}
                                onChange={onRangeChange}
                                value={dateRangeValue}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item label={i === 0 && 'Notes'} name={[field.name, 'notes']}>
                              <TextArea rows={1} />
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
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col xs={24}>
            <CustomizedButtonGroup>
              <Button size="large" onClick={handleCancel}>
                Cancel
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
                Add
              </Button>
            </CustomizedButtonGroup>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPrescriptionModal;
