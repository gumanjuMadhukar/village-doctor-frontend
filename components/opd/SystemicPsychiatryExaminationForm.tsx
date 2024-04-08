import { Card, Checkbox, Col, Form, Radio, Row, Select } from 'antd'
import { AppearanceOption, BehaviourOption, CommonResponseSelectOption, EmotionalStateOption } from 'constants/schema'
import React from 'react'
import { NeuroFormDesign } from 'styles/styled/OPD'

const PsychiatryForm = () => {
  return (
   <NeuroFormDesign>
    <Col span={24} className="neuro-form">
        <Card title="Higher Function" className="higher-function" size="small">
          <Row>
            <Col span={3}>
              <Card title="Appearance" size="small">
                <Form.Item name="appearance" label="">
                  <Select defaultValue="" style={{ width: 180 }} allowClear options={AppearanceOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Behaviour" size="small">
                <Form.Item name="behaviour" label="">
                  <Select
                    mode="multiple"
                    // tagRender={tagRender}
                    // style={{ width: 220 }}
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
            <Col span={8}>
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
      </Col>
   </NeuroFormDesign>
  )
}

export default PsychiatryForm