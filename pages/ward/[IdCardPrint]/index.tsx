import { Image } from 'antd';
import { getPatientById } from 'apis/admin/patient';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { capitalize } from 'utils/helpers';

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
              // window.close();
            }, 2000);
          }, 2000);
        }
      };

      printAndClose();
      setPrintedAndClosed(true); // Set the state to indicate that printing and closing have been performed
    }
  }, [patientData, printedAndClosed, isLoading]);

  return (
    <>
      <div id="print-section">
        <div className="id-card id-front-page ">
          <div className="card-container front">
            <div className="top-section">
              <div className="inner">
                <div className="logo">
                  <Image src="/img/village_doctor_logo.png" alt="village_doctor_logo.png" preview={false} />
                  <Image src="/img/nagarpalika.png" alt="village_doctor_logo.png" preview={false} />
                </div>
                <div className="profile">
                  <div className="image" style={{ marginTop: '25px' }}>
                    <Image alt="avatar" src="/img/village_doctor_logo.png" preview={false} />
                  </div>
                  <div className="name">
                    <h1>
                      {patientData?.first_name} {patientData?.last_name}
                    </h1>
                  </div>
                  <div className="reg-date">
                    <p>दर्ता नम्बर : {patientData?.patientNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="desc-section" style={{ zIndex: '-2000' }}>
              <ul>
                <li>
                  <span className="subject"> Gender </span>
                  <span>:</span>
                  <span className="content">{capitalize(patientData?.gender)}</span>
                </li>
                <li>
                  <span className="subject"> मोबाईल नम्बर </span>
                  <span>:</span>
                  <span className="content">{patientData?.contact_number} </span>
                </li>
                <li>
                  <span className="subject"> जन्म मिति </span>
                  <span>:</span>
                  <span className="content">{patientData?.date_of_birth}</span>
                </li>
                <li>
                  <span className="subject"> रक्त समूह</span>
                  <span>:</span>
                  <span className="content">{patientData?.blood_group}</span>
                </li>
                <li>
                  <span className="subject"> पूरा ठेगाना </span>
                  <span>:</span>
                  <span className="content">
                    {capitalize(patientData?.municipality)}, {patientData?.ward_no} {capitalize(patientData?.district)}{' '}
                    {''}
                  </span>
                </li>
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* <div className="QR-image"> */}
              <div dangerouslySetInnerHTML={{ __html: patientData?.qrCode }} />
              {/* {} */}
              {/* <QRCode
                value={`${process.env.NEXT_PUBLIC_PATIENT_URL}/patient/${patientData?.uuid}`}
                style={{ height: '60px !important', textAlign: 'center' }}
                size={200}
                bordered={false}
              /> */}
              {/* </div> */}
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
                        The Palika Health Card is the property of the cardholder. It is the cardholders responsibility
                        to safeguard the card and ensure its appropriate use.
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
                        Users are expected to uphold the confidentiality of their health data accessed through the
                        Palika Health Card. Sharing login credentials or health information with unauthorized
                        individuals is a violation of these terms.
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
                  <li>
                    <span className="subject"> Citizenship Number </span>
                    <span>:</span>
                    <span className="content">{patientData?.citizenship_no}</span>
                  </li>
                  <li>
                    <span className="subject"> NID Number </span>
                    <span>:</span>
                    <span className="content">{patientData?.nid_no}</span>
                  </li>
                  <li>
                    <span className="subject"> Insurance Number </span>
                    <span>:</span>
                    <span className="content">{patientData?.insurance_no}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdCardPrint;
