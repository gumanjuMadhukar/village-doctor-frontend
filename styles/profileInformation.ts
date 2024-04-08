import { Col, Row } from 'antd';
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
  // margin-left: 10px;
`;

export const DetailWrapper = styled.div`
  background: #fff;
  margin-bottom: 25px;
  margin-left: 25px;
  padding: 25px;
  @media (max-width: 988px) {
    margin-left: 0px;
    padding: 10px;
    overflow: scroll;
  }
`;

export const DetailTitle = styled.div`
  font-size: 20px;
  color: #000;
  font-weight: 700;
  @media (max-width: 480px) {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const DetailTitleWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;

export const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
`;

export const AttendanceDetailLabel = styled(Col)`
  background-color: #fafafa;
  width: 100%;
  color: #8c8c8c;
  text-align: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileWrapper = styled(Row)`
  padding: 25px;
`;

export const LeftProfile = styled(Col)`
  background-color: #fff;
  height  90vh;
  position:sticky;
  top:0;
  overflow-Y:scroll;
`;

export const ProfileImage = styled.div`
  width: 170px;
  height: 170px;
  text-align: center;
  position: relative;
  .ant-image {
    width: 100%;
    height: 100%;
    .profile-img {
      width: 100%;
      height: 100%;
      &.img-padding {
        padding: 40px;
      }
      background: ${Colors.LIGHTER_BG};
      border-radius: 50%;
    }
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;
export const StatusRightIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: ${Colors.LIGHT_BG};
  padding: 5px 10px;
  cursor: pointer;
`;

export const StatusTitle = styled.div`
  color: ${Colors.TEXT_COLOR};
  font-weight: 700;
  font-size: 15px;
`;

export const Status = styled.div`
  background: #fff;
  margin-top: 15px;
  padding: 25px;
  position: relative;
  text-align: center;
  &:hover {
    color: ${Colors.PRIMARY};
    border: 1px solid ${Colors.PRIMARY};
    cursor: pointer;

    & ${StatusRightIcon} {
      background: ${Colors.PRIMARY};
      color: ${Colors.WHITE} !important;
    }
    & ${StatusTitle} {
      color: ${Colors.PRIMARY} !important;
    }
  }
`;
