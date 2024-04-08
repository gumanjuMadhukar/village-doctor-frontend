import {
  BookOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  DiffOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { OPDDepFormCheck } from "@types";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { createMedicalRecord } from "apis/admin/medical-record";
import { getPatientById, getPatientDetailsForSelect } from "apis/admin/patient";
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from "constants/common";
import { DepartmentList } from "constants/schema";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { SinglePatientListColumns } from "shared/patient-table-column";
import styled from "styled-components";
import Colors from "utils/colors";
import { calculateAge } from "utils/helpers";

import GeneralOPDForm from "./GeneralForm";
import InformantForm from "./InformantForm";
import AddAppointmentModal from "./Modal/AddAppointmentModal";
import AddLabRequestModal from "./Modal/AddLabRequestModal";
import AddPrescriptionModal from "./Modal/AddPrescription";
import NeuroOPDForm from "./NeuroOPDForm";
import PatientFormDrawer from "./PatientFormDrawer";
import PsychiatryOPDForm from "./PsychiatryOPDForm";

const Title = styled(Col)`
  font-weight: 700;
  font-size: 18px;
  color: 000;
  padding-top: 3px;
  padding-left: 15px;
`;

interface FilterParams {
  currentPage: number;
  pageSize: number;
  search?: string;
}
enum ActionType {
  AI = "AI",
  PHYSICIAN = "PHYSICIAN",
  HEALTH_WORKER = "HEALTH-WORKER",
  APPOINTMENT = "APPOINTMENT",
  LAB_TEST = "LAB-TEST",
}

const OpdForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openLabModal, setOpenLabModal] = useState(false);
  const [chatGptResponse, setChatGptResponse] = useState<string>("");
  const [data, setData] = useState<any>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [backModal, setBackModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [hasInformant, setHasInformant] = useState(false);
  const [isNeuroPatient, setIsNeuroPatient] = useState(false);
  const [isGeneralPatient, setIsGeneralPatient] = useState(true);
  const [isPsychiatryPatient, setIsPsychiatryPatient] = useState(false);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [department, setDepartment] = useState("General");
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    search: "",
  });
  // const editorRef = useRef<any>(null);
  // const EditorLog = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const handleDelete = () => {
    openCloseDeleteModal(); // Calling the openCloseDeleteModal function on delete action
  };
  const handleDetailMedicalRecordView = (record: any) => {
    const currentUrl = window.location.origin;
    window.open(`${currentUrl}/ward/patients/${record?.id}`);
  };
  const openCloseBackModal = () => {
    setBackModal(!backModal);
  };
  const removePatient = async () => {
    try {
      // After successful deletion, reset the selected option
      setSelectedOption(null);
      openCloseDeleteModal();
      setHasInformant(false);
      form.resetFields();
      setIsGeneralPatient(true);
      setIsNeuroPatient(false);
      setIsPsychiatryPatient(false);
    } catch (error) {
      // Handle any errors that might occur during patient deletion
      console.error("Error deleting patient:", error);
      // Optionally show an error message to the user
      message.error("Failed to delete the patient. Please try again.");
    }
  };
  const createMedicalRecordMutation = useMutation(createMedicalRecord, {
    onSuccess: (response: any) => {
      console.log(response);
      setData(response?.medical_record);
      if (actionType === ActionType.AI) {
        setChatGptResponse(response?.chat);
      } else if (actionType === ActionType.HEALTH_WORKER) {
        openClosePrescriptionModal();
      } else if (actionType === ActionType.PHYSICIAN) {
        openCloseAppointmentModal();
      } else if (actionType === ActionType.APPOINTMENT) {
        router.push("/ward/opd");
        message.success("Appointment has been created successfully");
      } else if (actionType === ActionType.LAB_TEST) {
        openCloseLabModal();
      }
      message.success("Medical record has been added successfully");
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    },
  });
  const handleSelectChange = (value: any) => {
    if (value === "reset") {
      setSelectedOption(null);
    } else {
      setSelectedOption(value);
      if (value === "add-patient") {
        setDrawerOpen(true);
      }
    }
  };
  const { data: patientList } = useQuery(
    ["patientList", { filterParams }],
    getPatientDetailsForSelect
  );
  const { data: patientDetail } = useQuery(
    ["patientDetail", selectedOption],
    getPatientById,
    {
      enabled: !!(selectedOption && selectedOption !== "add-patient"),
    }
  );
  const { data: medicalRecord } = useQuery(
    ["patient", patientDetail?.id],
    getPatientById,
    {
      enabled: !!patientDetail?.id,
    }
  );
  const singlePatientDetails = [
    {
      ...patientDetail,
    },
  ];
  const handleSearch = (value: any) => {
    setFilterParams({
      ...filterParams,
      search: value,
    });
  };
  const renderOptions = () => {
    if (!patientList || patientList.length === 0) {
      return (
        <Select.Option key="create-new" value="add-patient">
          Create New / नयाँ सिर्जना गर्नुहोस्
        </Select.Option>
      );
    }
    return [
      <Select.Option key="create-new" value="add-patient">
        Create New / नयाँ सिर्जना गर्नुहोस्
      </Select.Option>,
      ...patientList.map((data: any) => (
        <Select.Option key={data.id} value={data.id}>
          {`${data.first_name} - ${data.last_name} ${data.contact_number}`}
        </Select.Option>
      )),
    ];
  };
  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
  };
  const openClosePrescriptionModal = () => {
    !!selectedOption
      ? setOpenPrescriptionModal(!openPrescriptionModal)
      : message.error("Please select patient first");
  };
  const openCloseAppointmentModal = () => {
    !!selectedOption
      ? setOpenAppointmentModal(!openAppointmentModal)
      : message.error("Please select patient first");
  };
  const openCloseLabModal = () => {
    setOpenLabModal(!openLabModal);
  };
  const router = useRouter();
  const onCancelClick = () => {
    router.back();
  };
  const onFinish = (data: any) => {
    if (selectedOption) {
      const formData = {
        patient_id: selectedOption,
        record_date: dayjs().format("YYYY-MM-DD"),
        from: actionType,
        department: department,
        treatment_history: data.treatment_history,
        ...(hasInformant && {
          informant: {
            name: data.informant_name,
            address: data.informant_address,
            phone_number: data.informant_phone_number,
            relation: data.informant_relationship,
          },
        }),
        medical_record_details: {
          hopi: data.hopi,
          total_duration_of_illness:data.total_duration_of_illness,
          provisional_diagnosis: data.provisional_diagnosis,
          from: actionType,
        },
        examination: {
          general_appearance: data.general_appearance_type,
          eye_opening_gcs: data.eye_openning,
          verbal_response_gcs: data.verbal_response,
          motor_response_gcs: data.motor_response,
          inspection: data.inspection,
          palpaion: data.palpation,
          percussion: data.percussion,
          auscultation: data.auscultation,
          head_toe_examination: data.head_to_toe,
          higher_function: {
            appearance: data.appearance,
            behaviour: data.behaviour,
            emotional_state: data.emotional_state,
            immediate_memory: data.immediate_memory,
            remote_memory: data.remote_memory,
            past_memory: data.past_memory,
          },
          cranial_nerve_spine: {
            sign_of_meningitis: data.sign_of_meningitis,
            ol_factory: data.ol_factory,
            visual_acuity: data.visual_acuity,
            field: data.field,
            color_vision: data.color_vision,
            eye_movement: data.eye_movement,
            light_reflex: data.light_reflex,
            pupil_size: data.pupil_size,
            sensation_overface: data.sensation_overface,
            chewing: data.chewing,
            jaw_reflex: data.jaw_reflex,
            conrneal_reflex: data.conrneal_reflex,
            taste_sensation_in_2_3rd_of_tongue: data.taste_sensation_in_2_3rd_of_tongue,
            facial_droooping: data.facial_drooping,
            smiling: data.smiling,
            frowning_and_blowing: data.frowning_and_blowing,
            upper_half_of_face: data.upper_half_of_face,
            hearing: data.hearing,
            webers_test: data.webers_test,
            rinnis_test: data.rinis_test,
            balance: data.balance,
            taste_sensation_in_posterior_1_3rd_of_tongue: data.taste_sensation_in_posterior_1_3rd_of_tongue,
            gag_reflex: data.gag_reflex,
            tongue_deviation: data.tongue_deviation,
          },
          motor_function:{
            left_upper_limb_tone: data.left_upper_limb_tone,
            right_upper_limb_tone: data.right_upper_limb_tone,
            left_lower_limb_tone: data.left_lower_limb_tone,
            right_lower_limb_tone: data.right_lower_limb_tone,
            left_upper_limb_power: data.left_upper_limb_power,
            right_upper_limb_power: data.right_upper_limb_power,
            left_lower_limb_power: data.left_lower_limb_power,
            right_lower_limb_power: data.right_lower_limb_power,
          },
          sensory_function: {
            pain_sensation: data.pain_sensation,
            touch_sensation: data.touch_sensation,
            temperature_sensation: data.temperature_sensation,
            joint_position_sensation: data.joint_position_sensation,
            vibration_sensation: data.vibration_sensation,
            pressure_sensation: data.pressure_sensation,
            one_point_localization: data.one_point_localization,
            two_point_localozation: data.two_point_localization,
            graphesthesia: data.graphesthesia,
            stereogenosis: data.stereogenosis,
          },
          reflex_function:{
            biceps_reflex: data.biceps_reflex,
            triceps_reflex: data.triceps_reflex,
            knee_reflex: data.knee_reflex,
          },
          cerebellar_function:{
            cereberral_finger_to_nose: data.cereberral_finger_to_nose,
            cereberral_alternating_hand_movement:
              data.cereberral_alternating_hand_movement,
            cereberral_heel_to_shin_test: data.cereberral_heel_to_shin_test,
          },
          autonomic_function:{
            postural_hypertension: data.postural_hypertension,
            abnormal_sweating: data.abnormal_sweating,
            nocturnal_diarrhoea: data.nocturnal_diarrhoea,
            hornor_syndrome: data.hornor_syndrome,
          },
          thoughts: {
            content_of_thoughts:data.content_of_thoughts,
            insights:data.insights,
          },
          from: actionType,
        },
        chief_complaint: data.chief_complaint,
        pilccod: data.pilccod,
        patient_history: {
          medical_history: data.medical_history,
          surgical_history: data.surgical_history,
          psychiatry_history:data.psychiatry_history,
          birth_history: data.birth_history,
          immunization_history: data.immunization_history,
          nutrition_history: data.nutrition_history,
          development_history: data.development_history,
          contraception_history: {
            current_history: data.current_history,
            prev_history: data.prev_history,
            types_of_contraception: data.types_of_contraception,
          },
          family_history: [
            data.family_history,
            { family_relavant_history: data.relavant_family_history },
          ],
          personal_history: {
            personal_history: data.p_history_group,
            bowel_and_bladder: data.bowel_bladder_checked,
            smoker: data.smoker_checked,
            alcoholics: data.alcoholics_checked,
            allergies: data.allergies,
            pack_year: {
              no_of_cigarettes: data.no_of_cigarettes,
              duration: data.duration,
            },
            units_per_week: {
              percentage_of_alcohol: data.percentage_of_alcohol,
              volume_consumed: data.volume_consumed,
              days_count: data.days_count,
            },
            neurotic_symptoms: data.neurotic_symptoms,
            work_history: data.work_history
          },
        },
        premorbid_personality: {
          interpersonal_relation: data.interpersonal_relation,
          religious_beliefs: data.religious_beliefs,
          attitude: data.attitide,
          hobbies: data.hobbies,
          character:data.character
        },
        bmi: {
          height: data.height,
          weight: data.weight,
          bmi_result: data.bmi_value,
        },
        allergies: data.allergies,
        vitals: {
          blood_pressure: data.blood_pressure,
          temperature: data.temperature,
          pulse: data.pulse,
          respiration: data.respiration,
          saturation: data.saturation,
        },
        socio_economic: {
          sustainability: data.sustainability,
          dependent: data.dependent,
          home_sanitation: data.home_sanitation,
          office_sanitation: data.office_sanitation,
          water_consumption: data.office_sanitation,
        },
        reproductive_plans: data.reproductive_plans,
        diagnosis: data.provisional_diagnosis,
        notes: "null",
        menstrual_history: {
          last_menstural_history: data.last_menstural_history,
          menarche: data.menarche,
          duration_of_period: data.duration_of_period,
          regularity: data.regularity,
          dysmenorrhoea: data.dysmenorrhoea,
          amount_of_loss: data.amount_of_loss,
        },
        obstretic_history: {
          married_years: data.years_of_marriage,
          no_of_pregnancy: data.no_of_pregnancy,
          outcome_of_pregnancy: data.outcome_of_pregnancy,
          complications_during_pregnancy: data.complications_during_pregnancy,
          mode_of_deliver: data.mode_of_delivery,
          last_child_birth: data.last_child_birth,
        },
      };
      console.log(formData);
      createMedicalRecordMutation.mutate(formData);
    } else {
      `7`;
      message.error("Please select patient first");
    }
  };

  const dob = patientDetail?.date_of_birth;
  const age = calculateAge(dob); // returns age in years
  const gender = patientDetail?.gender;
  const generalInfo: OPDDepFormCheck = { dob, gender, selectedOption };
  console.log(generalInfo, "opd");
  useEffect(() => {
    if (age > 0 && age <= 15) {
      setHasInformant(true);
    }
  }, [age]);

  const record =
    medicalRecord?.medical_records[medicalRecord?.medical_records?.length - 1];
  useEffect(() => {
    if (isFollowUp == true) {
      form.setFieldValue("complaint_id", record?.complaint?.id);
      form.setFieldValue("hopi", record?.medicalRecordDetails[0]?.hopi);
    }
  }, [record, isFollowUp, form]);
  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    switch (value) {
      case "Neuro":
        setIsNeuroPatient(!isNeuroPatient);
        setIsPsychiatryPatient(false);
        setIsGeneralPatient(false);
        break;
      case "Psychiatry":
        setIsPsychiatryPatient(!isPsychiatryPatient);
        setIsNeuroPatient(false);
        setIsGeneralPatient(false);
        break;
      default:
        setIsNeuroPatient(false);
        setIsPsychiatryPatient(false);
        setIsGeneralPatient(true);
        break;
    }
  };
  return (
    <>
      {createMedicalRecordMutation.isLoading && (
        <Spin
          spinning={createMedicalRecordMutation.isLoading}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.4)",
          }}
        ></Spin>
      )}
      <Form
        name="prescription-form"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
        style={{
          padding: "15px 30px",
        }}
      >
        <Card>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label={
                  <Title>{selectedOption ? "" : "Patients / बिरामीहरू"}</Title>
                }
                name="first_name"
              >
                {patientDetail ? (
                  <>
                    <Table
                      dataSource={singlePatientDetails}
                      columns={SinglePatientListColumns({
                        handleDelete,
                        handleDetailMedicalRecordView,
                      })}
                      pagination={false}
                    />
                    <Row style={{ margin: "10px 5px 0px" }}>
                      <Col span={24} className="mt-2">
                        {hasInformant && age < 15 ? (
                          <Checkbox
                            checked
                            disabled
                            onChange={() => setHasInformant(!hasInformant)}
                          >
                            Informant / सूचना दाता
                          </Checkbox>
                        ) : (
                          <Checkbox
                            onChange={() => setHasInformant(!hasInformant)}
                          >
                            Informant / सूचना दाता
                          </Checkbox>
                        )}
                        <Checkbox onChange={() => setIsFollowUp(!isFollowUp)}>
                          Follow Up
                        </Checkbox>
                        <Select
                          style={{ width: 180 }}
                          onChange={handleDepartmentChange}
                          allowClear
                          placeholder="Select Department"
                          defaultValue={"General"}
                          options={DepartmentList}
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Search to Select"
                    value={selectedOption ?? undefined}
                    onChange={handleSelectChange}
                    onSearch={handleSearch}
                    filterOption={false} // Disable default filtering, we will handle it manually
                  >
                    {renderOptions()}
                  </Select>
                )}
              </Form.Item>
            </Col>

            {hasInformant && (
              <Col span={24} className="main-div">
                <InformantForm />
              </Col>
            )}
            {isGeneralPatient && (
              <GeneralOPDForm
                gender={gender}
                dob={dob}
                selectedOption={selectedOption}
              />
            )}
            {isNeuroPatient && (
              <NeuroOPDForm
                gender={gender}
                dob={dob}
                selectedOption={selectedOption}
              />
            )}
            {isPsychiatryPatient && (
              <PsychiatryOPDForm
                gender={gender}
                dob={dob}
                selectedOption={selectedOption}
              />
            )}
          </Row>
        </Card>

        {chatGptResponse && (
          <Col span={24} style={{ marginTop: "20px" }}>
            <Card
              title="AI Response"
              actions={[
                <Button
                  type="primary"
                  key="book"
                  onClick={openCloseAppointmentModal}
                >
                  Book an Appointment
                </Button>,
              ]}
            >
              {chatGptResponse} <br /> <br />
              **Note :{" "}
              <span style={{ color: "red" }}>
                This data is generated by an AI, and while it can provide
                information and insights, it is not a substitute for
                professional medical advice. For the best and most accurate
                treatment recommendations, please consult a healthcare
                professional or doctor.
              </span>
            </Card>
          </Col>
        )}
        <Form.Item
          style={{
            float: "right",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              marginLeft: "10px",
            }}
            size="middle"
            htmlType="submit"
            onClick={() => setActionType(ActionType.AI)}
          >
            <FileSearchOutlined />
            Analyse / विश्लेषण
          </Button>
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              marginLeft: "10px",
            }}
            size="middle"
            htmlType="submit"
            onClick={() => setActionType(ActionType.LAB_TEST)}
          >
            <DiffOutlined />
            Add Lab / प्रयोगशाला थप्नुहोस्
          </Button>
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              marginLeft: "10px",
            }}
            size="middle"
            htmlType="submit"
            onClick={() => setActionType(ActionType.HEALTH_WORKER)}
          >
            <FileDoneOutlined />
            Direct Prescription / प्रत्यक्ष प्रिस्क्रिप्शन
          </Button>
          <Button
            type="ghost"
            ghost
            style={{
              backgroundColor: Colors.FIRE_RED,
              color: "#fff",
              marginLeft: "10px",
            }}
            size="middle"
            htmlType="submit"
            onClick={() => setActionType(ActionType.APPOINTMENT)}
          >
            <BookOutlined />
            Book Appointment / बुक अपोइन्टमेन्ट
          </Button>
          <Button
            type="ghost"
            ghost
            style={{
              boxShadow: "none",
              borderColor: Colors.FIRE_RED,
              color: Colors.FIRE_RED,
              marginLeft: "10px",
            }}
            onClick={openCloseBackModal}
          >
            <CloseSquareOutlined />
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <PatientFormDrawer openDrawer={openDrawer} onClose={onClose} />
      <AddAppointmentModal
        isModalOpen={openAppointmentModal}
        handleCancel={openCloseAppointmentModal}
        data={data}
      />
      <Modal
        title={
          <div style={{ color: "red" }}>
            <DeleteOutlined /> Remove Patient
          </div>
        }
        open={deleteModal}
        onCancel={openCloseDeleteModal}
        onOk={removePatient}
        width="30vw"
        className="modal-content-responsive"
        style={{ fontSize: "16px" }}
        okButtonProps={{
          style: { backgroundColor: "red", borderColor: "red" },
        }}
      >
        <p>Are you sure you want to remove the patient ?</p>
      </Modal>

      <Modal
        title={<div style={{ color: "red" }}>Back</div>}
        open={backModal}
        onCancel={openCloseBackModal}
        onOk={onCancelClick}
        width="30vw"
        className="modal-content-responsive"
        style={{ fontSize: "16px" }}
        okButtonProps={{
          style: { backgroundColor: "red", borderColor: "red" },
        }}
      >
        <p>Are you sure you want to exit?</p>
      </Modal>
      <AddPrescriptionModal
        isModalOpen={openPrescriptionModal}
        handleCancel={openClosePrescriptionModal}
        patient_id={data?.id}
      />
      <Modal
        title="Patient Details"
        open={false}
        // onCancel={}
        footer={null}
        width={1200}
      >
        {/* <Patients /> */}
      </Modal>
      <AddLabRequestModal
        isModalOpen={openLabModal}
        handleCancel={openCloseLabModal}
        medical_record_id={medicalRecord?.id}
      ></AddLabRequestModal>
    </>
  );
};

export default OpdForm;
