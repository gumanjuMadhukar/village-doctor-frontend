import { Modal } from "antd";
import React from "react";

interface Props {
    handleCancel: () => void;
    handleSubmit: () => void;

    isModalOpen: boolean;
    recordId?:number;
}
const LabUploadModal = ({handleCancel, isModalOpen ,recordId, handleSubmit }:Props) => {

  return (
    <div>
      <Modal
        title="Upload Lab Report"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
       <h1>{recordId}</h1>
      </Modal>
    </div>
  );
};

export default LabUploadModal;
