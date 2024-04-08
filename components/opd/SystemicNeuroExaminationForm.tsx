import type { SelectProps } from 'antd';
import { Card, Checkbox, Col, Form, Input, Radio, Row, Select, Space, Tag } from 'antd';
import {
  AppearanceOption,
  BehaviourOption,
  CommonResponseSelectOption,
  DTRoption,
  EmotionalStateOption,
  EyeMovementCheckOption,
  FundoscopyOption,
  MeningitisSignOption,
  MotorFunctionToneOption,
  MusclesBulkOption,
  PowerRatingOption,
  YesNoOption
} from 'constants/schema';
import React from 'react';
import { NeuroFormDesign } from 'styles/styled/OPD';

type TagRender = SelectProps['tagRender'];


const tagRender: TagRender = props => {
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
      style={{ marginRight: 3, background: 'grey' }}
    >
      {label}
    </Tag>
  );
};

const 
NeuroForm = () => {
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
      </Col>
      <Col span={24}>
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
                      <Form.Item name="Taste sensation in 2/3 of tongue" label="Taste sensation in 2/3 of tongue">
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
                        name="Taste sensation in  posterior 1/3 of tongue"
                        label="Taste sensation in  posterior 1/3 of tongue"
                      >
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="gag_reflex" label="Gag Reflex">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                      <Form.Item name="gag_reflex" label="Palat and Uvula Deviation">
                        <Radio.Group options={CommonResponseSelectOption} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={5}>
                    <Card title="CN XI. Accessory" size="small">
                      <Form.Item
                        name="Shoulder Velevation Against Resistance"
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
      </Col>
      <Col span={24}>
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
      </Col>
      <Col span={24}>
        <Card title="Sensory Function" size="small" className="sensory-function">
          <Row>
            <Col span={8}>
              <Card title="Superficial Sensation" size="small" className="superficial-sensation">
                <Form.Item name="pain" label="Pain">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
                <Form.Item name="touch" label="Touch">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
                <Form.Item name="temperature" label="Temperature">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Deep Sensation" size="small" className="deep-sensation">
                <Form.Item name="Joint Position" label="Joint Position">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
                <Form.Item name="vibration" label="Vibration">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
                <Form.Item name="pressure" label="Pressure">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Cortical Sensation" size="small" className="cortical-sensation">
                <Form.Item name="1_point_localization" label="1 Point Localization">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
                <Form.Item name="2_point_localization" label="2 Point Localization">
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
      </Col>
      <Col span={24}>
        <Card title="Reflex Function" size="small" className="reflex-function">
          <Row style={{ width: '100%' }}>
            <Col span={8}>
              <Card title="Biceps" size="small">
                <Form.Item name="Biceps" label="">
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
                <Form.Item name="triceps" label="">
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
                <Form.Item name="Knee" label="">
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
      </Col>
      <Col span={24}>
        <Card title="Cerebellar Function" size="small" className="cerebellar-function">
          <Row>
            <Col span={8}>
              <Card title="Finger to Nose" size="small">
                <Form.Item name="finger-to-nose" label="">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Alternating Hand Movement" size="small">
                <Form.Item name="alternating_hand_movement" label="">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Heel to Shin Test" size="small">
                <Form.Item name="heel_to_shin_test" label="">
                  <Radio.Group options={CommonResponseSelectOption} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
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
      </Col>
    </NeuroFormDesign>
  );
};

export default NeuroForm;
