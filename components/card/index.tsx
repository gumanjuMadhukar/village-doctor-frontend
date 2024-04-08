// pages/my-chart.tsx

import { Image, QRCode } from 'antd';
import React, { useEffect } from 'react';

const IdCardPrint = () => {
  useEffect(() => {
    window.print();
  });
  return (
    <div className="id-card">
      <div className="id-card-header">Registration Card</div>
      <div className="id-card-image">
        <Image alt="avatar" src={'/images/default_profile_picture.jpeg'} preview={false} />
        <br />
      </div>
      <div className="id-card-title">Abhishek Thapa</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <QRCode value="https://aeirc.tech/" style={{ height: '50px !important' }} size={100} bordered={false} />
        <div style={{ paddingLeft: '20px' }}>
          Initial Registration <br />
          10 Feb 1998 <br /> <br />
          Validity : Unlimited
        </div>
      </div>
      <div className="id-card-footer">Your Card Message Goes Here</div>
    </div>
  );
};

export default IdCardPrint;
