import { Col, Image, QRCode, Row } from 'antd';
import { viewDetailMedicalRecord } from 'apis/admin/medical-record';
import MedicalRecordView from 'components/medical-record';
import AddPrescriptionModal from 'components/opd/Modal/AddPrescription';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TwoGridColumnView from 'shared/two-grid-column-view';
import styled from 'styled-components';
import { PageHeaderWrapper } from 'styles/authCSS';
import { ImageWrapper, LeftProfile, ProfileImage, Status, StatusTitle } from 'styles/profileInformation';
import { imageFullPath } from 'utils/helpers';

const ProfileWrapper = styled(Row)`
  padding: 25px;
`;

const AppointmentView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['medicalDetails', id], viewDetailMedicalRecord, {
    enabled: !!id
  });
  const [openPrescriptionModel, setOpenPrescriptionModel] = useState(false);

  const openClosePrescriptionModel = () => {
    setOpenPrescriptionModel(!openPrescriptionModel);
  };

  // const getItems = () => {
  //   return (
  //     <>
  //       <Col
  //         lg={24}
  //         sm={24}
  //         className="search-col-margin"
  //         style={{ margin: '0px 20px', background: '#fffffd' }}
  //         key={medicalRecord?.id}
  //       >
  //         <Card
  //           style={{
  //             borderRadius: '10px 10px 0px 0px',
  //             background: 'rgba(89, 171, 227, 0.2)',
  //             border: '1px solid rgb(82, 179, 217)',
  //             marginBottom: '20px',
  //             fontSize: '18px',
  //             fontWeight: '600',
  //             color: 'rgb(82, 179, 217)',
  //             padding: '0px',
  //             display: 'flex',
  //             justifyContent: 'center',
  //             alignContent: 'center'
  //           }}
  //         >
  //           Vitals
  //         </Card>
  //         <Row id="profile-cards">
  //           {medicalRecord?.patient?.vitals?.map((data: any) => (
  //             <Col md={6} key={data?.id}>
  //               <VitalCards vitalData={data} />
  //             </Col>
  //           ))}
  //         </Row>

  //         <Card title="Medical History" headStyle={{ fontSize: '20px' }} className="mt-10">
  //           {medicalRecord?.notes}
  //         </Card>

  //         <Card title="Physical Examination " headStyle={{ fontSize: '20px' }} className="mt-10">
  //           {medicalRecord?.diagnosis}
  //         </Card>

  //         {medicalRecord?.prescription &&
  //           medicalRecord?.prescription?.map((data: any) => (
  //             <Card title={data?.from} headStyle={{ fontSize: '20px' }} className="mt-10" key={data?.id}>
  //               {data?.suggested_treatment}
  //               <br />
  //               <span>{data?.prescription_date}</span>
  //             </Card>
  //           ))}
  //         <Card title="Test Reports" headStyle={{ fontSize: '20px' }} className="mt-10">
  //           <Row>
  //             <Col md={8}>
  //               <TestReportCard />
  //             </Col>
  //           </Row>
  //         </Card>
  //         {medicalRecord?.appointment && (
  //           <Card title="Appointment" headStyle={{ fontSize: '20px' }} className="mt-10" key="1">
  //             <Row>
  //               <Col md={24}>
  //                 <table style={{ width: '100%', textAlign: 'left' }}>
  //                   <tr>
  //                     <th>Appointment Date</th>
  //                     <th>Appointment Time</th>
  //                     <th style={{ textTransform: 'capitalize' }}>Status</th>
  //                     <th>Is Urgent</th>
  //                   </tr>
  //                   {medicalRecord?.appointment?.map((data: any) => (
  //                     <tr key={data?.id}>
  //                       <td>{data?.appointment_date}</td>
  //                       <td>{data?.appointment_time}</td>
  //                       <td style={{ textTransform: 'capitalize' }}>
  //                         <Tag color={Colors.ALGAE_GREEN}>{data?.status}</Tag>
  //                       </td>
  //                       <td>{data?.urgent ? 'true' : 'false'}</td>
  //                     </tr>
  //                   ))}
  //                 </table>
  //               </Col>
  //             </Row>
  //           </Card>
  //         )}
  //         <Card title="Prescription" headStyle={{ fontSize: '20px' }} className="mt-10">
  //           <Row>
  //             <Col md={8}>
  //               <DiagnosisCard />
  //             </Col>
  //             <Col md={8}>
  //               <DiagnosisCard />
  //             </Col>
  //             <Col md={8}>
  //               <DiagnosisCard />
  //             </Col>
  //           </Row>
  //         </Card>
  //       </Col>
  //     </>
  //   );
  // };

  return (
    <div>
      <PageHeaderWrapper>{/* <PageHeader items={HeaderItems} /> */}</PageHeaderWrapper>
      <ProfileWrapper>
        <LeftProfile lg={6} sm={24}>
          <ImageWrapper>
            <div>
              <ProfileImage>
                <Image
                  className={`profile-img `}
                  alt="avatar"
                  src={imageFullPath(
                    medicalRecord?.patient?.medias ? medicalRecord?.patient?.medias[0]?.url : 'src',
                    'profile'
                  )}
                />
              </ProfileImage>
            </div>
          </ImageWrapper>
          <Status>
            <StatusTitle>Status</StatusTitle>
            <h2>You can view the profile timeline here</h2>
          </Status>
          <Status>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCode
                value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${medicalRecord?.uuid}`}
                style={{ marginBottom: 16 }}
              />
            </div>
          </Status>
          <TwoGridColumnView data={medicalRecord?.patient} />
        </LeftProfile>
        <Col lg={17} sm={24} className="search-col-margin">
          {/* <Row>{getItems()}</Row> */}
          <MedicalRecordView medicalRecord={medicalRecord}/>
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

export default AppointmentView;
