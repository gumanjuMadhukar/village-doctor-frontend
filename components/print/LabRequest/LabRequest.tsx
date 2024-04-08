import React, { forwardRef } from 'react';

type Props = {
  defaultValue?: any;
};

const LabRequest = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { defaultValue } = props;
   const { record_date, patient } = defaultValue;

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
            <h1>
              Lab Test / <span>प्रयोगशाला परीक्षण</span>
            </h1>
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
                <th>S.N</th>
                <th>Test Name</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Urine CS</td>
              </tr>
            </table>
          </section>
          <hr />
          <section className="referred_by">
            <div className="group">
              <p className="title">Referred By.</p>
              <p className="seperator">:</p>
              <p className="content"></p>
            </div>
            <div className="group">
              <p className="title">Authorised Sign</p>
              <p className="seperator">:</p>
              <p className="content"></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});
LabRequest.displayName = 'Lab';

export default LabRequest;
