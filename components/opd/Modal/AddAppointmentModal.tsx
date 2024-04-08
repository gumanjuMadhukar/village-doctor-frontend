import { Button, Col, DatePicker, Form, message, Modal, Radio, Row, Select, TimePicker } from 'antd';
import { createNewAppointment } from 'apis/admin/appointment';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';
import { disabledPastTime } from 'utils/dateTime';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  data?: any;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

const AddAppointmentModal = ({ isModalOpen, handleCancel, data }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const createAppointmentMutation = useMutation(createNewAppointment, {
    onSuccess: () => {
      handleCancel();
      form.resetFields();
      router.push('/admin/opd');
      message.success('Appointment is successfully created wait a while to approve');
    },
    onError: (errData: any) => {
      const errorMessage = errData?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const onFinish = (formData: any) => {
    const newData = {
      ...formData,
      appointment_time: formData?.time?.format('HH:mm'),
      medical_record_id: data?.id,
      patient_id: data?.patient_id,
      appointment_date: dayjs().format('YYYY-MM-DD')
    };
    createAppointmentMutation.mutate(newData);
  };
  const renderDoctor = () => {
    return [
      <Select.Option key="create-new" value="add-patient">
        Create New
      </Select.Option>
    ];
  };
  return (
    <Modal
      title="Book an Appointment"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="40vw"
      className="modal-content-responsive"
    >
      <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical" form={form}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select the date!' }]}>
              <DatePicker/>
            </Form.Item>
          </Col>
          <Col lg={11} md={11}>
            <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select the time!' }]}>
              <TimePicker
                style={{ width: '100%' }}
                disabledHours={disabledPastTime().disabledHours}
                disabledMinutes={disabledPastTime().disabledMinutes}
              />
            </Form.Item>
          </Col>

          <Col lg={11} xs={24} md={11}>
            <Form.Item label="Is Urgent" name="urgent" rules={[{ required: true, message: 'Please choose urgency!' }]}>
              <Radio.Group>
                <Radio value={true}>Urgent</Radio>
                <Radio value={false}>Normal</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={11} xs={24} md={11}>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              {renderDoctor()}
            </Select>
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

export default AddAppointmentModal;
