import { Card, Col, Row } from 'antd'
import React from 'react'

import BMICalculateForm from '../BMICalculateForm'
import PILCCODForm from '../PILCCODForm'
import VitalsOPDForm from '../VitalsForm'
import GeneralAppearanceForm from './GeneralAppearanceForm'
import SystemicExaminationForm from './SystemicExamination'

const Examination = (props:any) => {
  console.log(props);
  const dob = props?.props.dob;
  const isNeuroPatient = props?.props?.isNeuroPatient;
  const isPsychiatryPatient = props?.props.isPsychiatryPatient;

  console.log(dob,'Exami')
  return (
    <Card title="Examination / परीक्षण" className="mt-10" size="small">
    <Row>
      <Col span={24}>
        <GeneralAppearanceForm />
      </Col>
      <Col span={24}>
        <BMICalculateForm />
      </Col>
      <Col span={12}>
        <VitalsOPDForm DateOfBirth={dob} />
      </Col>
      <Col span={12}>
        <PILCCODForm />
      </Col>
      <Col span={24}>
        <SystemicExaminationForm isNeuroPatient={isNeuroPatient} isPsychiatryPatient={isPsychiatryPatient} />
      </Col>
    </Row>
  </Card>
  )
}

export default Examination