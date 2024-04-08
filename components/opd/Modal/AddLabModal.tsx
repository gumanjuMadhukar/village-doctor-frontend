import { MinusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import { addTest } from 'apis/admin/lab';
import dayjs from 'dayjs';
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
const AddLabModal = ({ isModalOpen, handleCancel, patientId }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const createLabTestsMutation = useMutation(addTest, {
    onSuccess: () => {
      form.resetFields();
      handleCancel();
      queryClient.invalidateQueries('addRequiredLab');
      message.success('Required lab tests has been added successfully');
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    const formData = {
      patient_id: patientId,
      date_of_measurement: dayjs().format('YYYY-MM-DD'),
      ...data
    };
    createLabTestsMutation.mutate(formData);
  };
  return (
    <Modal title="Add Required Lab Tests" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form form={form} preserve={false} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row>
          <Col md={24}>
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'last']}
                        rules={[{ required: true, message: 'Missing Lab Test Name' }]}
                      >
                        <Input placeholder="Test Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusCircleFilled />}>
                      Add field
                    </Button>
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

export default AddLabModal;
