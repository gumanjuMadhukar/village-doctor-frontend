import { EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, DatePicker, Dropdown, Form, Menu, Row, Select, Table } from 'antd';
// import { getAllDoctor } from 'apis/admin/doctor';
import { getAllSchedule } from 'apis/admin/schedule';
import PageHeader from 'components/layout/page-header';
import ScheduleModal from 'components/schedule/ScheduleModal';
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
    name: '',
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

interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  filters?: never[]; // Use 'never[]' or define the appropriate type for filters
  onFilter?: (value: any, record: any) => boolean;
  sorter?: (a: any, b: any) => number;
  sortDirections?: ('ascend' | 'descend')[] | undefined; // Adjust sortDirections type
  render?: (value: any) => any;
  sortOrder?: 'ascend' | 'descend' | undefined; // Define sortOrder explicitly
  filterDropdown?: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => JSX.Element;
}

const Schedule = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  
  const defaultAvatar = 'https://via.placeholder.com/150';

  const openCloseAddModal = () => {
    setTitle('Add Schedule')
    setScheduleModalOpen(!scheduleModalOpen);
  };
  const openCloseEditModal = (id: string | null = null) => {
    setSelectedEditId(id);
    setTitle('Edit Schedule')
    setScheduleModalOpen(!scheduleModalOpen);
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
  // const { data: doctorList } = useQuery(['doctorList', { filterParams }], getAllDoctor);
  const { data: scheduleList } = useQuery(['scheduleList', { filterParams }], getAllSchedule);
  const columns: TableColumn[] = [
    {
      title: '',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
      render: (profilePicture: string | undefined) => <Avatar src={profilePicture || defaultAvatar} size="large" />
    },
    {
      title: 'Doctor Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Check-in',
      dataIndex: 'work_from',
      key: 'work_from'
    },
    {
      title: 'Check-out',
      dataIndex: 'work_to',
      key: 'work_to'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: record => <ActionDropdown record={record} />
    }
  ];
  interface DoctorSchedule {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    medical_records: any[];
    vitals: any[];
    latest_visit: {
      record_date: string;
    };
  }
  interface ActionDropdownProps {
    record: DoctorSchedule;
  }
  
  const ActionDropdown: React.FC<ActionDropdownProps> = (props: any) => {
   
    const menu = (
      <Menu>
        <Menu.Item key="view">
          <a href={`/admin/patients/${props?.id}`} rel="noreferrer">
            <EyeOutlined /> View
          </a>
        </Menu.Item>
        <Menu.Item key="edit">
          <a href="" onClick={()=> openCloseEditModal}>
            <EditOutlined /> Edit
          </a>
        </Menu.Item>
        <Menu.Item key="print">
          <a href={`/admin/${props?.id}`} target="_blank" rel="noreferrer">
            <PrinterOutlined /> Print
          </a>
        </Menu.Item>
      </Menu>
    );
  
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <MoreOutlined />
      </Dropdown>
    );
  };
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Schedule List"
          icon={<PlusOutlined />}
          buttonLabel="Add Schedule"
          buttonCb={openCloseAddModal}
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
            <Table dataSource={scheduleList?.data} columns={columns} />
          </Col>
        </Row>
      </TableBodyContainer>
      <ScheduleModal handleCancel={openCloseEditModal} isModalOpen={scheduleModalOpen} scheduleId={selectedEditId} title={title}/>
    </div>
  );
};

export default Schedule;

