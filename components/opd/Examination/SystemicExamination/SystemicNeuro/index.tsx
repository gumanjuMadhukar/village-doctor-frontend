import { Col } from "antd";
import React from "react";
import { NeuroFormDesign } from "styles/styled/OPD";

import AutonomicFunction from "../AutonomicFunction";
import CerebellarFunction from "../CerebellarFunction";
import CranialNerveSpine from "../CranialNerveSpine";
import HigherFunction from "../HigherFunction";
import MotorFunction from "../MotorFunction";
import ReflexFunction from "../ReflexFunction";
import SensoryFunction from "../SensoryFunction";
const SystemicNeuroForm= () => {
  return (
    <NeuroFormDesign>
      <Col span={24} className="neuro-form">
        <HigherFunction />
      </Col>
      <Col span={24}>
        <CranialNerveSpine />
      </Col>
      <Col span={24}>
        <MotorFunction />
      </Col>
      <Col span={24}>
        <SensoryFunction />
      </Col>
      <Col span={24}>
        <ReflexFunction />
      </Col>
      <Col span={24}>
        <CerebellarFunction />
      </Col>
      <Col span={24}>
        <AutonomicFunction />
      </Col>
    </NeuroFormDesign>
  );
};

export default SystemicNeuroForm;
