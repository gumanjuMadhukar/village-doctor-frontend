import { Card, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import {
    CommonResponseSelectOption,
    EyeMovementCheckOption,
    FundoscopyOption,
    MeningitisSignOption,
  } from 'constants/schema';
import React from 'react'

const CranialNerveSpine = () => {
  return (
    <Card title="Cranial Nerve and Spine" size="small" className="cranial-nerve-spine">
          <Row>
            <Col span={24}>
              <Card title="Sign of Meningitis" size="small">
                <Form.Item name="sign_of_meningitis" label="">
                  <Checkbox.Group options={MeningitisSignOption}></Checkbox.Group>
                </Form.Item>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Cranial Nerves" size="small" className="cranial-nerves">
                <Row>
                  <Col span={3}>
                    <Card title="CN-I. Ol Factory(Smell)" size="small">
                      <Form.Item name="ol_factory" label="">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card title="CN-II. Optic (Vision)" size="small">
                      <Form.Item name="visual_acuity" label="Visual Acuity">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="field" label="Field">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="color_vision" label="Color Vision">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="fundoscopy" label="Fundoscopy">
                        <Radio.Group options={FundoscopyOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card title="CN (III, IV, VI)" size="small">
                      <Form.Item name="eye_movement" label="">
                        <Checkbox.Group options={EyeMovementCheckOption}></Checkbox.Group>
                      </Form.Item>
                      <Form.Item name="eye-movement" label="Eye Movement">
                        <Radio.Group options={FundoscopyOption} />
                      </Form.Item>
                      <Form.Item name="light-reflex" label="Light Reflex">
                        <Radio.Group options={FundoscopyOption} />
                      </Form.Item>
                      <Form.Item name="pupil_size" label="Pupil Size (mm)">
                        <Input />
                      </Form.Item>
                    </Card>
                  </Col>
                  {/* <Col>
                  <Form.Item name="ol_factory" label="Ol Factory">
                    <Radio.Group options={CommonResponseSelectOption} />
                  </Form.Item>
                </Col> */}
                  <Col span={7}>
                    <Card title="CN V. Trigeminal Nerve" size="small">
                      <Form.Item name="sensation_overFace" label="Sensation Overface">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="chewing" label="Chewing">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="jaw_reflex" label="Jaw Reflex">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="corneal_reflex" label="Corneal Reflex">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={15}>
                    <Card title="CN VII. Facial Nerve" size="small">
                      <Form.Item name="taste_sensation_in_2_3rd_of_tongue" label="Taste sensation in 2/3 of tongue">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="facial_drooping" label="Facial Drooping">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="smiling" label="Smiling">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="frowninng_and_blowing" label="Frowning & Blowwing">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="upper_half_of_face" label="Upper Half of Face Sensation">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={9}>
                    <Card title="CN VIII. Vestigular Cochlear" size="small">
                      <Form.Item name="hearing" label="Hearing">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="webers_test" label="Weber's Test">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="rinnis_test" label="Rinni's Test">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="balance" label="Balance">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={15}>
                    <Card title="CN (IX, X)" size="small">
                      <Form.Item
                        name="taste_sensation_in_posterior_1_3rd_of_tongue"
                        label="Taste sensation in  posterior 1/3 of tongue"
                      >
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="gag_reflex" label="Gag Reflex">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="palat_uvula_deviation" label="Palat and Uvula Deviation">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card title="CN XI. Accessory" size="small">
                      <Form.Item
                        name="shoulder_velvation_against_resistance"
                        label="Shoulder Velevation Against Resistance"
                      >
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={4}>
                    <Card title="CN XII. Hypoglossal" size="small">
                      <Form.Item name="tongue_deviation" label="">
                        <Checkbox> Tongue Deviation</Checkbox>
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
  )
}

export default CranialNerveSpine