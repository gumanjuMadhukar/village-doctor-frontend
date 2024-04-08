import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { addVitals } from "apis/admin/vitals";
import { Vitals } from "constants/schema";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import Colors from "utils/colors";
import { getUserName } from "utils/helpers";

interface Props {
  handleCancel: () => void;
  isModalOpen: boolean;
  recordId?: string | number;
}

const CustomizedButtonGroup = styled.div`
  float: right;
  margin-top: 10px;
  right: 0;
`;

export const FormItemAdd = styled(Button)`
  font-size: 14px;
  color: ${Colors.LIGHT_BLUE};
  border: 0;
  padding-left: 0;
`;

export const FormItemDelete = styled(Button)`
  border: 0;
  box-shadow: unset;
  padding-left: 5px;
  color: ${Colors.DANGER};
  &:hover {
    color: ${Colors.DANGER} !important;
  }
`;

export const FieldItemWrapper = styled.div``;

export const FormSpace = styled(Space)`
  &.space0 {
    .ant-space-item {
      &:last-child {
        display: flex;
        align-items: center;
      }
    }
  }
`;

const AddVitalModal = ({ isModalOpen, handleCancel, recordId }: Props) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string | undefined>("");

  useEffect(() => {
    setName(getUserName())
  }, [])
  
  const createVitalsMutation = useMutation(addVitals, {
    onSuccess: () => {
      form.resetFields();
      handleCancel();
      queryClient.invalidateQueries("vitalList");
      message.success("Vitals has been added successfully");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });

  const onFinish = (data: any) => {
    console.log(data?.vitals, "vdata");
    let pulseValue = "";
      let tempValue = "";
      let bpValue = "";
      let saturation = "";
      let respiration = "";
    data.vitals.forEach((vital: any) => {
      // Extract name and measurement from each vital object
      const { name, measurement } = vital;
      if (name === "pulse") {
        pulseValue = measurement;
      } else if (name === "temperature") {
        tempValue = measurement;
      } else if (name === "blood_pressure") {
        bpValue = measurement;
      } else if (name === "saturation") {
        saturation = measurement;
      } else if (name === "respiration") {
        respiration = measurement;
      }
    });
    const formData = {
      medical_record_id: recordId,
      pulse: pulseValue ? pulseValue : "-" ,
      temperature: tempValue ? tempValue : "-",
      respiration:respiration ? respiration :"-",
      saturation:saturation ? saturation : "-",
      blood_pressure: bpValue ? bpValue: "-",
      date_of_measurement: dayjs().format("YYYY-MM-DD"),
      created_by:name? name : "-"
    };
    console.log(formData, "vFormdata");
    createVitalsMutation.mutate(formData);
  };
  return (
    <Modal
      title="Add Vitals"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        preserve={false}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col md={24}>
            <Form.List name="vitals" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                console.log(fields),
                (
                  <>
                    {fields.map((field, i) => {
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <FieldItemWrapper
                          style={{ position: "relative" }}
                          key={i}
                        >
                          <FormSpace
                            key={field.key}
                            align="baseline"
                            className={`space${i}`}
                          >
                            <Row>
                              <Col md={12} className="gutter-row">
                                <Form.Item
                                  label={i === 0 && "TPRB"}
                                  name={[field.name, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Name",
                                    },
                                  ]}
                                  hasFeedback
                                >
                                  <Select
                                    placeholder="Select Vitals"
                                    options={Vitals}
                                  />
                                </Form.Item>
                              </Col>
                              <Col
                                md={9}
                                style={{
                                  marginLeft: "15px",
                                  marginRight: "15px",
                                }}
                              >
                                <Form.Item
                                  label={i === 0 && "Measurement"}
                                  name={[field.name, "measurement"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Measurement",
                                    },
                                  ]}
                                  hasFeedback
                                >
                                  <Input />
                                </Form.Item>
                              </Col>

                              <Col md={1}>
                                {i !== 0 && (
                                  <FormItemDelete
                                    onClick={() => {
                                      // removeAddition(i);
                                      remove(field.name);
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </FormItemDelete>
                                )}
                              </Col>
                            </Row>
                          </FormSpace>
                        </FieldItemWrapper>
                      );
                    })}
                    <Form.Item>
                      <FormItemAdd
                        onClick={() => add()}
                        icon={<PlusCircleFilled />}
                      >
                        Add
                      </FormItemAdd>
                    </Form.Item>
                  </>
                )
              )}
            </Form.List>
          </Col>
          <Col xs={24}>
            <CustomizedButtonGroup>
              <Button size="large" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: Colors.PRIMARY,
                  color: "#fff",
                  marginLeft: "10px",
                }}
                size="large"
                htmlType="submit"
              >
                Add
              </Button>
            </CustomizedButtonGroup>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddVitalModal;
