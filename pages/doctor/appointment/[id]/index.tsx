import { Col, Image, QRCode, Row } from 'antd';
import { viewDetailMedicalRecord } from 'apis/admin/medical-record';
import MedicalRecordView from 'components/medical-record';
import AddPrescriptionModal from 'components/opd/Modal/AddPrescription';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TwoGridColumnView from 'shared/two-grid-column-view';
import styled from 'styled-components';
import { ImageWrapper, LeftProfile, ProfileImage, Status } from 'styles/profileInformation';
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
  return (
    <div>
      <ProfileWrapper>
        <LeftProfile lg={6} sm={24}>
          <TwoGridColumnView data={medicalRecord?.patient} />
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCode
                value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${medicalRecord?.uuid}`}
                style={{ marginBottom: 16 }}
              />
            </div>
          </Status>
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
