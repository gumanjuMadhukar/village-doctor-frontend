// pages/my-chart.tsx

import { Image, QRCode } from 'antd';
import { getPatientById } from 'apis/admin/patient';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const IdCardPrint = () => {
  const router = useRouter();
  const { IdCardPrint } = router.query;
  const [printedAndClosed, setPrintedAndClosed] = useState(false);
  const { data: patientData, isLoading } = useQuery(['IdCardPrint', IdCardPrint], getPatientById, {
    enabled: !!IdCardPrint
  });

  useEffect(() => {
    if (patientData && !printedAndClosed && !isLoading) {
      const printAndClose = () => {
        const printContent = document.getElementById('print-section')?.innerHTML;
        const originalContent = document.body.innerHTML;
        if (printContent) {
          document.body.innerHTML = printContent;
          // Delay before printing (adjust as needed)
          setTimeout(() => {
            window.print();
            // Delay before closing the window (adjust as needed)
            setTimeout(() => {
              document.body.innerHTML = originalContent;
              window.close();
            }, 500);
          }, 500);
        }
        // setTimeout(() => {
        //   window.print();
        // }, 500);
        // // Delay the tab close for a few seconds (adjust as needed)
        // setTimeout(() => {
        //   window.close();
        // }, 500); // Close the tab after 2 seconds
      };

      printAndClose();
      setPrintedAndClosed(true); // Set the state to indicate that printing and closing have been performed
    }
  }, [patientData, printedAndClosed, isLoading]);

  return (
    <div id="print-section">
      {/* <div className="id-card">
        <div className="id-card-header">Palika Heath Card</div>
        <div>PATIENT ID : 000</div>
        <div className="id-card-image">
          <Image
            alt="avatar"
            src={imageFullPath(
              patientData?.medias && patientData?.medias[0]?.url,
              '/images/default_profile_picture.jpeg'
            )}
            preview={false}
          />
          <br />
        </div>
        <div className="id-card-title">
          {patientData?.first_name} {patientData?.last_name} <br />
          {patientData?.contact_number}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px' }}>
          <QRCode
            value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${patientData?.uuid}`}
            style={{ height: '60px !important' }}
            size={120}
            bordered={false}
          />
          <div style={{ paddingLeft: '20px', textAlign: 'left' }}>
            Ward No : 08 <br />
            MUN / VDC : XXXX <br />
            DOB : {patientData?.date_of_birth} <br />
            GENDER: {patientData?.gender}
          </div>
        </div>
        <div className="id-card-footer">VISIT US @ village-doctor.aeirc.tech</div>
      </div>

      <div className="id-card" style={{ marginTop: '1048px' }}>
        <div className="id-card-header">Palika Heath Card</div>

        <h2>PATIENT DETAIL</h2>
        <div style={{ paddingLeft: '20px', textAlign: 'left', lineHeight: '1.6' }}>
          NAME : {patientData?.first_name} {patientData?.last_name} <br />
          DOB : {patientData?.date_of_birth} <br />
          GENDER: {patientData?.gender} <br />
          CONTACT NUMBER : {patientData?.contact_number} <br />
          WARD NO : 08 <br />
          ADDRESS : {patientData?.address} <br />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #000',
            margin: '20px',
            lineHeight: '1.3'
          }}
        >
          This card is for the patients medical history. If found, please contact the patient or their respective health
          center or contact <br />
          +977 1400000 <br />
          Thank you
        </div>
        <div className="id-card-footer">VISIT US @ village-doctor.aeirc.tech</div>
      </div> */}

      <div className="id-card id-front-page ">
        <div className="card-container front">
          <div className="top-section">
            <div className="inner">
              <div className="logo">
                <Image src="/img/village_doctor_logo.png" alt="village_doctor_logo.png" preview={false} />
                {/* <div className="logo-text">
                  <p>Village Doctor</p>
                </div> */}
              </div>

              <div className="profile">
                <div className="image">
                  {/* <Image
                    alt="avatar"
                    src={imageFullPath(
                      patientData?.medias && patientData?.medias[0]?.url,
                      '/images/default_profile_picture.jpeg'
                    )}
                    preview={false}
                  /> */}
                  <Image src="/img/village_doctor_logo.png" alt="village_doctor_logo.png" preview={false} />
                </div>
                <div className="name">
                  <h1>
                    {patientData?.first_name} {patientData?.last_name}
                  </h1>
                </div>
                <div className="reg-date">
                  <p>regd : 2023-01-01</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mid-section">
            <div className="image">
              <Image className="" src="/img/village_doctor_logo.png" alt="village_doctor_logo.png" />
            </div>
            <div className="name">
              <h1>Vikash Bhusal</h1>
            </div>
            <div className="reg-date">
              <p>regd : 2023-01-01</p>
            </div>
          </div> */}
          <div className="desc-section">
            <ul>
              <li>
                <span className="subject"> P.No </span>
                <span>:</span>
                <span className="content">{patientData?.id}</span>
              </li>
              <li>
                <span className="subject"> Gender </span>
                <span>:</span>
                <span className="content">{patientData?.gender}</span>
              </li>
              <li>
                <span className="subject"> Email </span>
                <span>:</span>
                <span className="content">abc@email.com </span>
              </li>
              <li>
                <span className="subject"> Phone </span>
                <span>:</span>
                <span className="content">1234567890 </span>
              </li>
              <li>
                <span className="subject"> D.O.B </span>
                <span>:</span>
                <span className="content">{patientData?.date_of_birth}</span>
              </li>
              <li>
                <span className="subject"> Address </span>
                <span>:</span>
                <span className="content">{patientData?.address} </span>
              </li>
              <li>
                <span className="subject"> Ward </span>
                <span>:</span>
                <span className="content">5 </span>
              </li>
            </ul>
          </div>
          <div className="QR-section">
            <QRCode
              value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${patientData?.uuid}`}
              style={{ height: '60px !important' }}
              size={120}
              bordered={false}
            />
          </div>
        </div>
      </div>
      <div className="id-card id-back-page">
        <div className="card-container back">
          <div className="design">
            <div className="inner">Village Doctor</div>
          </div>
          <div className="section-title">
            <h1>Terms & Condition</h1>
          </div>
          <div className="desc">
            <div className="line">
              <p>Terms and Condition for Palika Health card Usage:</p>
            </div>
            <div className="content">
              <ul>
                <li>
                  <p>Cardholder Responsibility:</p>
                  <ul>
                    <li>
                      The Palika Health Card is the property of the cardholder. It is the cardholders responsibility to
                      safeguard the card and ensure its appropriate use.
                    </li>
                  </ul>
                </li>
                <li>
                  <p>Authorized Usage:</p>
                  <ul>
                    <li>
                      The Palika Health Card is authorized for use in accessing personal health records and
                      participating in healthcare services offered by the Village Doctor initiative. Any unauthorized
                      use is strictly prohibited
                    </li>
                  </ul>
                </li>
                <li>
                  <p>Data Confidentiality:</p>
                  <ul>
                    <li>
                      Users are expected to uphold the confidentiality of their health data accessed through the Palika
                      Health Card. Sharing login credentials or health information with unauthorized individuals is a
                      violation of these terms.
                    </li>
                  </ul>
                </li>
                <li>
                  <p>Notification of Loss or Theft:</p>
                  <ul>
                    <li>
                      In the event of loss or theft of the Palika Health Card, cardholders must immediately report the
                      incident to Village Doctors customer support to prevent unauthorized access.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCardPrint;
