import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import { addAllergies } from 'apis/admin/allergies';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  patientId?: any;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

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

const FieldItemWrapper = styled.div``;

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

const AddAllergieModal = ({ isModalOpen, handleCancel, patientId }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const createAllergiesMutation = useMutation(addAllergies, {
    onSuccess: () => {
      form.resetFields();
      handleCancel();
      queryClient.invalidateQueries('allergiesData');
      message.success('Allergies has been added successfully');
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    const formData = {
      patient_id: patientId,
      ...data
    };
    createAllergiesMutation.mutate(formData);
  };
  return (
    <Modal title="Add Allergies" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form form={form} preserve={false} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row>
          <Col md={24}>
            <Form.List name="allergies" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, i) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <FieldItemWrapper style={{ position: 'relative' }} key={i}>
                        <FormSpace key={field.key} align="baseline" className={`space${i}`}>
                          <Row style={{ display: 'flex', justifyContent: 'space-between' }} gutter={24}>
                            <Col md={i === 0 ? 11 : 10}>
                              <Form.Item
                                label={i === 0 && 'Allergies Name'}
                                name={[field.name, 'allergen_name']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Allergies Name'
                                  }
                                ]}
                                hasFeedback
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col md={i === 0 ? 13 : 12}>
                              <Form.Item
                                label={i === 0 && 'Reaction'}
                                name={[field.name, 'reaction']}
                                rules={[
                                  {
                                    required: true,
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
          </Col>
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

export default AddAllergieModal;
