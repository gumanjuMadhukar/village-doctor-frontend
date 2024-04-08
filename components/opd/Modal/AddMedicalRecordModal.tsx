import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';

const { TextArea } = Input;
interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

const AddMedicalRecordModal = ({ isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Add Past Medical History" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form form={form} preserve={false} layout="vertical" autoComplete="off">
        <Row>
          <Col span={24}>
            <Form.Item label="Complaint" name="complaint">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Investigation" name="investigation">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Treatment" name="treatment">
              <TextArea rows={4} />
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
                Add
              </Button>
            </CustomizedButtonGroup>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddMedicalRecordModal;
