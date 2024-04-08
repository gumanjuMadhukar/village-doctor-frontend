import dayjs from 'dayjs';
import React, { forwardRef } from 'react';

type Props = {
  defaultValue?: any;
};
const OpdMedicinePrint = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { defaultValue } = props;
  const { patient, medication } = defaultValue;
  const record_date = dayjs().format('YYYY-MM-DD');
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref} id="prescription-section">
        <div className="inner">
          <section className="date">
            <div className="group">
              <p className="title">Date</p>
              <p className="seperator">:</p>
              <p className="content">{record_date}</p>
            </div>
          </section>
          <section className="title-section">
            <h1>Opd Medicine Print</h1>
          </section>
          <hr />
          <section className="patient-detail">
            <div className="group">
              <p className="title">Patient ID</p>
              <p className="seperator">:</p>
              <p className="content">{patient?.id}</p>
            </div>
            <div className="group patient-name">
              <p className="title">Name</p>
              <p className="seperator">:</p>
              <p className="content">
                {patient?.first_name} {patient?.middle_name} {patient?.last_name}
              </p>
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
          <section>
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
          </section>
        </div>
      </div>
    </div>
  );
});
OpdMedicinePrint.displayName = 'MedicinePrint';
export default OpdMedicinePrint;
