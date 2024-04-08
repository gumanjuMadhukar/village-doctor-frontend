import { Col} from 'antd';
import styled from 'styled-components';
import Colors from 'utils/colors';


export const  CompanyDescriptionContainer = styled(Col)`
  background-color: ${Colors.PRIMARY};
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  padding-bottom:10px;
  justify-content:space-between;
  .welcome-section{
    color:#fff;
    font-size:16px;
    h1{
      max-width:300px;
      letter-spacing:3px;
      span{
        margin-top:20px;
        color:#ffd400;
        font-weight:600;
      }
    }
    p{
      font-size:12px;
      letter-spacing:2px;
    }
  }
  
  .right-content{
    color:#fff;
    font-size:22px;
    h2{
      span{
        color:#ffd400;
      }
    }
  }

`;

export const AuthBlock = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding:20px;
  background-color: ${Colors.WHITE};
  position: relative;
  .login-form {
    padding:30px;
    border-radius:8px;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.5)
  }
`;
export const AuthBlockBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
  .ant-image{
    height:230px;
    img{
      width:100%;
      height:100%;
      object-fit:contain;
      object-position:center;
    }

  }
`;
export const LoginImageContainer = styled.div`

  width: 100px;
  height: 80px;
  border-radius: 5px;
  padding: 10px 10px 0 10px;
  box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -webkit-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -moz-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -o-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
  -ms-box-shadow: -5px 5px 8px 0px rgba(133, 132, 132, 0.46);
`;

export const LoginImagePartner = styled.div`
  background-color: #fff;
  width: 100px;
  height: 80px;
  border-radius: 5px;
  padding: 10px 10px 0 10px;
`;

export const CompanyProfile = styled.div`
  font-size: 16px;
  letter-spacing:1px;
  font-weight: 500;
  color: ${Colors.WHITE};
`;

export const FlexHorizontal = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  width:100%;
  .slick-slider {
    width:100%;
    .slick-track {
      .ant-image {
        height:110px;
        padding:10px;
        img{
          height:100%;
          width:100%;
          object-fit:contain;
        }
      }
    }
  }
`;
export const Services = styled.div`

`;
