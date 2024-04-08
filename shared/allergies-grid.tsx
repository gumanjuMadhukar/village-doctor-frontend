import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Colors from 'utils/colors';

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

const AllergiesGrid = (data: any) => {
  return (
    <DetailWrapper>
      <DetailTitleWrapper>
        <DetailTitle>Allergies Information</DetailTitle>
      </DetailTitleWrapper>
      <DetailItem>
        {data?.data?.allergies &&
          data?.data?.allergies?.map((allergies: any) => (
            <>
              <DetailLabel xs={10}>{allergies?.allergen_name}</DetailLabel>
              <DetailValue xs={14} style={{ textTransform: 'capitalize' }}>
                {allergies?.reaction}
              </DetailValue>
            </>
          ))}
      </DetailItem>
    </DetailWrapper>
  );
};

export default AllergiesGrid;
