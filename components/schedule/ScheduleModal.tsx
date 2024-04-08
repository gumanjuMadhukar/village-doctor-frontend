import { Button, Col, DatePicker, Form, message, Modal, Row, Select, TimePicker } from 'antd';
import { getAllDoctor } from 'apis/admin/doctor';
import { editDoctorSchedule, getDoctorScheduleById } from 'apis/admin/schedule';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import type { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import Colors from 'utils/colors';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  scheduleId: string | null;
  title: string | null;
}
interface FilterParams {
  currentPage: number;
  pageSize: number;
  search?: string;
}
interface SelectedOption {
  label: string;
  value: string;
}
const ScheduleModal = ({ isModalOpen, handleCancel, scheduleId }: Props) => {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);
  const [checkInValue, setCheckInValue] = useState<Dayjs | null>(null);
  const [checkOutValue, setCheckOutValue] = useState<Dayjs | null>(null);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    search: ''
  });
  const { data: doctorList } = useQuery(['alldoctorList', { filterParams }], getAllDoctor);
  const doctorsList = doctorList?.data;

  const editScheduleMutation = useMutation(
    async (updatedData: any) => {
      if (scheduleId) {
        return await editDoctorSchedule(scheduleId, updatedData);
      }
      throw new Error('Schedule ID not available');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['allScheduleList']);
        handleCancel();
        form.resetFields();
        message.success('Schedule updated successfully');
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || 'An error occurred';
        message.error(errorMessage);
      }
    }
  );

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        if (scheduleId && isModalOpen) {
          const response = await getDoctorScheduleById({ queryKey: [scheduleId] });
          const scheduleDetails = response.data;
          form.setFieldsValue({
            doctor_id: scheduleDetails.doctor_id,
            date: scheduleDetails.date,
            day_of_week: scheduleDetails.day_of_week,
            work_from: scheduleDetails.work_from,
            work_to: scheduleDetails.work_to
          });

          // Set the selected option based on fetched doctor_id
          const selectedDoctor = doctorsList.find((doctor: any) => doctor.nmc_number === scheduleDetails.doctor_id);
          setSelectedOption(selectedDoctor);
        }
      } catch (error) {
        console.error('Error fetching schedule details:', error);
      }
    };

    fetchScheduleDetails();
  }, [scheduleId, isModalOpen, form, doctorsList]);

  const onFinish = (data: any) => {
    const formData = {
      doctor_id: selectedOption?.value,
      ...data
    };
    editScheduleMutation.mutate(formData);
  };

  // days-selection
  const onDayChange = (value: any) => {
    if (value === 'null') {
      setSelectedOption(null);
    }
    setSelectedOption(value);
  };
  const onCheckInChange = (time: Dayjs) => {
    setCheckInValue(time);
  };
  const onCheckOutChange = (time: Dayjs) => {
    setCheckOutValue(time);
  };
  const onSearch = () => {
    setFilterParams(filterParams);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title="Add Schedule"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="modal-content-responsive"
    >
      <Form name="basic schedule-form" onFinish={onFinish} autoComplete="off" form={form}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col lg={24} xs={24} md={24}>
            <Form.Item
              label="Full Name"
              name="doctor_id"
              rules={[{ required: true, message: 'Please Select Doctor name!' }]}
            >
              <Select
                showSearch
                placeholder="Select Day"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  { value: '1', label: 'Dr.Sunday' },
                  { value: '2', label: 'Monday' },
                  { value: '3', label: 'Tuesday' },
                  { value: '4', label: 'Wednesday' },
                  { value: '5', label: 'Thursday' },
                  { value: '6', label: 'Friday' },
                  { value: '7', label: 'Saturday' },
                  { value: '8', label: 'Select Option' }
                ]}
              />
              {/* <Select
             showSearch
             placeholder="Search to Select"
             value={selectedOption == null ? undefined : selectedOption}
             onChange={handleSelectDoctor}
           >
             {renderOptions()}
           </Select> */}
            </Form.Item>
          </Col>
          {/* <Col lg={24} xs={24} md={24}>
            <Form.Item label="Shift" name="shift">
              <Select
                showSearch
                placeholder="Select Day"
                optionFilterProp="children"
                onChange={onDayChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  { value: 'day', label: 'Day' },
                  { value: 'morning', label: 'Morning' },
                  { value: 'night', label: 'Night' }
                ]}
              />
            </Form.Item>
          </Col> */}
          <Col lg={12} xs={12} md={24}>
            <Form.Item label="Date" name="date">
              <DatePicker/>
            </Form.Item>
          </Col>
          <Col lg={12} xs={12} md={24}>
            <Form.Item label="Day Of Week" name="day_of_week">
              <Select
                showSearch
                placeholder="Select Day"
                optionFilterProp="children"
                onChange={onDayChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  { value: 'sunday', label: 'Sunday' },
                  { value: 'monday', label: 'Monday' },
                  { value: 'tuesday', label: 'Tuesday' },
                  { value: 'wednesday', label: 'Wednesday' },
                  { value: 'thursday', label: 'Thursday' },
                  { value: 'friday', label: 'Friday' },
                  { value: 'saturday', label: 'Saturday' },
                  { value: '', label: 'Select Option' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} md={11}>
            <Form.Item label="Work From" name="work_from">
              <TimePicker value={checkInValue} onChange={() => onCheckInChange} />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} md={11}>
            <Form.Item label="Work To" name="work_to">
              <TimePicker value={checkOutValue} onChange={() => onCheckOutChange} />
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

export default ScheduleModal;
