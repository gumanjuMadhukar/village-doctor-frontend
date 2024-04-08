import { EditFilled, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllMedicalRecord } from 'apis/admin/medical-record';
import PageHeader from 'components/layout/page-header';
import AddFollowUpModal from 'components/opd/Modal/AddFollowUpModal';
import CustomTable from 'components/shared/CustomTable';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PageHeaderWrapper } from 'styles/authCSS';
import { SearchBar, TableBodyContainer } from 'styles/styled/PageHeader';
import { calculateAge } from 'utils/helpers';

interface FilterParams {
  currentPage: number;
  pageSize: number;
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}
const HeaderItems = [
  {
    name: 'Follow Up',
    link: ''
  }
];

const FollowUp = () => {
  const [followUpModalOpen, SetFollowUpModalOpen] = useState(false);
  const [medicalRecordId, setMedicalRecordId] = useState('');
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    start_date: '',
    end_date: ''
  });
  const { data: allMedicalRecordList } = useQuery(['allMedicalRecordList', { filterParams }], getAllMedicalRecord);

  // const RecordList = [
  //   ...allMedicalRecordList,
  //   {id:234, record_date:'2024-02-06', notes:'null' , patient: {
  //     "id": 87,
  //     "first_name": "Hvhgh",
  //     "last_name": "Hjh",
  //     "date_of_birth": "1990-05-04",
  //     "gender": "MALE",
  //     "contact_number": "8797999999",
  //     "address": "Ihkj",
  //     "deleted_at": null,
  //     "created_at": "2024-02-18T19:18:58.000000Z",
  //     "updated_at": "2024-02-18T19:18:58.000000Z",
  //     "uuid": "b07c8a8a-01ed-48c2-bb78-c2a8e19d8b5e",
  //     "ward_no": "4",
  //     "created_by": "3",
  //     "updated_by": null,
  //     "age": "33",
  //     "religion": "Hindu",
  //     "marital_status": "MARRIED",
  //     "is_house_head": "1",
  //     "househead_no": "6888888776",
  //     "patient_id": null,
  //     "province_id": "1",
  //     "district_id": "1",
  //     "municipality_id": "1",
  //     "blood_group": null,
  //     "citizenship_no": null,
  //     "insurance_no": "Fdfddfgd",
  //     "nid_no": null,
  //     "relationship": null
  // },status:'follow-up' ,hopi:'dghaskjhd'}
  // ]
  const handleFollowUp = (id:any) => {
    setMedicalRecordId(id);
    SetFollowUpModalOpen(true);
  } 
  
  const patientListColumns: ColumnsType<any> = [
    {
      title: 'Name / नाम',
      key: 'first_name',
      render: (_, record) => {
        return (
          <div className="semi-bold">
            {record?.patient?.first_name} {record?.patient?.last_name}
          </div>
        );
      },
      width: 150
    },
    {
      title: 'Age / उमेर',
      key: 'age',
      render: (_, record) => {
        const age = calculateAge(record?.patient?.date_of_birth);
        return <div className="center">{age}</div>;
      },
      align: 'center'
    },
    {
      title: 'Date of Birth / जन्म मिति',
      dataIndex: ['patient', 'date_of_birth'],
      key: 'date_of_birth',
      render: text => <div>{text}</div>,
      align: 'center'
    },
    {
      title: 'Gender / लिङ्ग',
      dataIndex: ['patient', 'gender'],
      key: 'gender',
      render: text => <div>{text}</div>,
      align: 'center'
    },
    {
      title: 'Marital Status',
      dataIndex: ['patient', 'marital_status'],
      key: 'marital_status',
      render: text => <div>{text}</div>,
      align: 'center'
    },
    {
      title: 'Medical Record Date / मेडिकल रेकर्ड मिति',
      dataIndex: 'record_date',
      key: 'medical_records',
      render: text => <div>{text}</div>,
      align: 'center'
    },
    {
      title: 'Complaint / गुनासो',
      dataIndex: 'complaint',
      key: 'diagnosis',
      render: text => <div>{text}</div>,
      align: 'center'
    },
    {
      title: 'Status / स्थिति',
      dataIndex: 'status',
      key: 'status',
      render: text => <div>{text}</div>,
      align: 'center'
    },
  ];
  const FollowUpPatientList: ColumnsType<any> = [
    ...patientListColumns,
    {
      title: 'Action / कार्य',
      key: 'action',
      render: record => (
        <div>
          <span onClick={() => handleFollowUp(record?.id)}>
            <EditFilled />
          </span>
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader items={HeaderItems} titleContent="Follow Up" icon={<PlusOutlined />} />
      </PageHeaderWrapper>
      <SearchBar>
        <Form>
          {/* <SearchBarContent>
            <DatePicker
              picker="year"
              value={year || dayjs(`${currentYear}-01-01`)}
              onChange={dateStrings => setYear(dateStrings)}
              disabled={dateRangeValue.length > 0}
            />
            <Button type="primary" style={{ boxShadow: 'none' }} onClick={handleSearch}>
              Search
            </Button>
            <Button danger onClick={handleReset}>
              Reset
            </Button>
          </SearchBarContent> */}
        </Form>
      </SearchBar>
      <TableBodyContainer>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col span={24}>
            <CustomTable
              columnList={FollowUpPatientList}
              data={allMedicalRecordList?.data}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              total={allMedicalRecordList?.meta?.total}
              className="patientTable"
              scroll={{ x: 1000 }}
            />
          </Col>
        </Row>
      </TableBodyContainer>
      <AddFollowUpModal
        handleCancel={() => SetFollowUpModalOpen(false)}
        isModalOpen={followUpModalOpen}
        recordId={medicalRecordId}
      />
    </div>
  );
};

export default FollowUp;
