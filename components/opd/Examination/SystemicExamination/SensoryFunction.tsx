import { Card, Col, Form, Radio, Row } from 'antd'
import { CommonResponseSelectOption } from 'constants/schema'
import React from 'react'

const SensoryFunction = () => {
  return (
    <Card title="Sensory Function" size="small" className="sensory-function">
    <Row>
      <Col span={8}>
        <Card title="Superficial Sensation" size="small" className="superficial-sensation">
          <Form.Item name="pain_sensation" label="Pain">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="touch_sensation" label="Touch">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="temperature_sensation" label="Temperature">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Deep Sensation" size="small" className="deep-sensation">
          <Form.Item name="joint_position_sensation" label="Joint Position">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="vibration_sensation" label="Vibration">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="pressure_sensation" label="Pressure">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Cortical Sensation" size="small" className="cortical-sensation">
          <Form.Item name="one_point_localization" label="1 Point Localization">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="two_point_localization" label="2 Point Localization">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="graphesthesia" label="Graphesthesia">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
          <Form.Item name="stereogenosis" label="Stereognosis">
            <Radio.Group options={CommonResponseSelectOption} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  </Card>
  )
}

export default SensoryFunction