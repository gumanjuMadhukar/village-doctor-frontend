import { Modal } from 'antd';
import React from 'react';

import PatientForm from '../AddPatientForm';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

const AddPatientModal = ({ isModalOpen, handleCancel }: Props) => {
  return (
    <Modal
      title="Add Patient"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="60vw"
      className="modal-content-responsive"
    >
      <PatientForm />
    </Modal>
  );
};

export default AddPatientModal;
