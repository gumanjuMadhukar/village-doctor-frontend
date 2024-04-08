import { Card, Col, Image, QRCode, Row } from 'antd';
import { getPatientById } from 'apis/admin/patient';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import TestReportCard from 'shared/test-report-card';
import TwoGridColumnView from 'shared/two-grid-column-view';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import Colors from 'utils/colors';
import { imageFullPath } from 'utils/helpers';

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

const OpdView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['patient', id], getPatientById, {
    enabled: !!id
  });
  const data = medicalRecord?.appointment;
  const getItems = () => {
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
            Medical Record
          </Card>

          <Card title="Vitals" className="mt-10" size="small">
            <Row id="profile-cards">
              <Col md={24} key={data?.id}>
                {/* {vdata && vdata?.length > 0 && <VitalsTable vitalData={vdata} />} */}
              </Col>
            </Row>
          </Card>

          <Card title="Cheif Complain" className="mt-10" size="small">
            {/* <table>
              <tr>
                <td>Chest Pain</td>
                <td>*</td>
                <td>2 days</td>
              </tr>
              <tr>
                <td>Headache</td>
                <td>*</td>
                <td>2 days</td>
              </tr>
            </table> */}
          </Card>
          <Card title="History of presenting illness" className="mt-10" size="small">
            {/* {medicalRecord?.notes} */}
          </Card>
          <Card title="Medical History" className="mt-10" size="small">
            {/* {medicalRecord?.notes} */}
          </Card>
          <Card title="Past History" className="mt-10" size="small">
            <Row>
              <Col md={12}>
                <Card title="Medical History" className="mt-10" size="small">
                  {/* {medicalRecord?.notes} */}
                </Card>
              </Col>
              <Col md={12}>
                <Card title="Surgical History" className="mt-10" size="small">
                  {/* {medicalRecord?.notes} */}
                </Card>
              </Col>
              <Col md={12}>
                <Card title="Family History" className="mt-10" size="small">
                  {/* {medicalRecord?.notes} */}
                </Card>
              </Col>
              <Col md={12}>
                <Card title="Personal History" className="mt-10" size="small">
                  {/* {medicalRecord?.notes} */}
                </Card>
              </Col>
            </Row>
          </Card>
          <Card title="Provisional Diagonsis" className="mt-10" size="small">
            {/* {medicalRecord?.notes} */}
          </Card>

          <Card title="Physical Examination " className="mt-10" size="small">
            {/* {medicalRecord?.diagnosis} */}
          </Card>

          {/* {medicalRecord?.prescription &&
            medicalRecord?.prescription?.map((data: any) => (
              <Card title={data?.from} headStyle={{ fontSize: '20px' }} className="mt-10" key={data?.id}>
                {data?.suggested_treatment}
                <br />
                <span>{data?.prescription_date}</span>
              </Card>
            ))} */}
          <Card title="Test Reports" headStyle={{ fontSize: '20px' }} className="mt-10">
            <Row>
              <Col md={8}>
                <TestReportCard />
              </Col>
            </Row>
          </Card>
          {/* {medicalRecord?.appointment && (
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
          )} */}
          <Card title="Prescription" headStyle={{ fontSize: '20px' }} className="mt-10">
            <Row></Row>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <div>
      <PageHeaderWrapper>{/* <PageHeader items={HeaderItems} /> */}</PageHeaderWrapper>
      <ProfileWrapper>
        <LeftProfile lg={6} sm={24}>
          <ImageWrapper>
            <div>
              <ProfileImage>
                <Image className={`profile-img `} alt="avatar" src={imageFullPath(medicalRecord?.medias, 'profile')} />
              </ProfileImage>
            </div>
          </ImageWrapper>

          <Status>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCode
                value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${medicalRecord?.uuid}`}
                style={{ marginBottom: 16 }}
              />
            </div>
          </Status>
          <TwoGridColumnView data={medicalRecord} />
        </LeftProfile>
        <Col lg={17} sm={24} className="search-col-margin">
          <Row>{getItems()}</Row>
        </Col>
      </ProfileWrapper>
    </div>
  );
};

export default OpdView;
