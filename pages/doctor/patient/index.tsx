import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Row, Select, Table } from 'antd';
import { getAllPatient } from 'apis/admin/patient';
import PageHeader from 'components/layout/page-header';
import AddPatientModal from 'components/opd/Modal/AddPatientModal';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { MONTH_SELECT, rangePresets } from 'constants/schema';
import dayjs , {Dayjs} from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { WardOPDListColumns } from 'shared/patient-table-column';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBarContent, SelectDateRange } from 'styles/search';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import { getCurrentMonth, getCurrentYear } from 'utils/DateFormat';

const HeaderItems = [
  {
    name: 'Patient',
    link: ''
  }
];
// const SearchLayout = styled.div`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
// `;
// const FormGroup = styled.div`
//   width: 50%;
//   display: flex;
//   flex-wrap: wrap;
//   padding: 10px;
//   &:first-child {
//     .ant-form-item {
//       width: 33%;
//     }
//   }
//   &:nth-child(2) {
//     width: 35%;
//     flex-direction: column;
//   }
//   &:last-child {
//     width: 15%;
//   }
//   label {
//     width: 100%;
//     color: #0a0a0a;
//   }
//   select,
//   ant-picker {
//     width: 50%;
//   }
// `;

// const SearchBarContentRedisgn = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   @media (max-width: 768px) {
//     grid-template-columns: auto auto;
//   }
//   gap: 10px;
//   padding: 16px;
// `;

// const SelectDateRange = styled.div`
//   grid-area: 1 / 3 / auto / span 2;
//   @media (max-width: 768px) {
//     grid-column: span 2;
//   }
// `;

interface FilterParams {
  currentPage: number;
  pageSize: number;
  month?: number | string;
  year?: number | string;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

const Patients = () => {
  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const [createPatientModal, setCreatePatientModal] = useState(false);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    month,
    year: !dateRange ? getCurrentYear() : year,
    start_date: '',
    end_date: ''
  });

  const openCloseModal = () => {
    setCreatePatientModal(!createPatientModal);
  };
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

  const { data: patientList } = useQuery(['allPatientList', { filterParams }], getAllPatient);
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Patient List / बिरामीहरू"
          icon={<PlusOutlined />}
          buttonLabel="Add Patient / बिरामी थप्नुहोस्"
          buttonCb={openCloseModal}
        />
      </PageHeaderWrapper>
      <SearchBar>
        <Form>
          <SearchBarContent>
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
          </SearchBarContent>
        </Form>
      </SearchBar>
      <TableBodyContainer style={{ minHeight: '100vh' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col span={24}>
            <Table
              className="patientTable"
              columns={WardOPDListColumns}
              dataSource={patientList?.data}
              scroll={{ x: 1000 }}
              rowClassName={'row-class'}
              pagination={{
                ...filterParams,
                defaultPageSize: filterParams.pageSize,
                total: patientList?.meta?.total,
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
      <AddPatientModal handleCancel={openCloseModal} isModalOpen={createPatientModal} />
    </div>
  );
};

export default Patients;
