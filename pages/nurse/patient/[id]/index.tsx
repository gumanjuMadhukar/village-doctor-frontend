import { Col} from 'antd';
import { getPatientById } from 'apis/admin/patient';
import AddPrescriptionModal from 'components/opd/Modal/AddPrescription';
import PatientProfile from 'components/shared/patient-profile';
import PatientView from 'components/shared/patient-view';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PageHeaderWrapper } from 'styles/authCSS';
import { ProfileWrapper } from 'styles/profileInformation';

const Patient = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: medicalRecord } = useQuery(['patient', id], getPatientById, {
    enabled: !!id
  });
  const [openPrescriptionModel, setOpenPrescriptionModel] = useState(false);
  const openClosePrescriptionModel = () => {
    setOpenPrescriptionModel(!openPrescriptionModel);
  };
  return (
    <div>
      <PageHeaderWrapper>{/* <PageHeader items={HeaderItems} /> */}</PageHeaderWrapper>
      <ProfileWrapper>
        <PatientProfile/>
        {/* <LeftProfile lg={6} sm={24}>
          <ImageWrapper>
            <div>
              <ProfileImage>
                <Image
                  className={`profile-img`}
                  alt="avatar"
                  src={imageFullPath(medicalRecord?.medias[0]?.url, 'profile')}
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
          <TwoGridColumnView data={medicalRecord} />
          <AllergiesGrid data={medicalRecord} />
        </LeftProfile> */}
        <Col lg={17} sm={24} className="search-col-margin">
            <PatientView/>
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

export default Patient;
