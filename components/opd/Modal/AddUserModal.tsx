import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { createNewUser, getAllRoles } from 'apis/admin/user';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

const AddUserModal = ({ isModalOpen, handleCancel }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createDoctorMutation = useMutation(createNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['allUserList']);
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
      ...data
    };
    createDoctorMutation.mutate(newData);
  };
  const { data: roles } = useQuery(['allRolesList'], getAllRoles);

  const rolesOption = roles?.map((data: any) => {
    return {
      label: data?.display_name,
      value: data?.name
    };
  });

  const status = [
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'In Active',
      value: 'in-active'
    }
  ];

  return (
    <Modal
      title="Add User"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="50vw"
      className="modal-content-responsive"
    >
      <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical" form={form}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter username!' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email!' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please enter status!' }]}>
              <Select options={status} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please enter status!' }]}>
              <Select options={rolesOption} />
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Form.Item
              label="Teams Link"
              name="teams_link"
              rules={[{ required: true, message: 'Please enter team link' }]}
            >
              <Input />
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

export default AddUserModal;
