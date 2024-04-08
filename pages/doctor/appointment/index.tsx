import { EyeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Modal, QRCode, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllAppointment } from 'apis/admin/appointment';
import PageHeader from 'components/layout/page-header';
import AddDoctorModal from 'components/opd/Modal/AddDoctorModal';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { AppointmentCommonColumns, MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import { getCurrentMonth, getCurrentYear } from 'utils/DateFormat';

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
  month?: number | string;
  year?: number | string;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

const Appointment = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [createDoctorModalOpen, setCreateDoctorModalOpen] = useState(false);
  const [viewQR, setViewQR] = useState(false);
  const [userQRUrl, setUserQRurl] = useState<string>('');

  const openCloseModal = () => {
    setCreateDoctorModalOpen(!createDoctorModalOpen);
  };
  const handleQRView = (record:any) => {
    setViewQR(true);
    setUserQRurl(record?.user?.teams_link);
  };
  const appointmentListColumns: ColumnsType<any> = [
    ...AppointmentCommonColumns,
    {
      title: 'Meeting Link',
      dataIndex: 'status',
      key: 'status',
      // render: text => <Tag color={Colors.ALGAE_GREEN}>{text}</Tag>
      render: (_text, record) => {
        return (
          <div onClick={()=>handleQRView(record)}>
            <QRCode value={record?.user?.teams_link} size={100} />
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <div className="semi-bold" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
            <Link href={`/doctor/appointment/${record?.medicalRecord?.id}`} title='View Details'>
              <EyeOutlined />
            </Link>
            <Link href={record?.user?.teams_link} type="primary" style={{ marginLeft: '10px' }} target="_blank" title='Join Meeting'>
            <UsergroupAddOutlined />
          </Link>
          </div>
        );
      },
      width: 60
    }
  ];
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    month,
    year: !dateRange ? getCurrentYear() : year,
    start_date: '',
    end_date: ''
  });

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setMonth('');
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
      // eslint-disable-next-line no-nested-ternary
      year: !dateRange ? (year ? dayjs(year).format('YYYY') : getCurrentYear()) : '',
      month: !dateRange ? month || getCurrentMonth() : ''
    }));
  };

  const handleReset = () => {
    setFilterParams(prev => ({
      ...prev,
      currentPage: INITIAL_CURRENT_PAGE,
      year: getCurrentYear(),
      month: getCurrentMonth(),
      start_date: null,
      end_date: null
    }));
    setYear(null);
    setMonth('');
    setStartDate(null);
    setEndDate(null);
    setDateRange(false);
    setDateRangeValue([]);
  };

  const { data: appointmentList } = useQuery(['allAppointmentList', { filterParams }], getAllAppointment);

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader items={HeaderItems} titleContent="Appointment List" />
      </PageHeaderWrapper>
      <SearchBar>
        <Form>
          <SearchBarContentRedisgn>
            <Select
              value={month || getCurrentMonth()}
              options={MONTH_SELECT}
              onChange={value => setMonth(value)}
              disabled={dateRangeValue.length > 0}
              placeholder="Select Month"
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
        <Row style={{ justifyContent: 'space-between' }}>
          <Col span={24}>
            <Table
              className="appointmentTable"
              columns={appointmentListColumns}
              // columns={AppointmentColumns}
              dataSource={appointmentList?.data}
              // dataSource={AppointmentData}
              scroll={{ x: 1000 }}
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
      <AddDoctorModal handleCancel={openCloseModal} isModalOpen={createDoctorModalOpen} />
      {viewQR && (
        <Modal title="" open={viewQR} onCancel={() => setViewQR (false)} footer={false}  style={{display:"flex" , justifyContent:"center", padding:"20px" }}>
          <QRCode value={userQRUrl} size={250} />
        </Modal>
      )}
    </div>
  );
};

export default Appointment;
