import {
  BookOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  DiffOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  PlusCircleFilled
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  Table
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ColumnsType } from 'antd/es/table';
import { getAllergiesOfPatient } from 'apis/admin/allergies';
import { getSelectComplain } from 'apis/admin/complain';
import { createMedicalRecord } from 'apis/admin/medical-record';
import { getPatientById, getPatientDetailsForSelect } from 'apis/admin/patient';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import {
  ChildPersonalHistoryOption,
  ContraceptionTypeOption,
  FamilyHistoryOption,
  GeneralAppearanceOption,
  PersonalHistoryOption,
  PilccodOption,
  RelationOption,
  SanitationOption,
  SelectScaleType,
  WaterConsumptionOption
} from 'constants/schema';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { SinglePatientListColumns } from 'shared/patient-table-column';
import styled from 'styled-components';
import Colors from 'utils/colors';
import { calculateAge, calculateAgeYM } from 'utils/helpers';

import AddAlcoholConsumptionForm from './AddAlcoholConsumptionForm';
import AddAllergiesForm from './AddAllergiesForm';
import AddSmokerForm from './AddSmokerForm';
import BMICalculateForm from './BMICalculateForm';
import AddAppointmentModal from './Modal/AddAppointmentModal';
import AddPrescriptionModal from './Modal/AddPrescription';
import { FormItemAdd, FormItemDelete } from './Modal/AddVitalModal';
import PatientFormDrawer from './PatientFormDrawer';
import NeuroForm from './SystemicNeuroExaminationForm';

const { TextArea } = Input;

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

const alergiesListColumns: ColumnsType<any> = [
  {
    title: 'Name',
    key: 'allergen_name',
    render: (_, record) => {
      return <div className="semi-bold">{record?.allergen_name}</div>;
    }
  },
  {
    title: 'Reaction',
    dataIndex: 'reaction',
    key: 'reaction',
    render: text => <p>{text}</p>
  }
];

enum ActionType {
  AI = 'AI',
  PHYSICIAN = 'PHYSICIAN',
  HEALTH_WORKER = 'HEALTH-WORKER',
  APPOINTMENT = 'APPOINTMENT',
  LAB_TEST = 'LAB-TEST'
}

const OpdForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openLabModal, setOpenLabModal] = useState(false);
  const [chatGptResponse, setChatGptResponse] = useState<string>('');
  const [data, setData] = useState<any>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [backModal, setBackModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [hasInformant, setHasInformant] = useState(false);
  const [isNeuroPatient, setIsNeuroPatient] = useState(false);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [protocol, setProtocol] = useState<string>('');
  const [contraceptiveHistory, setContraceptiveHistory] = useState<string>('');
  const [allergiesChecked, setAllergiesChecked] = useState(false);
  const [BBChecked, setBBChecked] = useState(false);
  const [smokerChecked, setSmokerChecked] = useState(false);
  const [alcoholicsChecked, setAlcoholicsChecked] = useState(false);
  const [prevContraception, setPrevContraception] = useState(false);
  const [sustainabilityCheck, setSustainabiltyCheck] = useState(false);
  const [dependentsCheck, setDependentsCheck] = useState(false);
  const [GCSCheck, setGCSCheck] = useState(false);
  const [eyeOpenningValue, setEyeOpenningValue] = useState(0);
  const [verbalResponseValue, setVerbalResponseValue] = useState(0);
  const [motorResponseValue, setMotorResponseValue] = useState(0);
  const [GCSValue, setGCSValue] = useState(0);
  const [showGCS, setShowGCS] = useState(true);
  const [BPColor, setBPColor] = useState<string>('');
  const [BPMessage, setBPMessage] = useState<string>('');
  const [temperatureColor, setTemperatureColor] = useState<string>('');
  const [temperatureMessage, setTemperatureMessage] = useState<string>('');
  const [pulseMessage, setPulseMessage] = useState<string>('');
  const [tempScale, setTempScale] = useState<string>('celcius');
  const [pulseColor, setPulseColor] = useState<string>('');
  const [respirationColor, setRespirationColor] = useState<string>('');
  const [respirationMessage, setRespirationMessage] = useState<string>('');
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    search: ''
  });
  const editorRef = useRef<any>(null);
  const EditorLog = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const handleDelete = () => {
    openCloseDeleteModal(); // Calling the openCloseDeleteModal function on delete action
  };
  const handleDetailMedicalRecordView = (record:any) => {
    console.log(record, "www");
    const currentUrl= window.location.origin;
    window.open(`${currentUrl}/ward/patients/${record?.id}` )
  } 

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
    } catch (error) {
      // Handle any errors that might occur during patient deletion
      console.error('Error deleting patient:', error);
      // Optionally show an error message to the user
      message.error('Failed to delete the patient. Please try again.');
    }
  };

  const createMedicalRecordMutation = useMutation(createMedicalRecord, {
    onSuccess: (response: any) => {
      setData(response?.medical_record);
      if (actionType === ActionType.AI) {
        setChatGptResponse(response?.chat);
      } else if (actionType === ActionType.HEALTH_WORKER) {
        openClosePrescriptionModal();
      } else if (actionType === ActionType.PHYSICIAN) {
        openCloseAppointmentModal();
      } else if (actionType === ActionType.APPOINTMENT) {
        router.push('/ward/opd');
        message.success('Appointment has been created successfully');
      } else if (actionType === ActionType.LAB_TEST) {
        openCloseLabModal();
      }
      message.success('Medical record has been added successfully');
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const handleSelectChange = (value: any) => {
    if (value === 'reset') {
      setSelectedOption(null);
    } else {
      setSelectedOption(value);

      if (value === 'add-patient') {
        setDrawerOpen(true);
      }
    }
  };

  const { data: patientList } = useQuery(['patientList', { filterParams }], getPatientDetailsForSelect);

  const { data: allergiesData } = useQuery(['allergiesData', { selectedOption }], getAllergiesOfPatient, {
    enabled: !!selectedOption
  });

  const { data: patientDetail } = useQuery(['patientDetail', selectedOption], getPatientById, {
    enabled: !!(selectedOption && selectedOption !== 'add-patient')
  });

  const { data: medicalRecord } = useQuery(['patient', patientDetail?.id], getPatientById, {
    enabled: !!patientDetail?.id
  });
  const { data: complainList } = useQuery(['complainList'], getSelectComplain);

  const complainOption = complainList?.data?.map((complain: any) => {
    return {
      label: complain.name,
      value: complain.id
    };
  });

  const singlePatientDetails = [
    {
      ...patientDetail
    }
  ];

  const handleSearch = (value: any) => {
    setFilterParams({
      ...filterParams,
      search: value
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
      ))
    ];
  };

  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
  };

  const openClosePrescriptionModal = () => {
    !!selectedOption ? setOpenPrescriptionModal(!openPrescriptionModal) : message.error('Please select patient first');
  };
  const openCloseAppointmentModal = () => {
    !!selectedOption ? setOpenAppointmentModal(!openAppointmentModal) : message.error('Please select patient first');
  };

  const openCloseLabModal = () => {
    setOpenLabModal(!openLabModal);
  };
  const onProtocolChange = ({ target: { value } }: RadioChangeEvent) => {
    setProtocol(value);
  };
  const onContraceptiveHistoryChange = ({ target: { value } }: RadioChangeEvent) => {
    setContraceptiveHistory(value);
  };
  const onEyeOpeningChange = (e: RadioChangeEvent) => {
    setEyeOpenningValue(e.target.value);
  };
  const onVerbalResponseChange = (e: RadioChangeEvent) => {
    setVerbalResponseValue(e.target.value);
  };
  const onMotorResponseChange = (e: RadioChangeEvent) => {
    setMotorResponseValue(e.target.value);
  };
  const onPilccodChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  const onPrevContraception = () => {
    setPrevContraception(!prevContraception);
  };

  const router = useRouter();

  const onCancelClick = () => {
    router.back();
  };
  const saturationPlaceChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const checkBPRange = (event: any) => {
    var { value } = event.target;
    const [sys, diast] = value.split('/').map(Number);
    var ageYear = age;
    var ageMonth = ageYM;
    var newMessage = '';
    if (ageYear > 1) {
      ageMonth = 0;
    }
    const calculatedAge = ageYear + ageMonth / 12;
    const conditions = [
      {
        ageRange: { min: 0, max: Infinity },
        check: () => (sys == 0 || diast == 0 ? (setBPColor('white'), (newMessage = '')) : '')
      },
      {
        ageRange: { min: 0, max: 0.25 },
        check: () =>
          sys == 0 || diast == 0
            ? (setBPColor('white'), (newMessage = 'white'))
            : sys >= 65 && sys <= 80 && diast >= 45 && diast <= 55
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 65 || diast < 45
            ? (setBPColor('orange'), (newMessage = 'orange'))
            : sys < 85 || diast < 55
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 0.25, max: 0.5 },
        check: () =>
          sys >= 70 && sys <= 90 && diast >= 50 && diast <= 65
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 70 || diast < 50
            ? (setBPColor('orange'), (newMessage = 'Low Blood Pressure'))
            : sys < 90 || diast < 65
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 0.5, max: 1 },
        check: () =>
          sys >= 80 && sys <= 100 && diast >= 55 && diast <= 65
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 80 || diast < 55
            ? (setBPColor('orange'), (newMessage = 'Low Blood Pressure'))
            : sys > 100 || diast > 65
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 1, max: 3 },
        check: () =>
          sys >= 90 && sys <= 105 && diast >= 55 && diast <= 70
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 90 || diast < 55
            ? (setBPColor('orange'), (newMessage = 'Low Blood Pressure'))
            : sys > 105 || diast > 70
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 3, max: 6 },
        check: () =>
          sys >= 95 && sys <= 110 && diast >= 60 && diast <= 75
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 95 || diast < 60
            ? (setBPColor('orange'), (newMessage = 'Low Blood Pressure'))
            : sys > 110 || diast > 75
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 6, max: 12 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 60 && diast <= 75
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 100 || diast < 60
            ? (setBPColor('orange'), (newMessage = 'Low Blood Pressure'))
            : sys > 120 || diast > 75
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 12, max: 18 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 70 && diast <= 80
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys < 100 || diast < 70
            ? (setBPColor('orange'), (newMessage = 'Elevated'))
            : sys > 120 || diast > 80
            ? (setBPColor('red'), (newMessage = 'Hypertension'))
            : null
      },
      {
        ageRange: { min: 18, max: Infinity },
        check: () =>
          sys <= 120 && diast <= 80
            ? (setBPColor('green'), (newMessage = 'Normal'))
            : sys > 120 && sys < 130 && diast <= 80
            ? (setBPColor('yellow'), (newMessage = 'Elevated'))
            : (sys >= 130 && sys < 140) || (diast >= 80 && diast < 90)
            ? (setBPColor('orange'), (newMessage = 'Hypertension - Stage 1'))
            : (sys >= 140 && sys < 180) || (diast >= 90 && diast < 120)
            ? (setBPColor('rgba(255,0,0,0.5'), (newMessage = 'Hypertension - Stage 2'))
            : sys >= 180 && diast >= 120
            ? (setBPColor('rgba(255,0,0,1'), (newMessage = 'Hypertensive Crisis - Consult your doctor immediately.'))
            : null
      }
    ];
    const result = conditions
      .filter(condition => calculatedAge >= condition.ageRange.min && calculatedAge <= condition.ageRange.max)
      .map(condition => condition.check())
      .find(result => result !== null);
    setBPMessage(newMessage);
    console.log(result);
  };

  const checkTemperature = (event: any) => {
    var { value } = event.target;
    var newTextColor = '';
    var newMessage = '';
    // if(tempScale && tempScale==='fahrenheit'){
    //   var finalValue = (value-32)*5/9
    //   console.log(finalValue);
    // }
    if (age && age < 5) {
      console.log('child');
      if (value < 36.5) {
        newTextColor = '#0094b6';
        newMessage = 'Lower Than Average';
      } else if (value >= 36.5 && value < 37.5) {
        newTextColor = 'green';
        newMessage = 'Normal';
      } else if (value >= 37.5 && value < 38.5) {
        newTextColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 38.5 && value <= 42.2) {
        newTextColor = 'red';
        newMessage = 'Fever';
      }
    } else if (age > 5) {
      if (value <= 35.9) {
        newTextColor = '#0094b6';
        newMessage = 'Lower Than Average';
      } else if (value >= 36 && value <= 37) {
        newTextColor = 'green';
        newMessage = 'Normal';
      } else if (value >= 37.1 && value <= 38) {
        newTextColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 38.1 && value < 42.2) {
        newTextColor = 'red';
        newMessage = 'Fever';
      }
    }
    setTemperatureColor(newTextColor);
    setTemperatureMessage(newMessage);
  };

  const checkPulseRange = (event: any) => {
    var { value } = event.target;
    var newColor = '';
    var newMessage = '';
    var ageY = age;
    var ageM = ageYM;
    if (ageY < 1) {
      if (ageM && ageM >= 0 && ageM < 3) {
        if (value < 110) {
          newColor = 'orange';
          newMessage = 'Lower Than Average';
        } else if (value > 160) {
          newColor = 'orange';
          newMessage = 'Higher Than Average';
        } else if (value >= 110 && value <= 160) {
          newColor = 'green';
          newMessage = 'Normal';
        }
      } else if (ageM >= 3 && ageM < 6) {
        if (value < 100) {
          newColor = 'orange';
          newMessage = 'Lower Than Average';
        } else if (value > 150) {
          newColor = 'orange';
          newMessage = 'Higher Than Average';
        } else if (value >= 100 && value <= 150) {
          newColor = 'green';
          newMessage = 'Normal';
        }
      } else if (ageM >= 6 && ageM < 12) {
        if (value < 90) {
          newColor = 'orange';
          newMessage = 'Lower than average !';
        } else if (value > 130) {
          newColor = 'orange';
          newMessage = 'Higher than average !';
        } else if (value >= 90 && value <= 130) {
          newColor = 'green';
          newMessage = 'Normal';
        }
      }
    } else if (ageY >= 1 && ageY < 3) {
      if (value < 80) {
        newColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 120) {
        newColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 80 && value <= 125) {
        newColor = 'green';
        newMessage = 'Normal';
      }
    } else if (ageY >= 3 && ageY <= 6) {
      if (value < 70) {
        newColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 115) {
        newColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 70 && value <= 115) {
        newColor = 'green';
        newMessage = 'Normal';
      }
    } else if (ageY > 6) {
      if (value < 60) {
        newColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 100) {
        newColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 60 && value <= 100) {
        newColor = 'green';
        newMessage = 'Normal';
      }
    }
    setPulseColor(newColor);
    setPulseMessage(newMessage);
  };
  const checkRespiration = (events: any) => {
    var { value } = events.target;
    var newRespirationColor = '';
    var newMessage = '';
    var ageY = age;
    var ageMonth = ageYM;
    if (ageY < 1) {
      if (ageMonth >= 0 && ageMonth < 3) {
        if (value < 30) {
          newRespirationColor = 'orange';
          newMessage = 'Lower than average';
        } else if (value > 60) {
          newRespirationColor = 'orange';
          newMessage = 'Higher than average';
        } else if (value >= 30 && value <= 60) {
          newRespirationColor = 'green';
          newMessage = 'Normal';
        }
      } else if (ageMonth >= 3 && ageMonth < 6) {
        if (value < 30) {
          newRespirationColor = 'orange';
          newMessage = 'Lower than average';
        } else if (value > 45) {
          newRespirationColor = 'orange';
          newMessage = 'Higher than average';
        } else if (value >= 30 && value <= 45) {
          newRespirationColor = 'green';
          newMessage = 'Normal';
        }
      } else if (ageMonth >= 6 && ageMonth < 12) {
        if (value < 25) {
          newRespirationColor = 'orange';
          newMessage = 'Lower than average';
        } else if (value > 40) {
          newRespirationColor = 'orange';
          newMessage = 'Higher than average';
        } else if (value >= 25 && value <= 40) {
          newRespirationColor = 'green';
          newMessage = 'Normal';
        }
      }
    } else if (ageY >= 1 && ageY < 3) {
      if (value < 20 || value > 30) {
        newRespirationColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 30) {
        newRespirationColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 20 && value <= 30) {
        newRespirationColor = 'green';
        newMessage = 'Normal';
      }
    } else if (ageY >= 3 && ageY < 6) {
      if (value < 20) {
        newRespirationColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 25) {
        newRespirationColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 20 && value <= 25) {
        newRespirationColor = 'green';
        newMessage = 'Normal';
      }
    } else if (ageY >= 6 && ageY < 12) {
      if (value < 14) {
        newRespirationColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 22) {
        newRespirationColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 14 && value <= 22) {
        newRespirationColor = 'green';
        newMessage = 'Normal';
      }
    } else if (ageY >= 12) {
      if (value < 12) {
        newRespirationColor = 'orange';
        newMessage = 'Lower than average';
      } else if (value > 18) {
        newRespirationColor = 'orange';
        newMessage = 'Higher than average';
      } else if (value >= 12 && value <= 18) {
        newRespirationColor = 'green';
        newMessage = 'Normal';
      }
    }
    setRespirationColor(newRespirationColor);
    setRespirationMessage(newMessage);
  };
  const onFinish = (data: any) => {
    EditorLog();
    console.log(data, 'formdata');
    if (selectedOption) {
      const formData = {
        patient_id: selectedOption,
        record_date: dayjs().format('YYYY-MM-DD'),
        from: actionType,
        treatment_history: data.treatment_history,
        ...(hasInformant && {
          informant: {
            name: data.informant_name,
            address: data.informant_address,
            phone_number: data.informant_phone_number,
            relation: data.informant_relationship
          }
        }),
        medical_record_details: {
          hopi: data.hopi,
          provisional_diagnosis: data.provisional_diagnosis,
          from: actionType
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
          from: actionType
        },
        chief_complaint: data.chief_complaint,
        pilccod: data.pilccod,
        patient_history: {
          medical_history: data.medical_history,
          surgical_history: data.surgical_history,
          birth_history: data.birth_history,
          immunization_history: data.immunization_history,
          nutrition_history: data.nutrition_history,
          development_history: data.development_history,
          contraception_history: {
            current_history: data.current_history,
            prev_history: data.prev_history,
            types_of_contraception: data.types_of_contraception
          },
          family_history: [data.family_history, { family_relavant_history: data.relavant_family_history }],
          personal_history: {
            personal_history: data.p_history_group,
            bowel_and_bladder: data.bowel_bladder_checked,
            smoker: data.smoker_checked,
            alcoholics: data.alcoholics_checked,
            allergies: data.allergies,
            pack_year: {
              no_of_cigarettes: data.no_of_cigarettes,
              duration: data.duration
            },
            units_per_week: {
              percentage_of_alcohol: data.percentage_of_alcohol,
              volume_consumed: data.volume_consumed,
              days_count: data.days_count
            }
          }
        },

        bmi: {
          height: data.height,
          weight: data.weight,
          bmi_result: data.bmi_value
        },
        allergies: data.allergies,
        vitals: {
          blood_pressure: data.blood_pressure,
          temperature: data.temperature,
          pulse: data.pulse,
          respiration: data.respiration,
          saturation: data.saturation
        },
        socio_economic: {
          sustainability: sustainabilityCheck,
          dependent: dependentsCheck,
          home_sanitation: data.home_sanitation,
          office_sanitation: data.office_sanitation
        },
        reproductive_plans: data.reproductive_plans,
        diagnosis: data.provisional_diagnosis,
        notes: 'null',
        menstrual_history: {
          last_menstural_history: data.last_menstural_history,
          menarche: data.menarche,
          duration_of_period: data.duration_of_period,
          regularity: data.regularity,
          dysmenorrhoea: data.dysmenorrhoea,
          amount_of_loss: data.amount_of_loss
        },
        obstretic_history: {
          married_years: data.years_of_marriage,
          no_of_pregnancy: data.no_of_pregnancy,
          outcome_of_pregnancy: data.outcome_of_pregnancy,
          complications_during_pregnancy: data.complications_during_pregnancy,
          mode_of_deliver: data.mode_of_delivery,
          last_child_birth: data.last_child_birth
        }
      };
      createMedicalRecordMutation.mutate(formData);
    } else {
      `7`;
      message.error('Please select patient first');
    }
  };
  const onPersonalHistoryChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setBBChecked(checkedValues.includes('Bowel&Bladder'));
    setAllergiesChecked(checkedValues.includes('Allergies'));
    setSmokerChecked(checkedValues.includes('Smoker'));
    setAlcoholicsChecked(checkedValues.includes('Alcoholics'));
  };
  const onGeneralAppearanceChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  const onTempScaleChange = (value: string) => {
    console.log(value, 'tempScale');
    setTempScale(value);
  };
  const onGCSChecked = () => {
    setGCSCheck(!GCSCheck);
    setShowGCS(true);
  };

  const onInformantRelationChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onRelationSearch = (value: string) => {
    console.log('search:', value);
  };
  const onSustainabilityCheck = () => {
    setSustainabiltyCheck(!sustainabilityCheck);
  };
  const onDependentsCheck = () => {
    setDependentsCheck(!dependentsCheck);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const GCSCalculate = () => {
    console.log(eyeOpenningValue, verbalResponseValue, motorResponseValue);
    const GCSValue = eyeOpenningValue + verbalResponseValue + motorResponseValue;
    setGCSValue(GCSValue);
    setShowGCS(false);
  };
  const dob = patientDetail?.date_of_birth;
  const age = calculateAge(dob); // returns age in years 
  const ageYM = calculateAgeYM(dob); // returns months value after age
  const gender = patientDetail?.gender;

  interface CheckboxStyle {
    flexDirection?: 'row' | 'column';
  }
  const checkboxStyle: CheckboxStyle = {
    flexDirection: 'column'
  };
  useEffect(() => {
    console.log(age, 'received');
    if (age > 0 && age <= 15) {
      setHasInformant(true);
    }
  }, [age]);

  const selectScale = <Select defaultValue={tempScale} onChange={onTempScaleChange} options={SelectScaleType} />;

  const record = medicalRecord?.medical_records[medicalRecord?.medical_records?.length - 1];
  // const latestRecord = record[record.length -1]
  useEffect(() => {
    if (isFollowUp == true) {
      form.setFieldValue('complaint_id', record?.complaint?.id);
      form.setFieldValue('hopi', record?.medicalRecordDetails[0]?.hopi);
    }
  }, [record, isFollowUp, form]);
  return (
    <>
      {createMedicalRecordMutation.isLoading && (
        <Spin
          spinning={createMedicalRecordMutation.isLoading}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.4)'
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
          padding: '15px 30px'
        }}
      >
        <Card>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <Form.Item label={<Title>{selectedOption ? '' : 'Patients / बिरामीहरू'}</Title>} name="first_name">
                {patientDetail ? (
                  <>
                    <Table
                      dataSource={singlePatientDetails}
                      columns={SinglePatientListColumns({ handleDelete , handleDetailMedicalRecordView })}
                      pagination={false}
                    />
                    <Row style={{ margin: '10px 5px 0px' }}>
                      <Col span={6} className="mt-2">
                        {/* {age < 15 ? (
                          <Checkbox onChange={() => setHasInformant(!hasInformant)}>Informant / सूचना दाता</Checkbox>
                        ) : (
                          <Checkbox checked disabled onChange={() => setHasInformant(!hasInformant)}>
                            Informant / सूचना दाता
                          </Checkbox>
                        )} */}
                        {hasInformant && age < 15 ? (
                          <Checkbox checked disabled onChange={() => setHasInformant(!hasInformant)}>
                            Informant / सूचना दाता
                          </Checkbox>
                        ) : (
                          <Checkbox onChange={() => setHasInformant(!hasInformant)}>Informant / सूचना दाता</Checkbox>
                        )}
                        <Checkbox onChange={() => setIsNeuroPatient(!isNeuroPatient)}>Neuro Concern</Checkbox>
                        <Checkbox onChange={() => setIsFollowUp(!isFollowUp)}>Follow Up</Checkbox>
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
              <Col span={24}>
                <Card title="Informant" className="mt-10" size="small">
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={5}>
                      <Form.Item
                        name="informant_name"
                        label="Informant Name"
                        rules={[{ required: true, message: 'Please enter the informant name!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="informant_address"
                        label="Informant Address"
                        rules={[{ required: true, message: 'Please enter the informant address!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="informant_phone_number"
                        label="Informant Phone Number"
                        rules={[{ required: true, message: 'Please enter the informant phone number!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="informant_relationship"
                        label="Informant Relationship"
                        rules={[{ required: true, message: 'Please enter the informant relation!' }]}
                      >
                        <Select
                          showSearch
                          placeholder="Select a person"
                          optionFilterProp="children"
                          onChange={onInformantRelationChange}
                          onSearch={onRelationSearch}
                          filterOption={filterOption}
                          options={RelationOption}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )}
            <Col span={24} className="main-div">
              <Card title="Chief Complaint / प्रमुख गुनासो" className="mt-10" size="small">
                <Form.List name="chief_complaint" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, i) => {
                        return (
                          <div style={{ position: 'relative' }} key={i}>
                            <div key={field.key} className={`space${i}`}>
                              <Row style={{ width: '100%' }}>
                                <Col md={12}>
                                  <Form.Item
                                    label={i === 0 && 'Complaint / गुनासो'}
                                    name={[field.name, 'complaint_id']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing Complain Status'
                                      }
                                    ]}
                                    hasFeedback
                                  >
                                    <Select
                                      showSearch
                                      placeholder="Select Complaint / गुनासो चयन गर्नुहोस् "
                                      options={complainOption}
                                      optionFilterProp="children"
                                      filterOption={filterOption}
                                      // defaultValue={isFollowUp ? }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col
                                  md={10}
                                  style={{
                                    marginLeft: '15px',
                                    marginRight: '15px'
                                  }}
                                >
                                  <Form.Item
                                    label={i === 0 && 'Duration / अवधि'}
                                    name={[field.name, 'duration']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing Duration status'
                                      }
                                    ]}
                                    hasFeedback
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col md={1}>
                                  {i !== 0 && (
                                    <FormItemDelete
                                      onClick={() => {
                                        // removeAddition(i);
                                        remove(field.name);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </FormItemDelete>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </div>
                        );
                      })}
                      <Form.Item>
                        <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                          Add / थप्नुहोस्
                        </FormItemAdd>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Col>
            <Col span={24} className="main-div">
              <Card
                title="History of Presenting Illness (HOPI) / प्रस्तुत रोग को  इतिहासका कारण "
                className="mt-10"
                size="small"
              >
                <Form.Item name="hopi" rules={[{ required: true, message: 'Please enter the complaint!' }]}>
                  <TextArea defaultValue={record?.hopi} rows={4}></TextArea>
                </Form.Item>
              </Card>
            </Col>
            {gender === 'FEMALE' && age > 12 && (
              <>
                <Col span={8}>
                  <Card title="Menstural History / मासिक रोग्नी इतिहास" className="mt-10" size="small">
                    <Form.Item label="Last Menstural History" name="last_menstural_history">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Menarche / " name="menarche">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Duration Of Period / महिनावारीको अवधि" name="duration_of_period">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Regularity / नियमितता" name="regularity">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Dysmenorrhoea / डिसमेनोरिया " name="dysmenorrhoea">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Amount of Loss" name="amount_of_loss">
                      <Input />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Obstretic History / प्रसूति इतिहास" className="mt-10" size="small">
                    <Form.Item label="Years of Marriage" name="years_of_marriage">
                      <Input />
                    </Form.Item>
                    <Form.Item label="No of Pregnancy / गर्भावस्था को संख्या" name="no_of_pregnancy">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Outcome Of Pregnancy / गर्भावस्था को परिणाम" name="outcome_of_pregnancy">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Complications During Pregnancy / गर्भावस्था को समयमा जटिलताहरू"
                      name="complications_during_pregnancy"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Mode of Delivery" name="mode_of_delivery">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Last Child Birth / पछिल्लो बच्चा जन्म" name="last_child_birth">
                      <Input />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Contraception History/  गर्भनिरोधक इतिहास" className="mt-10" size="small">
                    <Row>
                      <Col span={24}>
                        <Form.Item label="Current History / हालको इतिहास" name="current_history">
                          <Radio.Group
                            options={[
                              { label: 'Yes / हो', value: '1' },
                              { label: 'No / होइन', value: '0' }
                            ]}
                            optionType="button"
                            onChange={onContraceptiveHistoryChange}
                          />
                        </Form.Item>
                      </Col>
                      {contraceptiveHistory == '1' && (
                        <Col>
                          <Form.Item
                            label="Types of Contraception / गर्भनिरोधक को प्रकार "
                            name="types_of_contraception"
                          >
                            <Checkbox.Group
                              options={ContraceptionTypeOption}
                              defaultValue={['']}
                              style={checkboxStyle}
                              className="pilccod"
                            />
                          </Form.Item>
                        </Col>
                      )}
                      {contraceptiveHistory == '0' && (
                        <Col>
                          <Form.Item label="" name="prev_history">
                            <Checkbox onChange={onPrevContraception}>Any Previous Contraceptives</Checkbox>
                          </Form.Item>
                          {prevContraception && (
                            <Form.Item label="Types of Contraceptive" name="types_of_contraception">
                              <Checkbox.Group
                                options={ContraceptionTypeOption}
                                defaultValue={['']}
                                style={checkboxStyle}
                                className="pilccod"
                              />
                            </Form.Item>
                          )}
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Is there any reproductive plans?">
                    <Form.Item
                      name="immunization_history"
                      // rules={[{ required: true, message: 'Please enter the field' }]}
                    >
                      <Radio.Group
                        options={[
                          { label: 'Yes', value: '1' },
                          { label: 'No', value: '0' }
                        ]}
                        optionType="button"
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </>
            )}
            <Col span={24} className="main-div">
              <Card title="Past History / विगतको इतिहास" className="mt-10" size="small">
                <Row>
                  <Col span={12}>
                    <Card title="Medical History / चिकित्सकिय इतिहास" className="mt-10" size="small">
                      <Form.Item name="medical_history">
                        <TextArea rows={2} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Surgical History / सर्जिकल इतिहास " className="mt-10" size="small">
                      <Form.Item name="surgical_history">
                        <TextArea rows={2} />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col className="main-div" span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
              {age >= 0 && age < 15 ? (
                <>
                  <Col span={12} style={{ padding: '0px' }}>
                    <Card title="Birth History / जन्म इतिहास" className="mt-10" size="small">
                      <Form.Item name="birth_history" rules={[{ required: true, message: 'Please enter the field!' }]}>
                        <TextArea rows={1} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12} style={{ padding: '0px' }}>
                    <Card
                      title="Immunization History (As Per National Immunization History) / खोप इतिहास"
                      className="mt-10"
                      size="small"
                    >
                      <Form.Item
                        name="immunization_history"
                        rules={[{ required: true, message: 'Please enter the field' }]}
                      >
                        <Radio.Group
                          options={[
                            { label: 'Yes / हो', value: '1' },
                            { label: 'No / होइन', value: '0' }
                          ]}
                          onChange={onProtocolChange}
                          value={protocol}
                          optionType="button"
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12} style={{ padding: '0px' }}>
                    <Card title="Nutrition History / पोषण इतिहास" className="mt-10" size="small">
                      <Form.Item
                        name="nutrition_history"
                        rules={[{ required: true, message: 'Please enter the field' }]}
                      >
                        <TextArea rows={1} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12} style={{ padding: '0px' }}>
                    <Card title="Development History / विकास इतिहास" className="mt-10" size="small">
                      <Form.Item
                        name="development_history"
                        rules={[{ required: true, message: 'Please enter the field' }]}
                      >
                        <TextArea rows={1} />
                      </Form.Item>
                    </Card>
                  </Col>
                </>
              ) : null}
            </Col>
            <Col span={24} className="main-div">
              <Card title="Family History / पारिवारिक इतिहास" className="mt-10" size="small">
                <Form.List name="family_history" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, i) => {
                        return (
                          <div style={{ position: 'relative' }} key={i}>
                            <div key={field.key} className={`space${i}`}>
                              <Row style={{ width: '100%' }}>
                                <Col span={12}>
                                  <Form.Item label={i === 0 && 'Question'} name={[field.name, 'question']} hasFeedback>
                                    <Select
                                      showSearch
                                      placeholder="Select Question"
                                      options={FamilyHistoryOption}
                                      optionFilterProp="children"
                                      filterOption={filterOption}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col
                                  span={10}
                                  style={{
                                    marginLeft: '15px',
                                    marginRight: '15px'
                                  }}
                                >
                                  <Form.Item label={i === 0 && 'Answer / जवाफ'} name={[field.name, 'answer']}>
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col md={1}>
                                  {i !== 0 && (
                                    <FormItemDelete
                                      onClick={() => {
                                        // removeAddition(i);
                                        remove(field.name);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </FormItemDelete>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </div>
                        );
                      })}

                      <Form.Item>
                        <FormItemAdd onClick={() => add()} icon={<PlusCircleFilled />}>
                          Add / थप्नुहोस्
                        </FormItemAdd>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item label="Other Relevant Family History" name="relavant_family_history">
                  <Input></Input>
                </Form.Item>
              </Card>
            </Col>
            <Col span={24} className="main-div">
              <Card title="Personal History / पारिवारिक इतिहास" className="mt-10" size="small">
                <Row>
                  <Col span={24} style={{ display: 'flex' }}>
                    <Form.Item name="p_history_group">
                      <Checkbox.Group
                        options={age < 15 ? ChildPersonalHistoryOption : PersonalHistoryOption}
                        defaultValue={['']}
                        onChange={onPersonalHistoryChange}
                      />
                    </Form.Item>
                    {/* <Form.Item name="bowel_bladder_checked" initialValue={BBChecked==true ? 'yes': 'no'}>
                      <Checkbox  onChange={onBBChecked}>Bowel & Bladder/ आन्द्रा र मूत्राशय</Checkbox>
                    </Form.Item>
                    <Form.Item name="allergies_checked">
                      <Checkbox onChange={onAllergiesChecked}>Allergies / एलर्जी</Checkbox>
                    </Form.Item>
                    {age && age > 15 ? (
                      <>
                        <Form.Item name="smoker_checked">
                          <Checkbox onChange={onSmokerChecked}>Smoker / धुम्रपान</Checkbox>
                        </Form.Item>
                        <Form.Item name="alcoholics_checked">
                          <Checkbox onChange={onAlcoholicsChecked}>Alcoholics / मदिरा सेवन</Checkbox>
                        </Form.Item>
                      </>
                    ) : null} */}
                  </Col>
                  {BBChecked && (
                    <Col span={12}>
                      <Card title="Bowel & Bladder" className="mt-10" size="small">
                        <Form.Item name="bowel_and_bladder">
                          <Select
                            defaultValue="Normal"
                            style={{ width: 120 }}
                            allowClear
                            options={[
                              { value: 'Normal', label: 'Normal' },
                              { value: 'Constipation', label: 'Constipation' },
                              { value: 'Diarrhoea', label: 'Diarrhoea' }
                            ]}
                          />
                        </Form.Item>
                      </Card>
                    </Col>
                  )}
                  {allergiesChecked && (
                    <Col span={12}>
                      <Card title="Allergies" className="mt-10" size="small">
                        <AddAllergiesForm />
                        {allergiesData?.data.length > 0 && (
                          <Table
                            columns={alergiesListColumns}
                            className="patientTable"
                            size="small"
                            dataSource={allergiesData.data}
                            pagination={false}
                            style={{ width: '100%' }}
                          />
                        )}
                      </Card>
                    </Col>
                  )}
                  {smokerChecked && (
                    <Col span={12}>
                      <AddSmokerForm />
                    </Col>
                  )}
                  {alcoholicsChecked && (
                    <Col span={12}>
                      <AddAlcoholConsumptionForm />
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
            <Col span={24} className="mt-10 main-div">
              <Card title="Treatment History / उपचारको इतिहास" className="mt-10" size="small">
                <Form.Item name="treatment_history">
                  <TextArea rows={2} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={24} className="main-div">
              <Card title="Socio-Economic History / सामाजिक-आर्थिक इतिहास" className="mt-10" size="small">
                <Row style={{}}>
                  <Col>
                    <Form.Item name="sustainability" initialValue={sustainabilityCheck}>
                      <Checkbox onChange={onSustainabilityCheck}>Enough Income to sustain livelihood.</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="dependent" initialValue={dependentsCheck}>
                      <Checkbox onChange={onDependentsCheck}>Any Dependents at home</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Sanitation at Home" name="home_sanitation">
                      <Select
                        placeholder="Sanitation at home / सरसफाई"
                        style={{ width: 180 }}
                        allowClear
                        options={SanitationOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Sanitation at Office" name="office-sanitation">
                      <Select
                        placeholder="Sanitation at Office Environment / सरसफाई"
                        style={{ width: 180 }}
                        allowClear
                        options={SanitationOption}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Water Consumption" name="water-consumption">
                      <Select
                        placeholder="Water Consumption / पानी खपत"
                        style={{ width: 160 }}
                        allowClear
                        options={WaterConsumptionOption}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} className="main-div">
              <Card title="Examination / परीक्षण" className="mt-10" size="small">
                <Row>
                  <Col span={24}>
                    <Card title="General Appearance " className="mt-10" size="small">
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24} style={{ display: 'flex', alignItems: 'baseline' }}>
                          <Form.Item name="general_appearance_type">
                            <Checkbox.Group options={GeneralAppearanceOption} onChange={onGeneralAppearanceChange} />
                          </Form.Item>
                          <Checkbox onChange={onGCSChecked}>GCS</Checkbox>
                        </Col>
                      </Row>
                    </Card>
                    {GCSCheck && (
                      <Row style={{ flexWrap: 'wrap' }}>
                        {showGCS && (
                          <>
                            <Col span={24}>
                              <Card title="GCS" size="small">
                                <Row>
                                  <Col span={8}>
                                    <Form.Item label="Eye Openning" name="eye_openning">
                                      <Radio.Group onChange={onEyeOpeningChange} value={eyeOpenningValue}>
                                        <Space direction="vertical">
                                          <Radio value={4}>Spontaneous</Radio>
                                          <Radio value={3}>To Sound</Radio>
                                          <Radio value={2}>To Pressure</Radio>
                                          <Radio value={1}>None</Radio>
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Form.Item label="Verbal Response" name="verbal_response">
                                      <Radio.Group onChange={onVerbalResponseChange} value={verbalResponseValue}>
                                        <Space direction="vertical">
                                          <Radio value={5}>Oriented</Radio>
                                          <Radio value={4}>Confused</Radio>
                                          <Radio value={3}>Words</Radio>
                                          <Radio value={2}>Sounds</Radio>
                                          <Radio value={1}>None</Radio>
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Form.Item label="Motor Response" name="motor_response">
                                      <Radio.Group onChange={onMotorResponseChange} value={motorResponseValue}>
                                        <Space direction="vertical">
                                          <Radio value={6}>Obey Commands</Radio>
                                          <Radio value={5}>Localising Pain</Radio>
                                          <Radio value={4}>Normal Flexion</Radio>
                                          <Radio value={3}>Abnormal Flexion</Radio>
                                          <Radio value={2}>Extension</Radio>
                                          <Radio value={1}>None</Radio>
                                        </Space>
                                      </Radio.Group>
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                            <Col span={12}>
                              <Button type="primary" onClick={() => GCSCalculate()}>
                                Calculate GCS
                              </Button>
                            </Col>
                          </>
                        )}
                        <Col span={12}>
                          <Alert
                            message={` GCS : ${GCSValue.toLocaleString()}`}
                            type="error"
                            closable
                            onClose={onClose}
                          />
                        </Col>
                      </Row>
                    )}
                  </Col>
                  <Col span={24}>
                    <BMICalculateForm />
                  </Col>
                  <Col span={12}>
                    <Card title="Vitals / भाइटल्स" className="mt-10" size="small">
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                          <Form.Item label="Blood Pressure / रक्तचाप" name="blood_pressure">
                            <Input
                              onChange={checkBPRange}
                              addonAfter="mmHg"
                              style={{ border: `1px solid ${BPColor || 'white'}` }}
                            />
                          </Form.Item>
                          {BPMessage && (
                            <label
                              style={{
                                color: 'white',
                                background: `${BPColor}`,
                                borderRadius: '4px',
                                padding: '2px',
                                margin: '3px 0'
                              }}
                            >
                              {BPMessage}
                            </label>
                          )}
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Temperature / तापक्रम" name="temperature">
                            <Input
                              onChange={checkTemperature}
                              addonAfter={selectScale}
                              style={{ border: `1px solid ${temperatureColor || 'white'}` }}
                            />
                          </Form.Item>
                          {temperatureMessage && (
                            <label
                              style={{
                                color: 'white',
                                background: `${temperatureColor}`,
                                borderRadius: '4px',
                                padding: '2px',
                                margin: '3px 0'
                              }}
                            >
                              {temperatureMessage}
                            </label>
                          )}
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Pulse / पल्स" name="pulse">
                            <Input
                              onChange={checkPulseRange}
                              addonAfter="bpm"
                              style={{ border: `1px solid ${pulseColor || 'white'}` }}
                            />
                          </Form.Item>
                          {pulseMessage && (
                            <label
                              style={{
                                color: 'white',
                                background: `${pulseColor}`,
                                borderRadius: '4px',
                                padding: '2px',
                                margin: '3px 0'
                              }}
                            >
                              {pulseMessage}
                            </label>
                          )}
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Respiration / श्वासप्रश्वास" name="respiration">
                            <Input
                              onChange={checkRespiration}
                              addonAfter="breaths/min"
                              style={{ border: `1px solid ${respirationColor || 'white'}` }}
                            />
                          </Form.Item>
                          {respirationMessage && (
                            <label
                              style={{
                                color: 'white',
                                background: `${respirationColor}`,
                                borderRadius: '4px',
                                padding: '2px',
                                margin: '3px 0'
                              }}
                            >
                              {respirationMessage}
                            </label>
                          )}
                        </Col>
                        <Col span={24}>
                          <Form.Item label="SPO2 / अक्सिजन स्याचुरेसन" name="saturation">
                            <Row>
                              <Col span={12}>
                                <Input addonAfter="%" style={{ border: '1px solid white' }} />
                              </Col>
                              <Col span={12}>
                                <Select
                                  defaultValue="InRoom"
                                  onChange={saturationPlaceChange}
                                  options={[
                                    { value: 'InRoom', label: 'In Room Air' },
                                    { value: 'OnOxygen', label: 'On Oxygen' }
                                  ]}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="PILCCOD" className="mt-10" size="small">
                      <Form.Item name="pilccod">
                        <Checkbox.Group
                          options={PilccodOption}
                          defaultValue={['']}
                          onChange={onPilccodChange}
                          style={checkboxStyle}
                          className="pilccod"
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="Head To Toe Examination / शिरदेखि पाउँ परीक्षण" className="mt-10" size="small">
                      <Form.Item name="head_to_toe">
                        <TextArea rows={1} />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="Systemic Examination / व्यवस्थित परीक्षा" className="mt-10" size="small">
                      {isNeuroPatient ? (
                        <NeuroForm />
                      ) : (
                        <Row>
                          <Col span={12}>
                            <Card title="Inspection / निरीक्षण" size="small">
                              <Form.Item name="inspection">
                                <TextArea rows={1} />
                              </Form.Item>
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card title="Palpation / पल्पेशन" size="small">
                              <Form.Item name="palpation">
                                <TextArea rows={1} />
                              </Form.Item>
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card title="Percussion / पर्कशन" size="small">
                              <Form.Item name="percussion">
                                <TextArea rows={1} />
                              </Form.Item>
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card title="Auscultation / अस्कल्टेशन" size="small">
                              <Form.Item name="auscultation">
                                <TextArea rows={1} />
                              </Form.Item>
                            </Card>
                          </Col>
                        </Row>
                      )}
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} className="main-div">
              <Card title="Provisional Diagnosis / अस्थायी निदान" className="mt-10" size="small">
                <Form.Item
                  name="provisional_diagnosis"
                  rules={[{ required: true, message: 'Please enter the Diagnosis!' }]}
                >
                  <TextArea rows={2} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Card>

        {chatGptResponse && (
          <Col span={24} style={{ marginTop: '20px' }}>
            <Card
              title="AI Response"
              actions={[
                <Button type="primary" key="book" onClick={openCloseAppointmentModal}>
                  Book an Appointment
                </Button>
              ]}
            >
              {chatGptResponse} <br /> <br />
              **Note :{' '}
              <span style={{ color: 'red' }}>
                This data is generated by an AI, and while it can provide information and insights, it is not a
                substitute for professional medical advice. For the best and most accurate treatment recommendations,
                please consult a healthcare professional or doctor.
              </span>
            </Card>
          </Col>
        )}

        <Form.Item style={{ float: 'right', marginTop: '20px', justifyContent: 'space-between' }}>
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: '#fff',
              marginLeft: '10px'
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
              color: '#fff',
              marginLeft: '10px'
            }}
            size="middle"
            htmlType="submit"
          >
            <DiffOutlined />
            Add Lab / प्रयोगशाला थप्नुहोस्
          </Button>
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: '#fff',
              marginLeft: '10px'
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
              color: '#fff',
              marginLeft: '10px'
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
              boxShadow: 'none',
              borderColor: Colors.FIRE_RED,
              color: Colors.FIRE_RED,
              marginLeft: '10px'
            }}
            onClick={openCloseBackModal}
          >
            <CloseSquareOutlined />
            Cancel
          </Button>
        </Form.Item>
      </Form>

      <PatientFormDrawer openDrawer={openDrawer} onClose={onClose} />
      <AddAppointmentModal isModalOpen={openAppointmentModal} handleCancel={openCloseAppointmentModal} data={data} />

      <Modal
        title={
          <div style={{ color: 'red' }}>
            <DeleteOutlined /> Remove Patient
          </div>
        }
        open={deleteModal}
        onCancel={openCloseDeleteModal}
        onOk={removePatient}
        width="30vw"
        className="modal-content-responsive"
        style={{ fontSize: '16px' }}
        okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
      >
        <p>Are you sure you want to remove the patient ?</p>
      </Modal>

      <Modal
        title={<div style={{ color: 'red' }}>Back</div>}
        open={backModal}
        onCancel={openCloseBackModal}
        onOk={onCancelClick}
        width="30vw"
        className="modal-content-responsive"
        style={{ fontSize: '16px' }}
        okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
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
    </>
  );
};

export default OpdForm;
