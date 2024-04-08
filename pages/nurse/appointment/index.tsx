import { DownOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  MenuProps,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TimePicker
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllAppointment, getUniqueUserAppointment, updateBulkAppointment } from 'apis/admin/appointment';
import { getDoctorList } from 'apis/admin/doctor';
import PageHeader from 'components/layout/page-header';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { CustomizedButtonGroup } from 'styles/profileInformation';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import Colors from 'utils/colors';
import { getCurrentYear } from 'utils/DateFormat';
import { disabledPastTime } from 'utils/dateTime';

const HeaderItems = [
  {
    name: 'Appointment',
    link: ''
  }
];

const SearchBarContentRedisgn = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  gap: 10px;
  padding: 16px;
`;

const SelectDateRange = styled.div`
  grid-area: 1 / 3 / auto / span 2;
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

interface FilterParams {
  currentPage: number;
  pageSize: number;
  created_by?: number;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

const appointmentListColumns: ColumnsType<any> = [
  {
    title: 'Patient Name',
    dataIndex: 'name'
  },
  {
    title: 'Appointment Date',
    dataIndex: 'appointment_date'
  },
  {
    title: 'Appointment Time',
    dataIndex: 'appointment_time'
  },
  {
    title: 'Created By',
    dataIndex: 'created_by'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: text => {
      const priorityStyle = {
        background: text === 'urgent' ? 'red' : 'green',
        color: 'white',
        padding: '2px 5px',
        borderRadius: '5px'
      };
      return <span style={priorityStyle}>{text}</span>;
    }
  },
  {
    title: 'Contact Number',
    dataIndex: 'contact_number'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      return (
        <div className="semi-bold" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          <Link href={`/nurse/appointment/${record?.medical_record?.id}`}>
            <EyeOutlined />
          </Link>
        </div>
      );
    },
    width: 60
  }
];

const DropDownStyle = styled.div`
  margin: 10px 0px;
`;

const Appointment = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [_dateRange, setDateRange] = useState<boolean>(false);
  const [createdBy, setCreatedBy] = useState<number>();
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const openCloseModal = () => {
    setScheduleModalOpen(!scheduleModalOpen);
  };

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    created_by: undefined,
    start_date: '',
    end_date: ''
  });

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setYear(null);
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      setDateRange(true);
      setDateRangeValue(dates);
    }
  };

  const currentYear = dayjs().year();

  const handleSearch = () => {
    setFilterParams(prevState => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      start_date: startDate,
      end_date: endDate,
      created_by: createdBy
    }));
  };

  const handleReset = () => {
    setFilterParams(prev => ({
      ...prev,
      currentPage: INITIAL_CURRENT_PAGE,
      year: getCurrentYear(),
      created_by: undefined,
      start_date: null,
      end_date: null
    }));
    setYear(null);
    setCreatedBy(undefined);
    setStartDate(null);
    setEndDate(null);
    setDateRange(false);
    setDateRangeValue([]);
  };

  const updateAppointment = useMutation(updateBulkAppointment, {
    onSuccess() {
      openCloseModal();
      form.resetFields();
      // queryClient.invalidateQueries(['allAppointmentList', 'appointmentUniqueUserList', 'appointmentDoctorList']);
      queryClient.invalidateQueries(['allAppointmentList', { filterParams }]);
      message.success('Appointment is successfully scheduled');
    },
    onError(errData: any) {
      const errorMessage = errData?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const { data: appointmentList } = useQuery(['allAppointmentList', { filterParams }], getAllAppointment);
  const { data: appointmentUniqueUserList } = useQuery(['appointmentUniqueUserList'], getUniqueUserAppointment, {staleTime:10000});
  const { data: doctorList } = useQuery(['appointmentDoctorList'], getDoctorList);

  const doctorOption = doctorList?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id
    };
  });

  const appointmentOption = appointmentUniqueUserList?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id
    };
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [_selectedRowValue, setSelectedRowValue] = useState<any[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowValue(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const appointmentData = appointmentList?.data?.map((data: any, _index: number) => {
    return {
      key: data.id,
      name: `${data?.patient?.first_name} ${data?.patient?.last_name}`,
      appointment_date: data?.appointment_date,
      appointment_time: data?.appointment_time,
      created_by: data?.user?.username,
      status: data?.status,
      contact_number: data?.patient?.contact_number,
      medical_record:data?.medicalRecord
    };
  });

  const bulkItems: MenuProps['items'] = [
    {
      key: 'Schedule',
      label: `Schedule`,
      onClick: () => {
        openCloseModal();
      }
    }
  ];

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = (data: any) => {
    const formData = {
      appointment_time: data?.time?.format('HH:mm'),
      doctor_id: data?.doctor,
      appointment_ids: selectedRowKeys
    };
    updateAppointment.mutate(formData);
  };

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader items={HeaderItems} titleContent="Appointment List" />
      </PageHeaderWrapper>
      <SearchBar>
        <Form>
          <SearchBarContentRedisgn>
            <Select
              options={appointmentOption}
              onChange={value => setCreatedBy(value)}
              disabled={dateRangeValue.length > 0}
              placeholder="Select User"
            />

            <DatePicker
              picker="year"
              value={year || dayjs(`${currentYear}-01-01`)}
              onChange={dateStrings => setYear(dateStrings)}
              disabled={dateRangeValue.length > 0}
            />
            <SelectDateRange>
              <RangePicker
                allowClear
                autoComplete="false"
                presets={rangePresets}
                onChange={onRangeChange}
                value={dateRangeValue}
                style={{ width: '100%' }}
              />
            </SelectDateRange>

            <Button type="primary" style={{ boxShadow: 'none' }} onClick={handleSearch}>
              Search
            </Button>
            <Button danger onClick={handleReset}>
              Reset
            </Button>
          </SearchBarContentRedisgn>
        </Form>
      </SearchBar>

      <TableBodyContainer style={{ minHeight: '100vh' }}>
        <DropDownStyle>
          <Dropdown menu={{ items: bulkItems }}>
            <Button>
              <Space>
                Bulk Action
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </DropDownStyle>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col span={24}>
            <Table
              className="appointmentTable"
              columns={appointmentListColumns}
              rowSelection={rowSelection}
              dataSource={appointmentData}
              scroll={{ x: 1000 }}
              rowClassName={record => (record.key === rowSelection.selectedRowKeys[0] ? 'selected-row' : '')}
              pagination={{
                ...filterParams,
                defaultPageSize: filterParams.pageSize,
                total: appointmentList?.meta?.total,
                hideOnSinglePage: true,
                showSizeChanger: true,
                current: +filterParams.currentPage,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page, pageSize) => {
                  setFilterParams({
                    ...filterParams,
                    currentPage: page,
                    pageSize
                  });
                }
              }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
      <Modal
        title="Schedule"
        open={scheduleModalOpen}
        footer={null}
        width="50vw"
        className="modal-content-responsive"
        onCancel={openCloseModal}
      >
        <Form name="basic" autoComplete="off" layout="vertical" onFinish={onFinish} form={form}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Col lg={12} xs={12} md={12}>
              <Form.Item label="Doctor" name="doctor" rules={[{ required: true, message: 'Please enter Doctor!' }]}>
                <Select options={doctorOption} placeholder="Select Doctor" showSearch filterOption={filterOption} />
              </Form.Item>
            </Col>

            <Col lg={11} xs={12} md={11}>
              <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select the time!' }]}>
                <TimePicker
                  style={{ width: '100%' }}
                  disabledHours={disabledPastTime().disabledHours}
                  disabledMinutes={disabledPastTime().disabledMinutes}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <CustomizedButtonGroup>
                <Button size="large" onClick={openCloseModal}>
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
    </div>
  );
};

export default Appointment;
