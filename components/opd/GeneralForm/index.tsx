import { OPDDepFormCheck } from "@types";
import { Card, Col, Row } from "antd";
import React from "react";
import { calculateAge } from "utils/helpers";

import BMICalculateForm from "../BMICalculateForm";
import ChiefComplaintForm from "../ChiefComplaintForm";
import ChildForm from "../ChildForm";
import ContraceptiveHistoryForm from "../ContraceptiveHistoryForm";
import GeneralAppearanceForm from "../Examination/GeneralAppearanceForm";
import SystemicExaminationForm from "../Examination/SystemicExamination";
import FamilyHistoryForm from "../FamilyHistoryForm";
import HeadToToeExaminationaForm from "../HeadToToeExaminationaForm";
import HOPI from "../HOPI";
import MensturalHistoryForm from "../MensturalHistoryForm";
import ObstreticHistoryForm from "../ObstreticHistoryForm";
import PastHistoryForm from "../PastHistoryForm";
import PersonalHistoryForm from "../PersonalHistoryForm";
import PILCCODForm from "../PILCCODForm";
import ProvisionalDiagnosiForm from "../ProvisionalDiagnosiForm";
import ReproductivePlanForm from "../ReproductivePlanForm";
import SocioEconomicHistoryForm from "../SocioEconomicHistoryForm";
import TreatMentHistoryForm from "../TreatMentHistoryForm";
import VitalsOPDForm from "../VitalsForm";

const GeneralOPDForm = (validData: OPDDepFormCheck) => {
  console.log(validData, "gopd");
  const { dob, gender, selectedOption } = validData;
  const age = calculateAge(dob);
  return (
    <>
      <Col span={24} className="main-div">
        <ChiefComplaintForm />
      </Col>
      <Col span={24} className="main-div">
        <HOPI />
      </Col>
      {gender === "FEMALE" && age > 12 && (
        <>
          <Col span={8} className="main-div px-0">
            <MensturalHistoryForm />
          </Col>
          <Col span={8} className="main-div p-0">
            <ObstreticHistoryForm />
          </Col>
          <Col span={8} className="main-div">
            <ContraceptiveHistoryForm />
          </Col>
          <Col span={24} className="main-div">
            <ReproductivePlanForm />
          </Col>
        </>
      )}
      <Col span={24} className="main-div">
        <PastHistoryForm />
      </Col>
      <Col
        className="main-div"
        span={24}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {age >= 0 && age < 15 ? <ChildForm /> : null}
      </Col>
      <Col span={24} className="main-div">
        <FamilyHistoryForm />
      </Col>
      <Col span={24} className="main-div">
        <PersonalHistoryForm
          dob={dob}
          selectedOption={selectedOption}
        />
      </Col>
      <Col span={24} className="mt-10 main-div">
        <TreatMentHistoryForm />
      </Col>
      <Col span={24} className="main-div">
        <SocioEconomicHistoryForm />
      </Col>
      <Col span={24} className="main-div">
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
              <HeadToToeExaminationaForm />
            </Col>
            <Col span={24}>
              <SystemicExaminationForm
                isNeuroPatient={false}
                isPsychiatryPatient={false}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} className="main-div">
        <ProvisionalDiagnosiForm />
      </Col>
    </>
  );
};

export default GeneralOPDForm;
