import { Modal } from 'antd';
import React from 'react';

import HistoryForm from './form';

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  defaultValue?: any;
  form: any;
}

const HistoryModal = ({ handleCancel, isModalOpen, defaultValue, form }: Props) => {
  return (
    <Modal
      title="Add Medical History"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="800px"
      bodyStyle={{ overflowX: 'scroll' }}
    >
      <HistoryForm defaultValue={defaultValue} form={form} />
    </Modal>
  );
};

export default HistoryModal;
