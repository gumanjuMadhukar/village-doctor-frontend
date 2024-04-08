import { Button } from 'antd';
import styled from 'styled-components';
import Colors from 'utils/colors';

export const EmployeeContainer = styled.div``;
export const PageHeader = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
export const PageHeaderNaviagtion = styled.div`
  background: #fff;
  padding: 24px;
`;
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const SearchBar = styled.div`
  background: #fff;
  margin: 15px 30px;
  @media (max-width: 762px) {
    overflow-wrap: anywhere;
    height: auto;
  }
`;
export const SearchBarContent = styled.div`
  padding: 16px;
  line-height: 20px;

  // display: grid;
  gap: 20px;
  align-items: center;
  // justify-content: center;
  .ant-col {
    width: 100%;
    .ant-select {
      width: 100%;
    }
  }
`;
export const TableBodyContainer = styled.div`
  padding: 30px;
  padding-top: 0;
  .ant-table-thead{
    >tr {
      >th{
        padding:7px 10px;
      }
    }
  }
  .ant-table-tbody{
    .ant-table-row {
      &:nth-child(odd){
        background-color: rgba(0,0,0,0.1);
      }
      .ant-table-cell {
        padding:7px 10px;
        text-transform:capitalize;
      }
      &:hover{
        .ant-table-cell-row-hover {
         background-color: rgba(0,0,0,0.25);
         cursor:pointer;
        }
       }
    }
  }
`;
export const SettingContent = styled.div`
  // margin-top: 1px;
  min-height: 75vh;
  background: ${Colors.WHITE};
  // padding-left: 15px;
  padding-top: 15px;
`;
export const EmergencyBtn = styled(Button)`
  background: ${Colors.DANGER};
  boxshadow: none;
  color: ${Colors.WHITE};
  border-radius: 50px;
  margin-left: auto;
  &:hover {
    color: ${Colors.DANGER} !important;
    background: ${Colors.WHITE};
    border-color: ${Colors.DANGER} !important;
  }
`;