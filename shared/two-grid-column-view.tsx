import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';
import { DateFormatYMD } from 'utils/DateFormat';
import { capitalize } from 'utils/helpers';

export const DetailItem = styled(Row)`
  width: 100%;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DetailLabel = styled(Col)`
  margin-bottom: 10px;
  color: ${Colors.LIGHT_TEXT_COLOR};
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DetailValue = styled(Col)`
  font-weight: bold;
`;

export const DetailWrapper = styled.div`
  background: #fff;
  margin-bottom: 25px;
  margin-top: 15px;
  padding: 10px;

  @media (max-width: 988px) {
    margin-left: 0px;
    padding: 10px;
    overflow: scroll;
  }
`;

export const DetailTitleWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  column-gap: 10px;
`;

export const DetailTitle = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: 700;
  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 600;
  }
`;

const TwoGridColumnView = (data: any) => {
  return (
    <DetailWrapper>
      <DetailTitleWrapper>
        <DetailTitle>Basic Information</DetailTitle>
      </DetailTitleWrapper>
      <DetailItem>
        <DetailLabel xs={10}>Patient Number:</DetailLabel>
        <DetailValue xs={14} style={{ textTransform: 'capitalize' }}>
          {data?.data?.id}
        </DetailValue>
        <DetailLabel xs={10}>Name:</DetailLabel>
        <DetailValue xs={14} style={{ textTransform: 'capitalize' }}>
          {data?.data?.first_name} {data?.data?.last_name}
        </DetailValue>
        <DetailLabel xs={10}>Date of Birth:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.date_of_birth}</DetailValue>
        <DetailLabel xs={10}>Contact Number:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.contact_number}</DetailValue>
        <DetailLabel xs={10}>Email:</DetailLabel>
        <DetailValue xs={14} style={{ color: Colors.PRIMARY }}>
          {data?.data?.email}
        </DetailValue>
        <DetailLabel xs={10}>Gender:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.gender}</DetailValue>
        <DetailLabel xs={10}>Insurance No:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.insurance_no}</DetailValue>
        <DetailLabel xs={10}>Citizenship No:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.citizenship_no}</DetailValue>
        <DetailLabel xs={10}>NID No:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.nid_no}</DetailValue>
        <DetailLabel xs={10}>Blood Group:</DetailLabel>
        <DetailValue xs={14}>{data?.data?.blood_group}</DetailValue>
        <DetailLabel xs={10}>Registration:</DetailLabel>
        <DetailValue xs={14}>{DateFormatYMD(data?.data?.created_at)}</DetailValue>
        <DetailLabel xs={10}>Address:</DetailLabel>
        <DetailValue xs={14}>
          {capitalize(data?.data?.province)} {capitalize(data?.data?.district)} {capitalize(data?.data?.municipality)}{' '}
          {data?.data?.ward} {data?.data?.address}
        </DetailValue>
      </DetailItem>
    </DetailWrapper>
  );
};

export default TwoGridColumnView;
