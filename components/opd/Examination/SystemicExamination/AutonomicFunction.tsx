import { Card, Col, Form, Radio, Row } from 'antd'
import { YesNoOption } from 'constants/schema'
import React from 'react'

const AutonomicFunction = () => {
  return (
    <Card title="Autonomic Funtion" size="small" className="autonomic-function">
    <Row>
      <Col span={6}>
        <Card title="Postural Hypertension" size="small">
          <Form.Item name="postural_hypertension" label="">
            <Radio.Group options={YesNoOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Abnormal Sweating" size="small">
          <Form.Item name="abnormal_sweating" label="">
            <Radio.Group options={YesNoOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Nocturnal Diarrhoea" size="small">
          <Form.Item name="nocturnal_diarrhoea" label="">
            <Radio.Group options={YesNoOption} />
          </Form.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Hornor Syndrome" size="small">
          <Form.Item name="hornor_syndrome" label="">
            <Radio.Group options={YesNoOption} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  </Card>
  )
}

export default AutonomicFunction