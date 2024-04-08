import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { getAllPatient } from 'apis/admin/patient';
import PageHeader from 'components/layout/page-header';
import CustomTable from 'components/shared/CustomTable';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AdminOPDListColumns } from 'shared/patient-table-column';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import { getCurrentMonth, getCurrentYear } from 'utils/DateFormat';

const HeaderItems = [
  {
    name: 'Patient List',
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

// const patientListColumns: ColumnsType<any> = [
//   {
//     title: 'Name',
//     key: 'first_name',
//     render: (_, record) => {
//       return (
//         <div className="semi-bold">
//           {record.first_name} {record.last_name}
//         </div>
//       );
//     }
//   },
//   {
//     title: 'Date of Birth',
//     dataIndex: 'date_of_birth',
//     key: 'date_of_birth',
//     render: text => <div>{text}</div>,
//     align: 'center'
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     key: 'gender',
//     render: text => <div className="center">{text}</div>,
//     align: 'center'
//   },
//   {
//     title: 'Age',
//     key: 'age',
//     render: (_, record) => {
//       const age = calculateAge(record.date_of_birth);
//       return <div className="center">{age}</div>;
//     },
//     align: 'center'
//   },
//   {
//     title: 'Medical Record Count',
//     dataIndex: 'medical_records',
//     key: 'medical_records',
//     render: text => <div className="center">{text.toString()}</div>,
//     align: 'center'
//   },
//   {
//     title: 'Vital Taken till',
//     dataIndex: 'vitals',
//     key: 'vitals',
//     render: text => {
//       return <div className="center">{text}</div>;
//     },
//     align: 'center'
//   },
//   {
//     title: 'Latest Visit Date',
//     key: 'latest',
//     render: (_text, record) => {
//       return <div className="center">{record?.latest_visit?.record_date || '-'}</div>;
//     },
//     align: 'center'
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: record => (
//       <div style={{ alignItems: 'center' }}>
//         <a href={`/nurse/patient/${record?.id}`} rel="noreferrer">
//           <EyeOutlined size={30} />
//         </a>
//         <a
//           href={`/nurse/${record?.id}`}
//           target="_blank"
//           rel="noreferrer"
//           style={{ paddingLeft: '10px', color: 'black' }}
//         >
//           <PrinterOutlined size={30} />
//         </a>
//       </div>
//     ),
//     responsive: ['sm', 'md', 'lg'],
//     align: 'center'
//   }
// ];

const Patients = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;

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

  const { data: patientList } = useQuery(['allPatientList', { filterParams }], getAllPatient);
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader items={HeaderItems} titleContent="Patient List" />
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
              columnList={AdminOPDListColumns}
              data={patientList?.data}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              total={patientList?.meta?.total}
              className="patientTable"
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
    </div>
  );
};

export default Patients;
