import { RightCircleOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';

import PatientForm from './AddPatientForm';

type Props = {
  openDrawer: boolean;
  onClose: () => void;
};

function PatientFormDrawer({ openDrawer, onClose }: Props) {

  return (
    <Drawer
      title="Add Patient"
      placement="right"
      onClose={onClose}
      open={openDrawer}
      closeIcon={<RightCircleOutlined />}
      width="1000px"
    >
      <div>
        <PatientForm />
      </div>
    </Drawer>
  );
}

export default PatientFormDrawer;
