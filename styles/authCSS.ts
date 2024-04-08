import styled from 'styled-components';

export const CompanyInfo = styled.div`
  height:100vh;
  overflow:hidden;

`;
export const LoginPage = styled.div`
  display:flex;
  height  90%;
`;

export const CompanySlider = styled.div`

`;

export const PageLogo = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const LoginContainer = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 50%;
  transform: translate(10%, -50%);
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  width: 30% !important;
  height: 70vh;
  text-align: center;
  h1 {
    color: #34495e;
    font-size: 70px;
  }
  @media (max-width: 1080px) {
    width: 35% !important;
  }
  @media (max-width: 992px) {
    display: flex;
    width: 920px;
  }
  @media (max-width: 767px) {
    display: flex;
    width: 720px;
    transform: translate(48%, -50%);
    width: 50% !important;
  }
  @media (max-width: 650px) {
    width: 80% !important;
    transform: translate(0%, -50%);
  }
`;
export const CarouselDiv = styled.div`
  width: 100%;
  height: 150px;
`;
export const VerticalDividerLine = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 70px 0;
  border-inline-start: 1px solid #f0f0f0;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 30px;
`;
export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  color:rgba(255,2255,255,0.7);
  border-top:1px solid;
  padding-top:10px;
`;

export const LoginImageBlock = styled.div`
  width: 50%;
  padding: 15%;
  @media (max-width: 767px) {
    display: none;
  }
  @media (max-width: 992px) {
    padding: 15% 10%;
  }
`;

export const PageHeaderWrapper = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;
