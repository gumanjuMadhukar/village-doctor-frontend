import { FileDoneOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const TestReportWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: white;
  align-items: center;
  height: 100px;
`;

export const FileIcon = styled(FileDoneOutlined)`
  position: relative;
  width: 70px;
  bottom: 2rem;
  cursor: pointer;
  background-size: cover;
  top: 0;
  left: 0;
  background-size: cover;
  transition: all 0.2s linear;
  background: rgba(228, 241, 254, 0.5);
  font-size: 50px;
  padding: 10px;
`;

const TextWrapper = styled.p`
  line-height: 0.8;
  padding-left: 15px;
`;
const Text = styled.div`
  font-size: 18px;
`;

const DateText = styled.span`
  color: #aaaaaa;
`;

const TestReportCard = () => {
  return (
    <TestReportWrapper>
      <FileIcon />
      <TextWrapper>
        {' '}
        <Text>CT Scan - XYZ</Text> <br />
        <DateText>21th December 2020 </DateText>
      </TextWrapper>
    </TestReportWrapper>
  );
};

export default TestReportCard;
