import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllUser } from 'apis/admin/user';
import PageHeader from 'components/layout/page-header';
import AddUserModal from 'components/opd/Modal/AddUserModal';
import CustomTable from 'components/shared/CustomTable';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import { getCurrentMonth, getCurrentYear } from 'utils/DateFormat';

const HeaderItems = [
  {
    name: 'User List',
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

const patientListColumns: ColumnsType<any> = [
  {
    title: 'Name',
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Role',
    key: 'status',
    render(_value, record, _index) {
      return <div> {record?.role[0]?.name}</div>;
    }
  }
];

const User = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const openCloseModal = () => {
    setCreateUserModalOpen(!createUserModalOpen);
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

  const { data: userList } = useQuery(['allUserList', { filterParams }], getAllUser);

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="User List"
          icon={<PlusOutlined />}
          buttonLabel="Add User"
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
            <CustomTable
              columnList={patientListColumns}
              data={userList?.data}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              total={userList?.meta?.total}
              className="patientTable"
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
      <AddUserModal handleCancel={openCloseModal} isModalOpen={createUserModalOpen} />
    </div>
  );
};

export default User;
