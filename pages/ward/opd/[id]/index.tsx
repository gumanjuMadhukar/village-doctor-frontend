import { Col, Image, QRCode } from 'antd';
import { viewDetailMedicalRecord } from 'apis/admin/medical-record';
import MedicalRecordView from 'components/medical-record';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import TwoGridColumnView from 'shared/two-grid-column-view';
import { ProfileWrapper } from 'styles/profileInformation';
import { ImageWrapper, LeftProfile, ProfileImage, Status } from 'styles/profileInformation';
import { imageFullPath } from 'utils/helpers';

const OpdView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['medicalDetails', id], viewDetailMedicalRecord, {
    enabled: !!id
  });

  return (
    <ProfileWrapper>
      <LeftProfile lg={6} sm={24}>
        <TwoGridColumnView data={medicalRecord?.patient} />
        <ImageWrapper>
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
      {/* <PatientProfile medical_record={medicalRecord} /> */}
      <Col lg={18} sm={24} className="search-col-margin">
        <MedicalRecordView medicalRecord={medicalRecord} />
      </Col>
    </ProfileWrapper>
  );
};

export default OpdView;
