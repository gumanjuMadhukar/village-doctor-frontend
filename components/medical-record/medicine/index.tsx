import { PrinterOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { viewDetailMedicalRecord } from 'apis/admin/medical-record';
import React from 'react';
import { useQuery } from 'react-query';
import Colors from 'utils/colors';

const medicineListColumns: ColumnsType<any> = [
  {
    title: 'Medicine',
    key: 'first_name',
    render: (_, record) => {
      return <div className="semi-bold">{record?.medication_name}</div>;
    }
  },
  {
    title: 'Dosage',
    dataIndex: 'dosage',
    key: 'dosage',
    render: text => {
      return <div className="semi-bold">{text}</div>;
    }
  },
  {
    title: 'Times',
    dataIndex: 'quantity',
    key: 'quantity',
    render: text => <div>{text} per day</div>
  },
  {
    title: 'Timing',
    dataIndex: 'timing',
    key: 'timing',
    render: text => <div>{text}</div>
  },
  {
    title: 'Form',
    dataIndex: 'form',
    key: 'quantity',
    render: text => <div>{text === 'before_meal' ? 'Before Meal' : 'After Meal'}</div>
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'quantity',
    render: text => <div>{text}</div>
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'quantity',
    render: text => <div>{text}</div>
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    render: text => <div>{text}</div>
  }
];
interface Props {
  medication: any;
  print: any;
}
const MedicineList = ({ medication, print }: Props) => {
  const id = medication;
  const { data: medicalRecord } = useQuery(['medicalDetails', id], viewDetailMedicalRecord, {
    enabled: !!id
  });

  return (
    <>
      {medication && (
        <>
          <Table dataSource={medicalRecord?.medication} columns={medicineListColumns} pagination={false} />
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: '#fff',
              marginLeft: '10px'
            }}
            size="small"
            onClick={print}
          >
            <PrinterOutlined/>
            Print Medicine
          </Button>
        </>
      )}
    </>
  );
};

export default MedicineList;
