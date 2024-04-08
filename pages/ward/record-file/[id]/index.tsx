import { Card, Col, Image, QRCode, Row } from 'antd';
import { viewDetailMedicalRecord } from 'apis/admin/medical-record';
import AddPrescriptionModal from 'components/opd/Modal/AddPrescription';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DiagnosisCard from 'shared/diagnosis-card';
import TestReportCard from 'shared/test-report-card';
import TwoGridColumnView from 'shared/two-grid-column-view';
import VitalCards from 'shared/vitals-card';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import Colors from 'utils/colors';

const ProfileWrapper = styled(Row)`
  padding: 25px;
`;

const LeftProfile = styled(Col)`
  background-color: #fff;
  height: 300px;
`;

const ProfileImage = styled.div`
  width: 200px;
  text-align: center;
  .ant-image {
    width: 100%;
    .profile-img {
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      border-radius: 50%;
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const StatusRightIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: ${Colors.LIGHT_BG};
  padding: 5px 10px;
  cursor: pointer;
`;

const StatusTitle = styled.div`
  color: ${Colors.TEXT_COLOR};
  font-weight: 700;
  font-size: 15px;
`;

const Status = styled.div`
  background: #fff;
  margin-top: 15px;
  padding: 25px;
  position: relative;
  text-align: center;

  &:hover {
    color: ${Colors.PRIMARY};
    border: 1px solid ${Colors.PRIMARY};

    & ${StatusRightIcon} {
      background: ${Colors.PRIMARY};
      color: ${Colors.WHITE} !important;
    }
    & ${StatusTitle} {
      color: ${Colors.PRIMARY} !important;
    }
  }
`;

const RecordFile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['patient', id], viewDetailMedicalRecord, {
    enabled: !!id
  });
  const [openPrescriptionModel, setOpenPrescriptionModel] = useState(false);

  const vitals = medicalRecord?.vitals;

  const openClosePrescriptionModel = () => {
    setOpenPrescriptionModel(!openPrescriptionModel);
  };
  return (
    <div>
      <PageHeaderWrapper>{/* <PageHeader items={HeaderItems} /> */}</PageHeaderWrapper>
      <ProfileWrapper>
        <LeftProfile lg={6} sm={24}>
          <ImageWrapper>
            <div>
              <ProfileImage>
                <Image className={`profile-img `} alt="avatar" src={'/images/default_profile_picture.jpeg'} />
              </ProfileImage>
            </div>
          </ImageWrapper>
          <Status>
            <StatusTitle>Status</StatusTitle>
            <h2>You can view the profile timeline here</h2>
          </Status>
          <Status>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCode value="https://aeirc.tech/" style={{ marginBottom: 16 }} />
            </div>
          </Status>
          <TwoGridColumnView data={medicalRecord?.patient} />
        </LeftProfile>
        <Col lg={18} sm={24} className="search-col-margin" style={{ paddingLeft: '10px' }}>
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
              alignContent: 'center'
            }}
          >
            Vitals
          </Card>
          <Row id="profile-cards">
            {vitals?.map((data: any) => (
              <Col md={6} key={data?.id}>
                <VitalCards vitalData={data} />
              </Col>
            ))}
          </Row>

          <Card title="Medical History" headStyle={{ fontSize: '20px' }} className="mt-10">
            {medicalRecord?.notes}
          </Card>

          <Card title="Physical Examination " headStyle={{ fontSize: '20px' }} className="mt-10">
            {medicalRecord?.diagnosis}
          </Card>
          <Card title="Test Reports" headStyle={{ fontSize: '20px' }} className="mt-10">
            <Row>
              <Col md={8}>
                <TestReportCard />
              </Col>
            </Row>
          </Card>
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
            <Card
              style={{
                background: 'rgba(89, 171, 227, 0.2)',
                border: '1px dashed rgb(82, 179, 217)',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                fontSize: '18px',
                fontWeight: '600',
                color: 'rgb(82, 179, 217)',
                padding: '0px',
                cursor: 'pointer'
              }}
              onClick={openClosePrescriptionModel}
            >
              Add a Prescription
            </Card>
          </Card>
        </Col>
      </ProfileWrapper>
      <AddPrescriptionModal
        isModalOpen={openPrescriptionModel}
        handleCancel={openClosePrescriptionModel}
        patient_id={medicalRecord?.patient?.id}
      />
    </div>
  );
};

export default RecordFile;
