import { ModalProps } from '@types';
import { Button, Card, Checkbox, Col, Form, message,Modal, Row } from 'antd';
import { createNewLabTest } from 'apis/admin/lab';
import {
  BioChemistryTestOption,
  HematologyTestOption,
  MicrobiologyTestOption,
  PathologyTestOption,
  PhysiometryTestOption,
  RadiologyTestOption
} from 'constants/schema';
import dayjs from 'dayjs';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Colors from 'utils/colors';

const LabRequestFormLayout = styled.div`
  #lab-test-form {
    // >.ant-row{
    //     >.ant-col{
    //         display:grid;
    //         .ant-card{
    //             &:nth-child(4){
    //                 grid-column:4;
    //                 grid-row:1 / span 3;
    //             }
    //         }
    //         .ant-btn{
    //             grid-row:4 / span 4;
    //         }
    //     }
    // }
    > .ant-row {
      > .ant-col {
      }
    }
    .ant-card {
      .ant-card-body {
        .ant-form-item {
            margin-bottom:0;
          .ant-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            .ant-checkbox-wrapper {
              margin-inline-start: 0;
              width: 20%;
            }
          }
        }
      }
    }
  }
`;

const AddLabRequestModal = ({ isModalOpen, handleCancel, medical_record_id }: ModalProps) => {
  const [form] = Form.useForm();

  const createLabTestMutation = useMutation(createNewLabTest, {
    onSuccess: () => {
      message.success('Medical record has been added successfully');
    },
    onError: (response:any) => {
        const errorMessage = response?.response?.data?.message;
      message.error(errorMessage);
    }
  })
  const handleSubmit = (data: any) => {
    const labRequestList = {
        medical_record_id : medical_record_id,
        date:dayjs().format('YYYY-MM-DD'),
        from:'',
        hematology:data.hematology,
        microbiology:data.microbiology,
        pathology:data.pathology,
        bio_chemistry:data.bioChemistry,
        physiometry:data.physiometry,
        radiology:data.radiology
    }
     console.log(labRequestList, "labrequest")
    createLabTestMutation.mutate(labRequestList);

  };
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} width={1080} footer={null}>
      <LabRequestFormLayout>
        <Form
          name="lab-test-form"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          style={{
            padding: '15px 30px'
          }}
        >
          <Row>
            <Col span={24}>
              <Card title="Hematology" size='small'>
                <Form.Item name="hematology">
                  <Checkbox.Group options={HematologyTestOption} />
                </Form.Item>
              </Card>
              <Card title="Microbiology" size='small'>
                <Form.Item name="microbiology">
                  <Checkbox.Group options={MicrobiologyTestOption} />
                </Form.Item>
              </Card>
              <Card title="Pathology" size='small'>
                <Form.Item name="Pathology">
                  <Checkbox.Group options={PathologyTestOption} />
                </Form.Item>
              </Card>
              <Card title="BioChemistry" size='small'>
                <Form.Item name="bioChemistry">
                  <Checkbox.Group options={BioChemistryTestOption} />
                </Form.Item>
              </Card>
              <Card title="Physiometry" size='small'>
                <Form.Item name="physiometry">
                  <Checkbox.Group options={PhysiometryTestOption} />
                </Form.Item>
              </Card>
              <Card title="Radiology" size='small'>
                <Form.Item name="radiology">
                  <Checkbox.Group options={RadiologyTestOption} />
                </Form.Item>
              </Card>
              <Button
                style={{
                  backgroundColor: Colors.PRIMARY,
                  color: '#fff',
                  marginLeft: '10px'
                }}
                size="large"
                htmlType="submit"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </LabRequestFormLayout>
    </Modal>
  );
};

export default AddLabRequestModal;
