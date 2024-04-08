import { Row } from "antd";
import styled from "styled-components";

export const NeuroFormDesign = styled(Row)`
  .ant-form-item-label {
    font-weight: 500;
    padding-bottom: 0;
  }
  .ant-radio-group {
    display: flex;
    flex-direction: column;
  }
  .higher-function,
  .cranial-nerve-spine {
    > .ant-card-body {
      > .ant-row {
        > .ant-col {
          .ant-card-body {
            min-height: 95px;
          }
        }
      }
    }
    .memory-state {
      .ant-card-body {
        display: flex;
        .ant-form-item:not(:first-child) {
          padding-left: 15px;
        }
        // .ant-form-item:not(:last-child) {
        //   border-right: 1px solid #fff;
        // }
      }
    }
  }
  .higher-function {
    background-color: #fff;
    .memory-state {
      .ant-card-body {
        display: flex;
        .ant-form-item-row {
          display: flex;
          .ant-col {
            width: initial;
          }
        }
      }
    }
  }
  .cranial-nerve-spine {
    .cranial-nerves {
      .ant-checkbox-group {
        flex-direction: column;
        label {
          margin-left: 0;
        }
      }
      .ant-col {
        .ant-card-body {
          display: flex;
          .ant-form-item:not(:first-child) {
            padding-left: 15px;
          }
        }
      }
    }
  }
  .motor-function {
    .tone-power {
      > .ant-card-body {
        display: flex;
        flex-wrap: wrap;
        .ant-form-item {
          width: 50%;
          &:nth-child(odd) {
            padding-right: 5px;
          }
          &:nth-child(even) {
            padding-left: 5px;
          }
        }
      }
    }
  }
  .sensory-function {
    .superficial-sensation,
    .deep-sensation,
    .cortical-sensation {
      > .ant-card-body {
        display: flex;
        .ant-form-item:not(:first-child) {
          padding-left: 15px;
        }
      }
    }
  }
`;