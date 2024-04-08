import { Card, Col, Form, Radio, Row } from "antd";
import { CommonResponseSelectOption } from "constants/schema";
import React from "react";

const CerebellarFunction = () => {
  return (
    <Card
      title="Cerebellar Function"
      size="small"
      className="cerebellar-function"
    >
      <Row>
        <Col span={8}>
          <Card title="Finger to Nose" size="small">
            <Form.Item name="cereberral_finger_to_nose" label="">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Alternating Hand Movement" size="small">
            <Form.Item name="cereberral_alternating_hand_movement" label="">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Heel to Shin Test" size="small">
            <Form.Item name="cereberral_heel_to_shin_test" label="">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CerebellarFunction;
