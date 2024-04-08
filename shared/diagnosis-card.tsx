import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const TestReportWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: white;
  background: rgba(228, 241, 254, 0.5);
  justify-content: center;
  margin: 5px;
  border: 1px solid rgb(82, 179, 217);
  padding: 10px;
  text-align: center;
`;

export const TextWrapper = styled.p``;

export const Heading = styled.div`
  font-size: 18px;
  text-decoration: underline;
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: 18px;
`;

export const DateText = styled.span`
  color: #aaaaaa;
`;

const DiagnosisCard: React.FC = () => {
  return (
    <TestReportWrapper>
      <TextWrapper>
        <Heading>CT Scan - XYZ</Heading>
        <DateText>21th December 2020 </DateText>
        <Text>A full report to this will be seen in the model</Text>
        <Button>View More</Button>
      </TextWrapper>
    </TestReportWrapper>
  );
};

export default DiagnosisCard;
