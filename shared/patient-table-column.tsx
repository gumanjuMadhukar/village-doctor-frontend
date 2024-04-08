import { DeleteOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import Link from 'next/link';
import styled from 'styled-components';
import Colors from 'utils/colors';
import { calculateAge, calculateAgeYM, capitalize, imageFullPath } from 'utils/helpers';

interface CommonPatientColumnType {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: string;
  blood_group: string;
  gender: string;
  address: string;
  religion: string;
  contact_number: string;
}

const NameRenderer: React.FC<{ record: CommonPatientColumnType }> = ({ record }) => (
  <div className="semi-bold">
    {record?.first_name} {record?.last_name}
  </div>
);

export const commonPatientColumns: ColumnsType<CommonPatientColumnType> = [
  {
    title: 'Name / नाम',
    key: 'first_name',
    render: (_, record) => <NameRenderer record={record} />
  },
  {
    title: 'Date of Birth / जन्म मिति',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
    render: text => <div>{text}</div>,
    align: 'center'
  },
  {
    title: 'Age / उमेर',
    dataIndex: 'date_of_birth',
    key: 'age',
    render: text => {
      return (
        <div>
          {calculateAge(text)}.{calculateAgeYM(text)}
        </div>
      );
    },
    align: 'center'
  },
  {
    title: 'Blood Group / ब्लड ग्रुप',
    dataIndex: 'blood_group',
    key: 'blood_group',
    render: text => <div>{text}</div>,
    align: 'center'
  },
  {
    title: 'Gender / लिङ्ग',
    dataIndex: 'gender',
    key: 'gender',
    render: text => <div>{capitalize(text)}</div>,
    align: 'center'
  },
  {
    title: 'Marital Status',
    dataIndex: 'marital_status',
    key: 'marital_status',
    render: text => <div>{capitalize(text)}</div>,
    align: 'center'
  },
  {
    title: 'Religion / धर्म',
    dataIndex: 'religion',
    key: 'religion',
    render: (religion: string) => <div>{religion}</div>,
    align: 'center'
  },
  {
    title: 'Address / ठेगाना',
    dataIndex: 'address',
    key: 'address',
    render: text => <div>{text}</div>,
    align: 'center'
  },
  {
    title: 'Contact Number / फोन',
    dataIndex: 'contact_number',
    key: 'contact_number',
    render: text => <div>{text}</div>,
    align: 'center'
  }
];

type OPDPatientListColumnType = CommonPatientColumnType & {
  medical_records: string;
  vitals: [];
  latest_visit: string;
};

export const ActionWrapper = styled.div``;

export const OPDPatientListColumns: ColumnsType<any> = [
  ...commonPatientColumns,
  {
    title: 'Medical Record Count / मेडिकल रेकर्ड ',
    key: 'medical_records',
    render: (record: OPDPatientListColumnType) => <div className="center">{record?.medical_records}</div>,
    align: 'center'
  },
  // {
  //   title: 'Vital Taken Till / अहिले सम्म लिइएको भाइटल्स',
  //   dataIndex: 'vitals',
  //   key: 'vitals',
  //   render: text => {
  //     return <div className="center">{text?.length}</div>;
  //   },
  //   align: 'center'
  // },
  {
    title: 'Latest Visit Date / पछिल्लो भ्रमण मिति ',
    key: 'latest',
    render: (_text, record: OPDPatientListColumnType) => {
      return <div className="center">{record?.latest_visit || '-'}</div>;
    },
    align: 'center'
  }
];

export const WardOPDListColumns :ColumnsType<any> = [
  ...OPDPatientListColumns,
{
  title: 'Action / कार्य',
  key: 'action',
  render: record => (
    <div style={{ alignItems: 'center' }}>
      <a href={`/ward/patients/${record?.id}`} rel="noreferrer">
        <EyeOutlined size={30} />
      </a>
    </div>
  ),
  responsive: ['sm', 'md', 'lg'],
  align: 'center'
}]
export const AdminOPDListColumns :ColumnsType<any> = [
  ...OPDPatientListColumns,
{
  title: 'Action / कार्य',
  key: 'action',
  render: record => (
    <div style={{ alignItems: 'center' }}>
      <a href={`/nurse/patient/${record?.id}`} rel="noreferrer">
        <EyeOutlined size={30} />
      </a>
      <a
        href={`/nurse/${record?.id}`}
        target="_blank"
        rel="noreferrer"
        style={{ paddingLeft: '10px', color: 'black' }}
      >
        <PrinterOutlined  size={30} />
      </a>
    </div>
  ),
  responsive: ['sm', 'md', 'lg'],
  align: 'center'
}]
export const PatientListColumns: ColumnsType<any> = [
  {
    title: "Name / नाम",
    key: "first_name",
    render: (_, record) => {
      return (
        <div className="semi-bold">
          {record?.patient?.first_name} {record?.patient?.last_name}
        </div>
      );
    },
    width: 150,
  },
  {
    title: "Age / उमेर",
    key: "age",
    render: (_, record) => {
      const age = calculateAge(record?.patient?.date_of_birth);
      const month = calculateAgeYM(record?.patient?.date_of_birth);
      return (
        <div className="center">
          {age}.{month}
        </div>
      );
    },
    align: "center",
  },
  {
    title: "Date of Birth / जन्म मिति",
    dataIndex: ["patient", "date_of_birth"],
    key: "date_of_birth",
    render: (text) => <div>{text}</div>,
    align: "center",
  },
  {
    title: "Gender / लिङ्ग",
    dataIndex: ["patient", "gender"],
    key: "gender",
    render: (text) => <div>{text}</div>,
    align: "center",
  },
  {
    title: "Marital Status",
    dataIndex: ["patient", "marital_status"],
    key: "marital_status",
    render: (text) => <div>{text}</div>,
    align: "center",
  },
  {
    title: "Medical Record Date / मेडिकल रेकर्ड मिति",
    dataIndex: "record_date",
    key: "medical_records",
    render: (text) => <div>{text}</div>,
    align: "center",
  },
  {
    title: "Complaint / गुनासो",
    dataIndex: "diagnosis",
    key: "diagnosis",
    render: (text) => <div>{text}</div>,
    align: "center",
  },
  {
    title: "Status / स्थिति",
    dataIndex: "status",
    key: "status",
    render: (text) => <div>{text}</div>,
    align: "center",
  }
];

interface PatientListColumns {
  handleDelete: (record: any) => void;
  handleDetailMedicalRecordView: (record: any) => void;
}

export const SinglePatientListColumns: (props: PatientListColumns) => ColumnType<CommonPatientColumnType>[] = ({
  handleDelete,
  handleDetailMedicalRecordView
}: PatientListColumns) => [
  ...commonPatientColumns,
  {
    title: 'Photo',
    key: 'medias',
    dataIndex: 'medias',
    render: (media: string) => (
      <Image src={imageFullPath(media, '/logo/aeirc_logo.png')} alt="village-doctor" height="20px" />
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: any) => (
      <div style={{ alignItems: 'center' }}>
        {/* <a href={`/ward/patients/${record?.id}`} rel="noreferrer">
          <EyeOutlined size={30} />
        </a> */}
        <EyeOutlined style={{color:Colors.GREEN}} onClick={() => handleDetailMedicalRecordView(record)}/>
        <DeleteOutlined style={{ color: Colors.RED }} onClick={() => handleDelete(record)} />
      </div>
    ),
    responsive: ['sm', 'md', 'lg'],
    align: 'center'
  }
];

export const FamilyDetailsColumns: (props: any) => ColumnType<CommonPatientColumnType | OPDPatientListColumnType>[] = ({
  uuid
}) => [
  ...commonPatientColumns,
  {
    title: 'Photo',
    key: 'medias',
    dataIndex: 'medias',
    render: (media: string) => (
      <Image src={imageFullPath(media, '/logo/aeirc_logo.png')} alt="village-doctor" height="20px" />
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: record => (
      <div style={{ alignItems: 'center' }}>
        <Link href={`${uuid}/${record?.id}`} rel="noreferrer">
          <EyeOutlined size={30} />
        </Link>
      </div>
    ),
    responsive: ['sm', 'md', 'lg'],
    align: 'center'
  }
];
