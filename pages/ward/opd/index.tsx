import {
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { getSelectComplain } from "apis/admin/complain";
import { getAllMedicalRecord } from "apis/admin/medical-record";
import PageHeader from "components/layout/page-header";
import LabUploadModal from "components/opd/Modal/LabUploadModal";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import { MONTH_SELECT, rangePresets } from "constants/schema";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PatientListColumns } from "shared/patient-table-column";
import styled from "styled-components";
import { PageHeaderWrapper } from "styles/authCSS";
import { SearchBarContentRedesign } from "styles/search";
import { TableBodyContainer } from "styles/styled/PageHeader";
import { getCurrentMonth, getCurrentMonthString,getCurrentYear } from "utils/DateFormat";

const HeaderItems = [
  {
    name: "OPD",
    link: "",
  },
];

const SelectDateRange = styled.div`
  grid-area: 1 / 3 / auto / span 2;
  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

interface FilterParams {
  currentPage: number;
  pageSize: number;
  patient_name?: string;
  complaint_id?: number | string | null;
  address?: string;
  age?: number | string;
  medical_record_date?: string | Date | null;
  month?: number | string;
  year?: number | string;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

const Opd = () => {
  const currentYear = dayjs().year();

  const [startDate, setStartDate] = useState<Date | null | string>();
  const [endDate, setEndDate] = useState<Date | null | string>();
  const [dateRange, setDateRange] = useState<boolean>(false);
  const [month, setMonth] = useState<any>(getCurrentMonthString());
  const [patientName, setPatientName] = useState<any>(getCurrentMonth());
  const [year, setYear] = useState<any>(null);
  const [dateRangeValue, setDateRangeValue] = useState<any>([]);
  const { RangePicker } = DatePicker;
  const { Panel } = Collapse;
  const [openLabUploadModal, setOpenLabUploadModal] = useState(false);
  const [medicaRecordId, setMedicalRecordId] = useState(0);

  const onLabUploadButtonClick = (record: any) => {
    console.log(record, "onLabUpload");
    setOpenLabUploadModal(true);
    setMedicalRecordId(record?.id);
    // setPatientId()
  };
  const patientListColumns: ColumnsType<any> = [
    ...PatientListColumns,
    {
      title: "Action / कार्य",
      key: "action",
      render: (_text, record) => {
        return (
          <>
            <Tooltip title="View">
              <Link href={`/ward/opd/${record?.id}`}>
                <EyeOutlined />
              </Link>
            </Tooltip>
            <Tooltip title="Upload Lab" style={{ marginLeft: "10px" }}>
              {/* <UploadOutlined  onClick={() => {setOpenLabUploadModal(true) ; setMedicalRecordId(record?.id);}}/> */}
              <UploadOutlined onClick={() => onLabUploadButtonClick(record)} />
            </Tooltip>
          </>
        );
      },
      responsive: ["sm", "md", "lg"],
    },
  ];
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    month,
    year: !dateRange ? getCurrentYear() : year,
    start_date: "",
    end_date: "",
    patient_name: "",
    complaint_id: "",
    address: "",
    age: "",
    medical_record_date: "",
  });

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      setMonth("");
      setYear(null);
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      setDateRange(true);
      setDateRangeValue(dates);
    }
  };
  const handleSearch = () => {
    setFilterParams((prevState) => ({
      ...prevState,
      currentPage: INITIAL_CURRENT_PAGE,
      start_date: startDate,
      end_date: endDate,
      patient_name: patientName,
      // eslint-disable-next-line no-nested-ternary
      year: !dateRange
        ? year
          ? dayjs(year).format("YYYY")
          : getCurrentYear()
        : "",
      month: !dateRange ? month || getCurrentMonth() : "",
    }));
  };

  const handleReset = () => {
    setFilterParams((prev) => ({
      ...prev,
      currentPage: INITIAL_CURRENT_PAGE,
      year: getCurrentYear(),
      month: getCurrentMonth(),
      start_date: null,
      end_date: null,
    }));
    setYear(null);
    setMonth("");
    setStartDate(null);
    setEndDate(null);
    setDateRange(false);
    setDateRangeValue([]);
  };
  const { data: patientList } = useQuery(
    ["allPatientList", { filterParams }],
    getAllMedicalRecord
  );
  const { data: complaintList } = useQuery(
    ["complaintList"],
    getSelectComplain
  );
  const complaintOption = complaintList?.data.map((complaint: any) => {
    return {
      label: complaint.name,
      value: complaint.id,
    };
  });
  const handleCancel = () => {
    setOpenLabUploadModal(false);
  };
  const handleOk = () => {
    setOpenLabUploadModal(false);
  };
  console.log(filterParams, "check")
  useEffect(() => {
    let monthString = getCurrentMonthString();
     console.log(monthString, 'monthString');
  }, [])
  
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="OPD Overview / ओपीडी विवरण"
          icon={<PlusOutlined />}
          buttonLabel="New Record / नयाँ रेकर्ड थप्नुहोस्"
          link={"opd/form"}
        />
      </PageHeaderWrapper>
      <SearchBarContentRedesign>
        <Collapse
          defaultActiveKey={["1"]}
          style={{ padding: "5px 25px" }}
          expandIcon={() => <FilterOutlined />}
        >
          <Panel header="Filter" key="1">
            <Form>
              <Form.Item label="" name="name_filter">
                <Input
                  placeholder="Patient's Name"
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </Form.Item>
                {/* hidden form start*/}
              <Form.Item label="" name="complain_filter" style={{display:'none'}}> 
                <Select
                  defaultValue={""}
                  options={complaintOption}
                  allowClear
                  placeholder="Select a complaint"
                />
              </Form.Item>
              <Form.Item label="" name="address_filter" style={{display:'none'}}>
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item label="" name="age_filter" style={{display:'none'}}>
                <Input placeholder="Age" />
              </Form.Item>
              <Form.Item label="" name="medical_record_date_filter" style={{display:'none'}}>
                <Input placeholder="Medical Record Date" />
              </Form.Item>
              {/* hidden  form end*/}
              <Form.Item>
                <Select
                  value={month}
                  options={MONTH_SELECT}
                  onChange={(value) => setMonth(value)}      
                  disabled={dateRangeValue.length > 0}
                  placeholder="Select Month"
                />
              </Form.Item>
              <Form.Item>
                <DatePicker
                  picker="year"
                  value={year || dayjs(`${currentYear}-01-01`)}
                  onChange={(dateStrings) => setYear(dateStrings)}
                  disabled={dateRangeValue.length > 0}
                />
              </Form.Item>
              <Form.Item>
                <SelectDateRange>
                  <RangePicker
                    allowClear
                    autoComplete="false"
                    presets={rangePresets}
                    onChange={onRangeChange}
                    value={dateRangeValue}
                    style={{ width: "100%" }}
                  />
                </SelectDateRange>
              </Form.Item>
              <Form.Item className="action">
                <Button
                  type="primary"
                  style={{ boxShadow: "none" }}
                  onClick={handleSearch}
                >
                  Search / खोज्नुहोस्
                </Button>
                <Button danger onClick={handleReset}>
                  Reset / रिसेट
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      </SearchBarContentRedesign>
      <TableBodyContainer style={{ minHeight: "100vh" }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={24}>
            <Table
              className="patientTable"
              columns={patientListColumns}
              dataSource={patientList?.data}
              scroll={{ x: 1000 }}
              pagination={{
                ...filterParams,
                defaultPageSize: filterParams.pageSize,
                total: patientList?.meta?.total,
                hideOnSinglePage: true,
                showSizeChanger: true,
                current: +filterParams.currentPage,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page, pageSize) => {
                  setFilterParams({
                    ...filterParams,
                    currentPage: page,
                    pageSize,
                  });
                },
              }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
      <LabUploadModal
        handleCancel={handleCancel}
        isModalOpen={openLabUploadModal}
        handleSubmit={handleOk}
        recordId={medicaRecordId}
      />
    </div>
  );
};

export default Opd;
