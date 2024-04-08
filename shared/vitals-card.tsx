import { EyeOutlined } from '@ant-design/icons';
import React from 'react';

interface props {
  vitalData?: any;
}

const VitalCards = ({ vitalData }: props) => {
  return (
    <div className="card widget-flat text-bg-pink" style={{ marginRight: '10px' }}>
      <div className="card-body">
        <div className="float-end">
          <i className="ri-wallet-2-line widget-icon">
            <EyeOutlined />
          </i>
        </div>
        <h6 className="text-uppercase mt-0" title="Customers">
          {vitalData?.name}
        </h6>
        <h2 className="my-2">{vitalData?.measurement || 200}</h2>
      </div>
    </div>
  );
};

export default VitalCards;
