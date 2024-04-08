import { Card, Checkbox, Col, Form, Input, Radio, Row, Select } from "antd";
import {
  CharacterOption,
  CommonResponseSelectOption,
  YesNoOption,
} from "constants/schema";
import React from "react";

const PremorbidPersonalityForm = () => {
  const { TextArea } = Input;
  return (
    <Card title="Premorbid Personality" className="" size="small">
      <Row>
        <Col span={4}>
          <Card title="Interpersonal Relation" className="" size="small">
            <Form.Item name="interpersonal_relation">
              <Radio.Group options={YesNoOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Religious Beliefs" className="" size="small">
            <Form.Item name="religious_beliefs">
              <Select options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Attitude" className="" size="small">
            <Form.Item name="attitude">
              <Select options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Hobbies" className="" size="small">
            <Form.Item name="hobbies">
              <TextArea rows={1} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Character" className="d-flex flex-wrap" size="small">
            <Form.Item name="character">
              <Checkbox.Group
                className="pilccod"
                options={CharacterOption}
                style={{ paddingBottom: "8px" }}
              />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PremorbidPersonalityForm;
