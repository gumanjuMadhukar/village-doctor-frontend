import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Tag } from 'antd';
import React, { useState } from 'react';
import DiagnosisCard from 'shared/diagnosis-card';
import TestReportCard from 'shared/test-report-card';
import Colors from 'utils/colors';

interface Props {
  medicalRecord: any;
}

const MedicalRecordComponent = (props: Props) => {
  const { medicalRecord } = props;
  const [openVitalModel, setOpenVitalModel] = useState(false);

  const openCloseVitalModel = () => {
    setOpenVitalModel(!openVitalModel);
  };
  return (
    <>
      <Col
        lg={24}
        sm={24}
        className="search-col-margin"
        style={{ margin: '0px 20px', background: '#fffffd' }}
        key={medicalRecord?.id}
      >
        <Card
          style={{
            borderRadius: '10px 10px 0px 0px',
            background: 'rgba(89, 171, 227, 0.2)',
            border: '1px solid rgb(82, 179, 217)',
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'rgb(82, 179, 217)',
            padding: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%'
          }}
        >
          Vitals
        </Card>
        <Button
          style={{
            backgroundColor: Colors.MAIN_BACKGROUND,
            color: '#fff',
            marginLeft: '10px',
            marginBottom: '10px',
            float: 'right'
          }}
          size="middle"
          onClick={openCloseVitalModel}
        >
          <PlusOutlined />
          Add Vitals
        </Button>
        {/* <Row id="profile-cards">
          <Col md={24} key={data?.id}>
            <VitalsTable vitalData={vdcata} />
          </Col>
        </Row> */}

        <Card title="Medical History" headStyle={{ fontSize: '20px' }} className="mt-10">
          {medicalRecord?.notes}
        </Card>

        <Card title="Physical Examination " headStyle={{ fontSize: '20px' }} className="mt-10">
          {medicalRecord?.diagnosis}
        </Card>

        {medicalRecord?.prescription &&
          medicalRecord?.prescription?.map((data: any) => (
            <Card title={data?.from} headStyle={{ fontSize: '20px' }} className="mt-10" key={data?.id}>
              {data?.suggested_treatment}
              <br />
              <span>{data?.prescription_date}</span>
            </Card>
          ))}
        <Card
          title="Test Reports"
          headStyle={{ fontSize: '20px' }}
          className="mt-10"
          extra={
            <Button
              style={{
                backgroundColor: Colors.MAIN_BACKGROUND,
                color: '#fff',
                marginLeft: '10px'
              }}
              size="middle"
              //   onClick={openCloseLabModal}
            >
              <PlusOutlined />
              Add Lab Report
            </Button>
          }
        >
          <Row>
            <Col md={8}>
              <TestReportCard />
            </Col>
          </Row>
        </Card>
        {medicalRecord?.appointment && (
          <Card title="Appointment" headStyle={{ fontSize: '20px' }} className="mt-10" key="1">
            <Row>
              <Col md={24}>
                <table style={{ width: '100%', textAlign: 'left' }}>
                  <tr>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th style={{ textTransform: 'capitalize' }}>Status</th>
                    <th>Is Urgent</th>
                  </tr>
                  {medicalRecord?.appointment?.map((data: any) => (
                    <tr key={data?.id}>
                      <td>{data?.appointment_date}</td>
                      <td>{data?.appointment_time}</td>
                      <td style={{ textTransform: 'capitalize' }}>
                        <Tag color={Colors.ALGAE_GREEN}>{data?.status}</Tag>
                      </td>
                      <td>{data?.urgent ? 'true' : 'false'}</td>
                    </tr>
                  ))}
                </table>
              </Col>
            </Row>
          </Card>
        )}
        <Card title="Prescription" headStyle={{ fontSize: '20px' }} className="mt-10">
          <Row>
            <Col md={8}>
              <DiagnosisCard />
            </Col>
            <Col md={8}>
              <DiagnosisCard />
            </Col>
            <Col md={8}>
              <DiagnosisCard />
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default MedicalRecordComponent;
