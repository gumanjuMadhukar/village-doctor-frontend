import { Modal } from 'antd';
import React from 'react';

import VitalForm from './form';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
}

const VitalModal = ({ isModalOpen, handleCancel }: Props) => {
  return (
    <Modal title="Add Vitals" open={isModalOpen} onCancel={handleCancel} footer={null} width="800px">
      <VitalForm />
    </Modal>
  );
};

export default VitalModal;
