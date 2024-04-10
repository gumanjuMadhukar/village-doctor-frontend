import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, message, Modal, Radio, Row, Upload } from 'antd';
import { createNewDoctor } from 'apis/admin/doctor';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';
import { Gender } from 'utils/enums';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

const StyleButton = styled(Button)`
  min-width: 450px;
  border-color: ${Colors.PRIMARY};
  color: ${Colors.PRIMARY};
  @media (max-width: 530px) {
    min-width: calc(100vw - 25vw);
  }
`;

const AddDoctorModal = ({ isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [_imageData, setImageData] = useState<string>();
  const [_previewVisible, setPreviewVisible] = useState(false);
  const [image, setImage] = useState<any>();

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      setImageData(URL.createObjectURL(info.file.originFileObj));
      setImage(info.file.originFileObj);
      setPreviewVisible(true);
    }
  };

  const createDoctorMutation = useMutation(createNewDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['allDoctorList']);
      handleCancel();
      form.resetFields();
      message.success('User have been created successfully');
    },
    onError: (errData: any) => {
      const errorMessage = errData?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (data: any) => {
    const newData = {
      ...data,
      hiring_date: data?.hiring_date?.format('YYYY-MM-DD'),
      image
    };
    createDoctorMutation.mutate(newData);
  };
  return (
    <Modal
      title="Add Doctor"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="50vw"
      className="modal-content-responsive"
    >
      <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical" form={form}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={7} xs={24} md={7}>
            <Form.Item
              label="Salutation"
              name="salutation"
              rules={[{ required: true, message: 'Please enter Salutation!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: 'Please enter first name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24} md={8}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: 'Please enter Last name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Specialization"
              name="Specialization"
              rules={[{ required: true, message: 'Please enter Specialization!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Date of Hiring"
              name="hiring_date"
              rules={[
                {
                  required: true,
                  message: 'Please select hiring date!'
                }
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please choose gender!' }]}>
              <Radio.Group>
                <Radio value={Gender.MALE}>Male</Radio>
                <Radio value={Gender.FEMALE}>Female</Radio>
                <Radio value={Gender.OTHER}>Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="NMC Number"
              name="nmc_number"
              rules={[{ required: true, message: 'Please enter NMC Number!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Contact Number" name="contact_number">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Emergency Contact Number" name="emergency_contact_number">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Signature" name="image" >
              <Upload onChange={handleChange} accept="image/jpg, image/jpeg, image/png" action="/api/noop">
                <StyleButton size="large" className="button-image-upload" icon={<UploadOutlined />}>
                  Upload
                </StyleButton>
              </Upload>
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

export default AddDoctorModal;
