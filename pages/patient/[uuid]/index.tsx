import { Card, Col, Image, Row, Table } from 'antd';
import { getPatientWithUUID } from 'apis/admin/patient';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { FamilyDetailsColumns } from 'shared/patient-table-column';

const Patient: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { uuid } = router.query;
  const { data: record } = useQuery(['patient', uuid], getPatientWithUUID, {
    enabled: !!uuid
  });

  const patientDetails = record?.patient_details;
  const familyDetails = patientDetails?.family_details || [];
  const patientData = [patientDetails, ...(Array.isArray(familyDetails) ? familyDetails : [])];

  useEffect(() => {
    if (record?.access_token) {
      Cookies.set('token', record.access_token);
      Cookies.set('role', 'View');
    }
  }, [record]);

  return (
    <div>
      <Row style={{ justifyContent: 'space-between', padding: '0px 20px' }}>
        <Col span={24}>
          <Card
            title="Family Details"
            className="mt-10"
            extra={<Image src="/logo/logo.png" alt="village-doctor" preview={false} height={50} />}
          >
            {patientData && (
              <Table
                className="patientTable"
                columns={FamilyDetailsColumns({ uuid })}
                dataSource={patientData}
                scroll={{ x: 1000 }}
                rowClassName={'row-class'}
                pagination={false}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Patient;
