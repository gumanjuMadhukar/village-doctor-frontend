// import './Prescription.css';

import { Image } from 'antd';
import React, { forwardRef } from 'react';

type Props = {
  defaultValue?: any;
};

const Prescription = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { defaultValue } = props;
  const {
    patient,
    record_date,
    vitals,
    complain,
    medicalRecordDetails,
    patient_history,
    treatment_history,
    examination,
    medication
  } = defaultValue;

  return (
    <div style={{ display: 'none' }}>
      
      <div ref={ref} id="prescription-section">
        <Image src="/" alt="" />
        <div className="inner">
          <section className="date">
            <div className="group">
              <p className="title">Date</p>
              <p className="seperator">:</p>
              <p className="content">{record_date}</p>
            </div>
          </section>
          <section className="title-section">
            <h1>OPD Prescription / <span>ओपिडी प्रिस्क्रिप्शन</span></h1>
          </section>
          <hr />
          <section className="patient-detail">
            <div className="group patient-name">
              <p className="title">Name</p>
              <p className="seperator">:</p>
              <p className="content">
                {patient?.first_name} {patient?.middle_name} {patient?.last_name}
              </p>
            </div>
            <div className="group">
              <p className="title">Patient ID</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.id}</p>
            </div>
            <div className="group">
              <p className="title">Gender</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.gender}</p>
            </div>
            <div className="group">
              <p className="title">Phone</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.contact_number}</p>
            </div>
            <div className="group">
              <p className="title">Date of Birth</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.date_of_birth}</p>
            </div>
            <div className="group">
              <p className="title">HH No.</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.househead_no}</p>
            </div>
          </section>
          <hr />
          <section className="vitals">
            <div className="inner">
              <div className="title">
                <h3>Chief Complaint / <span>मुख्य उजुरी</span></h3>
              </div>
              {complain?.map((data: any) => {
                return (
                  <>
                    {data?.complaint?.name} * {data?.duration} <br />
                  </>
                );
              })}
            </div>
          </section>
          <hr />
          <section className="hopi">
            <div className="inner">
              <div className="title">
                <h3>HOPI / <span>प्रस्तुत रोगको इतिहासकाकारण</span> </h3>
              </div>
              {medicalRecordDetails?.map((data: any) => {
                return (
                  <p key={data?.id}>
                    <strong style={{ fontSize: '10px' }}>{data?.from}</strong>
                    <p>{data?.hopi}</p>
                  </p>
                );
              })}
            </div>
          </section>
          <hr />
          <section className="past-history">
            <div className="title">
              <h3>Past History / <span>विगतको इतिहास</span></h3>
            </div>
            <div className="content">
              <div className="inner">
                {patient_history?.map((data: any, index: number) => {
                  return (
                    <div className="row" key={index}>
                      <table>
                        <tr>
                          <th>Medical History / <span>चिकित्सकिय इतिहास</span></th>
                          <th>Surgical History / <span>सर्जिकल इतिहास</span></th>
                          <th>Family History / <span>पारिवारिक इतिहास</span></th>
                        </tr>
                        <tr key={index}>
                          <td>{data?.medical_history}</td>
                          <td>{data?.surgical_history}</td>
                          <td>
                            {' '}
                            {data?.family_history.map((item: any, index: number) => {
                              return (
                                <React.Fragment key={index}>
                                  {Array.isArray(item) ? (
                                    // If the item is an array (nested questions and answers)
                                    item.map((nestedItem, nestedIndex) => (
                                      <React.Fragment key={nestedIndex}>
                                        {nestedItem?.question} <br /> {nestedItem?.answer} <br />
                                      </React.Fragment>
                                    ))
                                  ) : (
                                    <div>
                                      {item?.family_relavant_history} <br />
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </td>
                        </tr>
                      </table>
                      {/* <div className="col-6">
                        <h3>Medical History</h3>
                        {data?.medical_history}
                      </div>
                      <div className="col-6">
                        <h3>Surgical History</h3>
                        {data?.surgical_history}
                      </div>
                      <div className="col-6">
                        <h3>Family History</h3>
                        {data?.family_history.map((item: any, index: number) => {
                          return (
                            <React.Fragment key={index}>
                              {Array.isArray(item) ? (
                                // If the item is an array (nested questions and answers)
                                item.map((nestedItem, nestedIndex) => (
                                  <React.Fragment key={nestedIndex}>
                                    {nestedItem?.question} <br /> {nestedItem?.answer} <br />
                                  </React.Fragment>
                                ))
                              ) : (
                                <div>
                                  {item?.family_relavant_history} <br />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <hr />
          <section className="physical">
            <div className="title">
              <h3>Treatment History / <span>उपचारको इतिहास</span></h3>
            </div>
            <div className="content">
              <div className="inner">{treatment_history}</div>
            </div>
          </section>
          <hr />
          <section className="diagnosis">
            <div className="title">
              <h3>Examination / <span>परीक्षण</span></h3>
            </div>
            <div className="content">
              <div className="inner">
                {examination?.map((data: any, index: number) => {
                  return (
                    <div className="row" key={index}>
                      <table>
                        <tr>
                          <th>Auscultation / <span>अस्कल्टेशन</span></th>
                          <th>Inspection / <span>निरीक्षण</span></th>
                          <th>Percussion / <span>पर्कशन</span></th>
                          <th>Palpation / <span>पल्पेशन</span></th>
                        </tr>
                        <tr key={index}>
                          <td>{data?.auscultation}</td>
                          <td>{data?.inspection}</td>
                          <td>{data?.percussion}</td>
                          <td>{data?.palpation}</td>
                        </tr>
                      </table>
                      {/* <div className="col-6">
                        <section className="vitals">
                          <div className="inner">
                            <div className="title">
                              <h3>Auscultation</h3>
                            </div>
                            <div className="content">
                              <div className="inner">{data?.auscultation}</div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div className="col-6">
                        <section className="vitals">
                          <div className="inner">
                            <div className="title">
                              <h3>Inspection</h3>
                              <div className="content">
                                <div className="inner">{data?.inspection}</div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <br />
                      <div className="col-6">
                        <section className="vitals">
                          <div className="inner">
                            <div className="title">
                              <h3>cussion</h3>
                              <div className="content">
                                <div className="inner">{data?.percussion}</div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div className="col-6">
                        <section className="vitals vitsl">
                          <div className="inner">
                            <div className="title">
                              <h3>Palpation</h3>
                              <div className="content">
                                <div className="inner">{data?.palpation}</div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div> */}
                    </div>
                  );
                })}
                <section className="vitals">
                  <div className="inner">
                    <div className="title">
                      <h3>Vitals / <span>भाइटल्स</span></h3>
                    </div>
                    <table>
                      <tr>
                        <th>Date / <span>मिति</span></th>
                        <th>Blood Pressure / <span>रक्तचाप</span></th>
                        <th>Pulse / <span>पल्स</span></th>
                        <th>Respiration / <span>श्वासप्रश्वास</span></th>
                        <th>Saturation / <span>स्याचुरेसन</span></th>
                        <th>Temperature / <span>तापक्रम</span></th>
                      </tr>
                      {vitals &&
                        vitals?.map((data: any, index: number) => {
                          const createdAt = new Date(data.created_at);
                          // Format date and time=(5. indec|:a4rmot))
                          const formattedDateTime = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

                          return (
                            <tr key={index}>
                              <td>{formattedDateTime}</td>
                              <td>{data?.blood_pressure}</td>
                              <td>{data?.pulse}</td>
                              <td>{data?.respiration}</td>
                              <td>{data?.saturation}</td>
                              <td>{data?.temperature}</td>
                            </tr>
                          );
                        })}
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </section>
          <hr />
          <section
            className="medicine-section"
            id="page-two"
            style={{ pageBreakBefore: 'always', background: 'white' }}
          >
            <div className="title">
              <h3>Prescription</h3>
            </div>
            <div className="content">
              <table>
                <tr>
                  <th>Medicine Name</th>
                  <th>Dose</th>
                  <th>Timing</th>
                  <th>Times per day</th>
                  <th>Form</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Notes</th>
                </tr>
                {medication?.map((data: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{data?.medication_name}</td>
                      <td>{data?.dosage}</td>
                      <td>{data?.timing}</td>
                      <td>{data?.quantity} per day</td>
                      <td>{data?.form}</td>
                      <td>{data?.from}</td>
                      <td>{data?.to}</td>
                      <td>{data?.notes}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </section>
          <section className="footer">
            <div className="inner">
              <div className="signature">
                <div className="img-container">
                  <img src="/img/dummysignature.png" alt="" />
                </div>
                <div className="signature-field">
                  <p>Dr. Suraj Bista</p>
                  <p>MBBS</p>
                </div>
              </div>
              <div className="signature">
                <div className="img-container">
                  <img src="/img/dummysignature.png" alt="" />
                </div>
                <div className="signature-field">
                  <p>Examiner Name</p>
                  <p>Examiner</p>
                </div>
              </div>
              <div className="signature">
                <div className="img-container">
                  
                </div>
                <div className="signature-field">
                  <p>Test Incharge Name</p>
                  <p>Health Incharge</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});
Prescription.displayName = 'Prescription';
export default Prescription;
