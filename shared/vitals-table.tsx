import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface props {
  vitalData?: VitalData[];
}
interface VitalData {
  date_of_measurement: string;
  name: string;
  measurement: string;
}

// interface TableColumn {
//   title: string;
//   dataIndex: string;
//   key: string;
//   filters?: never[];
//   onFilter?: (value: any, record: any) => boolean;
//   sorter?: (a: any, b: any) => number;
//   sortDirections?: ('ascend' | 'descend')[] | undefined; // Adjust sortDirections type
//   render?: (value: any) => any;
//   sortOrder?: 'ascend' | 'descend' | undefined; // Define sortOrder explicitly
//   filterDropdown?: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => JSX.Element;
// }
const VitalsTable = ({ vitalData }: props) => {
  const [tableData, setTableData] = useState<VitalData[]>([]);

  useEffect(() => {
    if (vitalData) {
      setTableData(vitalData);
    }
  }, [vitalData]);

  const columns: ColumnsType<any> = [  // previously used TableColumn instead of ColumnsType
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'date_of_measurement',
      render: (text, record) => {
        console.log(record, 'vdata')
        return <div>{dayjs(text).format('YYYY-MM-DD HH:ss')} <span style={{fontSize:'8px'}}>{record?.created_by}</span></div>;
      }
    },
    {
      title: 'Blood Pressure (BP)',
      dataIndex: 'blood_pressure',
      key: 'blood_pressure',
      width:150,
    },
    {
      title: 'Respiration',
      dataIndex: 'respiration',
      key: 'respiration'
    },
    {
      title: 'Pulse',
      dataIndex: 'pulse',
      key: 'pulse'
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature'
    },
    {
      title: 'SpO2',
      dataIndex: 'saturation',
      key: 'saturation'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      className="patientTable"
      size="small"
      scroll={{ y: 200 }}
      pagination={false}
    />
  );
};

export default VitalsTable;
