import { Checkbox, Modal } from "antd";
import LabTestUpload from "components/shared/LabTestUpload";
import React from "react";

interface Props {
  handleCancel: () => void;
  handleSubmit: () => void;

  isModalOpen: boolean;
  recordId?: number;
}
const LabUploadModal = ({
  handleCancel,
  isModalOpen,
  recordId,
  handleSubmit,
}: Props) => {
  const headerContent = (
    <div>
      <span>Upload Lab Report</span>
      <span>Medical Record Id : {recordId}</span>
      <span>Patient Id : {recordId}</span>
    </div>
  );
  const labTestOption = [
    { label: "Test 1", value: "Test 1" },
    { label: "Test 2", value: "Test 2" },
    { label: "Test 3", value: "Test 3" },
  ];

  const LabTestOption = labTestOption.map((itemName, index) => {
    console.log(itemName,"bsdj")
    return(
    <Checkbox key={index}>{itemName.label} </Checkbox>)
  });
  return (
    <div>
      <Modal
        title={headerContent}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
      <div style={{display:'flex', flexDirection:"column", marginBottom:'30px'}}>
        {LabTestOption}
      </div>
      <div>
        <LabTestUpload/>
      </div>
      </Modal>
    </div>
  );
};

export default LabUploadModal;
