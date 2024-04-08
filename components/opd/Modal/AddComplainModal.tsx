import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { createNewComplaint } from 'apis/admin/complain';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  categoryOption: any;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

const AddComplainModal = ({ isModalOpen, handleCancel, categoryOption }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createComplainMutation = useMutation(createNewComplaint, {
    onSuccess: () => {
      queryClient.invalidateQueries(['complainCategory']);
      handleCancel();
      form.resetFields();
      message.success('Complain have been created successfully');
    },
    onError: (errData: any) => {
      const errorMessage = errData?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    createComplainMutation.mutate(data);
  };
  return (
    <Modal
      title="Add Complain"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="50vw"
      className="modal-content-responsive"
    >
      <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical" form={form}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Complain Name"
              name="name"
              rules={[{ required: true, message: 'Please enter Complain Name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true, message: 'Please enter Category !' }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Category"
                // defaultValue={['china']}

                optionLabelProp="label"
                options={categoryOption}
              />
            </Form.Item>
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
                Save
              </Button>
            </CustomizedButtonGroup>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddComplainModal;
