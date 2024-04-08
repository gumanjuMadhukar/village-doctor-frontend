import styled from "styled-components";

export const SearchBarContentRedesign = styled.div`
  display: flex;
  flex-wrap: wrap;
  .ant-collapse{
    width:100%;
    .ant-collapse-content{
      form{
        display:flex;
        flex-wrap:wrap;
      }
    }
  }
  .ant-form-item {
    width: 20%;
    padding:5px;
    margin-bottom:0;
    .ant-picker{
      width 100%;
    }
  }
  .action{
    // width:100%;
    padding:5px;
    .ant-form-item-control-input-content{
      display:flex;
      justify-content:space-between;
    }
    button{
      width:49%;
    }
  }
`;
export const SearchBarContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  gap: 10px;
  padding: 16px;
`;


export const SelectDateRange = styled.div`
grid-area: 1 / 3 / auto / span 2;
@media (max-width: 768px) {
  grid-column: span 2;
}
`; 