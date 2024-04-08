import type { SelectProps } from "antd";
import { Card, Checkbox, Col, Form, Radio, Row, Select, Tag } from "antd";
import { AppearanceOption, BehaviourOption, CommonResponseSelectOption, EmotionalStateOption } from "constants/schema";
import React from "react";

type TagRender = SelectProps["tagRender"];

const HigherFunction = () => {
  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="#0a0a0a"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, background: "grey" }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <Card title="Higher Function" className="higher-function" size="small">
      <Row>
        <Col span={3}>
          <Card title="Appearance" size="small">
            <Form.Item name="appearance" label="">
              <Select
                defaultValue=""
                style={{ width: 180 }}
                allowClear
                options={AppearanceOption}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Behaviour" size="small">
            <Form.Item name="behaviour" label="">
              <Select
                mode="multiple"
                tagRender={tagRender}
                style={{ width: 220 }}
                allowClear
                options={BehaviourOption}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col span={5}>
          <Card title="Emotional State" size="small">
            <Form.Item name="emotional_state" label="">
              <Checkbox.Group options={EmotionalStateOption} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Memory State" size="small" className="memory-state">
            <Form.Item name="immediate_memory" label="Immediate Memory">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
            <Form.Item name="remote_memory" label="Remote Memory">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
            <Form.Item name="past_memory" label="Past Memory">
              <Radio.Group options={CommonResponseSelectOption} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default HigherFunction;
