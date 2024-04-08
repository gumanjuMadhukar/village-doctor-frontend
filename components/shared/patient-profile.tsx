import { Image, QRCode } from 'antd';
import { getPatientById } from 'apis/admin/patient';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import TwoGridColumnView from 'shared/two-grid-column-view';
import { ImageWrapper, LeftProfile, ProfileImage, Status } from 'styles/profileInformation';
import { imageFullPath } from 'utils/helpers';

const PatientProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['medicalDetails', id], getPatientById, {
    enabled: !!id
  });
  return (
    <LeftProfile lg={6} sm={24}>
      <TwoGridColumnView data={medicalRecord} />
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
  );
};

export default PatientProfile;
