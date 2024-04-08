import { Card, Col, Form, Radio, Row, Space } from 'antd'
import { DTRoption } from 'constants/schema'
import React from 'react'


const ReflexFunction = () => {
  return (
    <Card title="Reflex Function" size="small" className="reflex-function">
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Card title="Biceps" size="small">
                <Form.Item name="biceps_reflex" label="">
                  <Radio.Group options={DTRoption}>
                    <Space direction="vertical">
                      {DTRoption.map((option, index) => (
                        <Radio value={option.value} key={index}>
                          {option.label}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Triceps" size="small">
                <Form.Item name="triceps_reflex">
                  <Radio.Group options={DTRoption}>
                    <Space direction="vertical">
                      {DTRoption.map((option, index) => (
                        <Radio value={option.value} key={index}>
                          {option.label}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Knee" size="small">
                <Form.Item name="knee_reflex" label="">
                  <Radio.Group options={DTRoption}>
                    <Space direction="vertical">
                      {DTRoption.map((option, index) => (
                        <Radio value={option.value} key={index}>
                          {option.label}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Card>
  )
}

export default ReflexFunction