import { Card, Checkbox, Col, Form, Radio, Row, Select } from "antd";
import {
  CommonResponseSelectOption,
  InsightsOption,
  MoodAffectOption,
  PerceptionOption,
  ThoughtsContentOption,
} from "constants/schema";
import React from "react";
import { NeuroFormDesign } from "styles/styled/OPD";

import HigherFunction from "./HigherFunction";

const PsychiatryForm = () => {
  return (
    <NeuroFormDesign>
      <Col span={24} className="neuro-form">
        <HigherFunction />
      </Col>
      <Col span={4}>
        <Card title="Talk & Speech" size="small">
          <Form.Item name="talk_speech">
            <Select options={CommonResponseSelectOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Mood & Affect" size="small">
          <Form.Item name="mood_affect">
            <Checkbox.Group options={MoodAffectOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={4}>
        <Card title="Intelligence" size="small">
          <Form.Item name="intelligence">
            <Radio.Group
              options={CommonResponseSelectOption}
              style={{ flexDirection: "row" }}
            />
          </Form.Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Perception" size="small">
          <Form.Item name="perception">
            <Checkbox.Group options={PerceptionOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Thoughts" size="small">
          <Row>
            <Col style={{paddingTop:'5px'}}>
              <Form.Item
                label="Content Of Thoughts"
                name="content_of_thoughts"
                className="pilccod"
              >
                <Checkbox.Group
                  options={ThoughtsContentOption}
                  className="vertical-checkbox"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="flight_of_ideas">
                <Checkbox>Flight Of Ideas</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Insights" size="small">
          <Form.Item name="insights"> 
            <Checkbox.Group
              options={InsightsOption}
              className="vertical-checkbox"
            />
          </Form.Item>
        </Card>
      </Col>
    </NeuroFormDesign>
  );
};

export default PsychiatryForm;
