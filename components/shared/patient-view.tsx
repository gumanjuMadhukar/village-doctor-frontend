import { Card, Collapse } from "antd";
import { getPatientById } from "apis/admin/patient";
import MedicalRecordView from "components/medical-record";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const PatientView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: data } = useQuery(["patient", id], getPatientById, {
    enabled: !!id,
  });
  const { Panel } = Collapse;
  const reversedRecords = data ? data.medical_records.slice().reverse() : [];
  
  return (
    <>
      {data?.medical_record?.length() === 0 ? (
        <Card>
          <h1>No record Found</h1>
        </Card>
      ) : (
        <Collapse defaultActiveKey={["0"]}>
          {reversedRecords.map((record: any, index: any) => {
            var recordDate = record.record_date;
            const chief_complaint = record.complain;
            console.log(chief_complaint, "patient-record");
            const Complaints = chief_complaint?.map((item: any) => {
              var complaintName = item.complaint.name;
              console.log(complaintName, "comp-name");
              return <label key={index}>{item?.complaint.name} </label>;
            });
            return (
              <Panel
                key={index}
                header={
                  <>
                    <span>
                      <strong>Date:</strong> {recordDate}
                    </span>{" "}
                    <span>
                      <strong>Chief Complaint:</strong> {Complaints}
                    </span>
                  </>
                }
              >
                <MedicalRecordView medicalRecord={record} />
              </Panel>
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default PatientView;
