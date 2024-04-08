import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Row, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllDoctor } from 'apis/admin/doctor';
import PageHeader from 'components/layout/page-header';
import AddDoctorModal from 'components/opd/Modal/AddDoctorModal';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import Colors from 'utils/colors';
import { getCurrentMonth, getCurrentYear } from 'utils/DateFormat';

const HeaderItems = [
  {
    name: 'Doctor',
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

const doctorListColumns: ColumnsType<any> = [
  {
    title: 'Name',
    key: 'first_name',
    render: (_, record) => {
      return (
        <div className="semi-bold">
          {record.first_name} {record.last_name}
        </div>
      );
    }
  },
  {
    title: 'Hiring Date',
    dataIndex: 'hiring_date',
    key: 'hiring_date',
    render: text => <div>{text}</div>,
    align: 'center'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: text => <div className="center">{text}</div>,
    align: 'center'
  },
  {
    title: 'Contact Number',
    dataIndex: 'contact_number',
    key: 'contact_number',
    render: text => <div className="center">{text}</div>,
    align: 'center'
  },
  {
    title: 'Specialization',
    dataIndex: 'Specialization',
    key: 'Specialization',
    render: text => {
      return <Tag color={Colors.ALGAE_GREEN}>{text}</Tag>;
    },
    align: 'center'
  },
  {
    title: 'NMC Number',
    dataIndex: 'nmc_number',
    key: 'nmc_number',
    render: text => <div className="center">{text}</div>,
    align: 'center'
  }
];

const Doctor = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [createDoctorModalOpen, setCreateDoctorModalOpen] = useState(false);

  const openCloseModal = () => {
    setCreateDoctorModalOpen(!createDoctorModalOpen);
  };

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

  const { data: doctorList } = useQuery(['allDoctorList', { filterParams }], getAllDoctor);
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Doctor List"
          icon={<PlusOutlined />}
          buttonLabel="Add Doctor"
          buttonCb={openCloseModal}
        />
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
              className="doctorTable"
              columns={doctorListColumns}
              dataSource={doctorList?.data}
             
              pagination={{
                ...filterParams,
                defaultPageSize: filterParams.pageSize,
                total: doctorList?.meta?.total,
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
    </div>
  );
};

export default Doctor;
