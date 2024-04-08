import { Card, Col, Form, Row, Select } from 'antd'
import { MotorFunctionToneOption, MusclesBulkOption, PowerRatingOption } from 'constants/schema'
import React from 'react'

const MotorFunction = () => {
  return (
    <Card title="Motor Function" size="small" className="motor-function">
          <Row>
            <Col span={4}>
              <Card title="Bulk of Muscle" size="small">
                <Form.Item name="bulk_of_muscle" label="">
                  <Select allowClear options={MusclesBulkOption}></Select>
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Tone" className="tone-power" size="small">
                <Form.Item name="left_upper_limb_tone" label="Left Upper Limb Tone">
                  <Select allowClear options={MotorFunctionToneOption}></Select>
                </Form.Item>
                <Form.Item name="right_upper_limb_tone" label="Right Upper Limb Tone">
                  <Select allowClear options={MotorFunctionToneOption}></Select>
                </Form.Item>
                <Form.Item name="left_lower_limb_tone" label="Left Lower Limb Tone">
                  <Select allowClear options={MotorFunctionToneOption}></Select>
                </Form.Item>
                <Form.Item name="right_lower_limb_tone" label="Right Lower Limb Tone">
                  <Select allowClear options={MotorFunctionToneOption}></Select>
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Power" className="tone-power" size="small">
                <Form.Item name="left_upper_limb_power" label="Left Upper Limb Power">
                  <Select allowClear options={PowerRatingOption}></Select>
                </Form.Item>
                <Form.Item name="right_upper_limb_power" label="Right Upper Limb Power">
                  <Select allowClear options={PowerRatingOption}></Select>
                </Form.Item>
                <Form.Item name="left_lower_limb_power" label="Left Lower Limb Power">
                  <Select allowClear options={PowerRatingOption}></Select>
                </Form.Item>
                <Form.Item name="right_lower_limb_power" label="Right Lower Limb Power">
                  <Select allowClear options={PowerRatingOption}></Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Card>
  )
}

export default MotorFunction