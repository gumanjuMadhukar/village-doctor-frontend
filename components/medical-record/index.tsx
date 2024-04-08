import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Form, Row } from 'antd';
import HighChart from 'components/charts';
import AddLabRequestModal from 'components/opd/Modal/AddLabRequestModal';
import AddPrescriptionModal from 'components/opd/Modal/AddPrescription';
import AddVitalModal from 'components/opd/Modal/AddVitalModal';
import LabRequest from 'components/print/LabRequest/LabRequest';
import OpdMedicinePrint from 'components/print/OpdMedicine';
import Prescription from 'components/print/Prescription';
import LabTestUpload from 'components/shared/LabTestUpload';
import { VitalSigns } from 'constants/schemas/vitals';
import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import VitalsTable from 'shared/vitals-table';
import Colors from 'utils/colors';

import HistoryModal from './history/modal';
import MedicineList from './medicine';
interface Props {
  medicalRecord: any;
}
interface ChartData {
  chartType: string;
  chartTitle: string;
  xAxisTitle: string;
  yAxisTitle: string;
  seriesData: { name: string; data: any[] }[];
  categories: string[];
}
const MedicalRecordView = ({ medicalRecord }: Props) => {
  const [openVitalModal, setOpenVitalModal] = useState(false);
  const [form] = Form.useForm();
  const [openLabModal, setOpenLabModal] = useState(false);
  const [openPastHistoryModal, setOpenPastHistoryModal] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const printRef = React.useRef<HTMLDivElement | null>(null);
  const printMedicineRef = React.useRef<HTMLDivElement | null>(null);
  const printLabRef = React.useRef<HTMLDivElement | null>(null);
  const openCloseVitalModal = () => {
    setOpenVitalModal(!openVitalModal);
  };
  const openCloseLabModal = () => {
    setOpenLabModal(!openLabModal);
  };
  const openClosePastHistoryModal = () => {
    setOpenPastHistoryModal(!openPastHistoryModal);
    form.resetFields();
  };
  const openClosePrescriptionModal = () => {
    setOpenPrescriptionModal(!openPrescriptionModal);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Prescription',
    pageStyle: `
      @page {
        size: portrait;
      }
    `
  });
  const handleMedicinePrint = useReactToPrint({
    content: () => printMedicineRef.current,
    documentTitle: 'MedicinePrint',
    pageStyle: `
   @page {
    size: portrait;
   }
   `
  });
  const handleLabRequestPrint = useReactToPrint({
    content: () => printLabRef.current,
    documentTitle: 'Lab',
    pageStyle: `
      @page {
        size: portrait;
      }
    `
  });

  const VitalsData = medicalRecord?.vitals;
  console.log(VitalsData, 'vd');
  console.log(typeof VitalsData, 'vd-type');

  const extractSeriesData = (VitalsData: any, vitalSign: any) => {
    return VitalsData?.map((point: any) => {
      return [point.created_at, parseFloat(point[vitalSign]) || null];
    });
  };

  // const chartDiseaseWise = [
  //   {
  //     chartType: "line",
  //     chartTitle: "Blood Pressure",
  //     xAxisTitle: "Time Taken",
  //     yAxisTitle: "Measurements",
  //     seriesData: [
  //       {
  //         name: "Blood Pressure",
  //         data: extractSeriesData(VitalsData, "blood_pressure"),
  //       },
  //     ],
  //     categories: VitalsData?.map((point:any) =>
  //       new Date(point.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     ),
  //   },
  //   {
  //     chartType: "spline",
  //     chartTitle: "Temperature",
  //     xAxisTitle: "Time Taken",
  //     yAxisTitle: "Measurements",
  //     seriesData: [
  //       {
  //         name: "Temperature",
  //         data: extractSeriesData(VitalsData, "temperature"),
  //       },
  //     ],
  //     categories: VitalsData?.map((point:any) =>
  //       new Date(point.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     ),
  //   },
  //   {
  //     chartType: "spline",
  //     chartTitle: "Pulse",
  //     xAxisTitle: "Time Taken",
  //     yAxisTitle: "Measurements",
  //     seriesData: [
  //       {
  //         name: "Pulse",
  //         data: extractSeriesData(VitalsData, "pulse"),
  //       },
  //     ],
  //     categories: VitalsData?.map((point:any) =>
  //       new Date(point.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     ),
  //   },
  //   {
  //     chartType: "column",
  //     chartTitle: "Respiration",
  //     xAxisTitle: "Time Taken",
  //     yAxisTitle: "Measurements",
  //     seriesData: [
  //       {
  //         name: "Respiration",
  //         data: extractSeriesData(VitalsData, "respiration"),
  //       },
  //     ],
  //     categories: VitalsData?.map((point:any) =>
  //       new Date(point.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     ),
  //   },
  //   {
  //     chartType: "spline",
  //     chartTitle: "Saturation",
  //     xAxisTitle: "Time Taken",
  //     yAxisTitle: "Measurements",
  //     seriesData: [
  //       {
  //         name: "Saturation",
  //         data: extractSeriesData(VitalsData, "saturation"),
  //       },
  //     ],
  //     categories: VitalsData.map((point:any) =>
  //       new Date(point.created_at).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     ),
  //   },
  // ];

  const CreateChartObject = (
    chartType: string,
    chartTitle: string,
    seriesName: string,
    yAxisTitle: string,
    vitalType: string,
    VitalsData: any[]
  ): ChartData => ({
    chartType,
    chartTitle,
    xAxisTitle: 'Time Taken',
    yAxisTitle,
    seriesData: [
      {
        name: seriesName,
        data: extractSeriesData(VitalsData, vitalType)
      }
    ],
    categories:
      VitalsData?.map(point =>
        new Date(point.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      ) || []
  });
  const chartDiseaseWise: ChartData[] = VitalSigns.map(({ chartType, chartTitle, seriesName, yAxisTitle, vitalType }) =>
    CreateChartObject(chartType, chartTitle, seriesName, yAxisTitle, vitalType, VitalsData)
  );
  return (
    <Col
      lg={24}
      sm={24}
      className="search-col-margin"
      style={{ margin: '0px 0 0 20px', background: '#fffffd' }}
      key={medicalRecord?.id}
    >
      {medicalRecord && <OpdMedicinePrint ref={printMedicineRef} defaultValue={medicalRecord} />}
      {medicalRecord && <Prescription ref={printRef} defaultValue={medicalRecord} />}
      {medicalRecord && <LabRequest ref={printLabRef} defaultValue={medicalRecord} />}
      <Card
        title="Medical Record"
        style={{
          borderRadius: '10px 10px 0px 0px',
          background: 'rgba(89, 171, 227, 0.2)',
          color: 'rgb(82, 179, 217)',
          height: '60px'
        }}
        extra={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: '10px' }}>Recorded Date: {medicalRecord?.record_date}</div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                handlePrint();
              }}
              icon={<PrinterOutlined />}
            >
              {' '}
              Print
            </Button>
          </div>
        }
      />
      <Card title="Chief Complain" className="mt-10" size="small" key={medicalRecord?.id}>
        {medicalRecord?.complain?.map((data: any) => {
          return (
            <>
              {data?.complaint?.name} * {data?.duration} <br />
            </>
          );
        })}
      </Card>
      {medicalRecord?.medicalRecordDetails?.map((data: any) => {
        return (
          <>
            <Card title="HOPI" className="mt-10" size="small" key={data?.id}>
              <Badge.Ribbon text={data?.from}>
                <Card size="small">{data?.hopi}</Card>
              </Badge.Ribbon>
              <Badge.Ribbon text='Doctor Name'>
                <Card size="small">{data?.hopi}</Card>
              </Badge.Ribbon>
            </Card>
          </>
        );
      })}

      <Card
        title="Past History"
        className="mt-10"
        size="small"
        // key={index}
        extra={
          <Button
            style={{
              backgroundColor: Colors.MAIN_BACKGROUND,
              color: '#fff',
              marginLeft: '10px'
            }}
            size="middle"
            onClick={() => {
              openClosePastHistoryModal();
            }}
          >
            {' '}
            <PlusOutlined />
            Add Past History{' '}
          </Button>
        }
      >
        {medicalRecord?.patient_history &&
          medicalRecord?.patient_history?.map((data: any) => {
            return (
              <>
                <Row>
                  <Col md={12}>
                    <Card title="Medical History" className="mt-10" size="small">
                      {data?.medical_history}
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card title="Surgical History" className="mt-10" size="small">
                      {data?.surgical_history}
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card title="Family History" className="mt-10" size="small">
                      {data?.family_history.map((item: any, index: number) => {
                        return (
                          <React.Fragment key={index}>
                            {Array.isArray(item) ? (
                              // If the item is an array (nested questions and answers)
                              item.map((nestedItem, nestedIndex) => (
                                <React.Fragment key={nestedIndex}>
                                  {nestedItem?.question} <br /> {nestedItem?.answer} <br />
                                </React.Fragment>
                              ))
                            ) : (
                              // If the item is an object (family_relavant_history)
                              <>
                                {item?.family_relavant_history} <br />
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card
                      title="Personal History"
                      className="mt-10"
                      size="small"
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <strong>{data?.personal_history?.personal_history}</strong>
                      <p>{data?.personal_history?.units_per_week?.percentage_of_alcohol}</p>
                      {data?.personal_history?.pack_year?.no_of_cigarettes}
                    </Card>
                  </Col>
                  {data?.birth_history && (
                    <Col md={12}>
                      <Card title="Birth History" className="mt-10" size="small">
                        {data?.birth_history}
                      </Card>
                    </Col>
                  )}
                  {data?.development_history && (
                    <Col md={12}>
                      <Card title="Development History" className="mt-10" size="small">
                        {data?.development_history}
                      </Card>
                    </Col>
                  )}
                  {data?.immunization_history && (
                    <Col md={12}>
                      <Card title="Immunization History" className="mt-10" size="small">
                        {data?.immunization_history}
                      </Card>
                    </Col>
                  )}
                  {data?.nutrition_history && (
                    <Col md={12}>
                      <Card title="Nutrition History" className="mt-10" size="small">
                        {data?.nutrition_history}
                      </Card>
                    </Col>
                  )}
                </Row>
              </>
            );
          })}
      </Card>

      <Card title="Treatment History" className="mt-10" size="small">
        {medicalRecord?.treatment_history}
      </Card>

      <Card title="Socio-Economic History" className="mt-10" size="small">
        {medicalRecord?.socio_economic_history}
      </Card>
      <Card title="Examination " className="mt-10" size="small">
        <Row>
          {medicalRecord?.examination?.map((data: any, index: number) => {
            return (
              <>
                <Col md={24} key={index}>
                  <Card
                    title="Vital"
                    className="mt-10"
                    size="small"
                    extra={
                      <Button
                        style={{
                          backgroundColor: Colors.MAIN_BACKGROUND,
                          color: '#fff',
                          marginLeft: '10px'
                        }}
                        size="middle"
                        onClick={() => {
                          openCloseVitalModal();
                        }}
                      >
                        {' '}
                        <PlusOutlined />
                        Add Vitals
                      </Button>
                    }
                  >
                    <VitalsTable vitalData={medicalRecord?.vitals} />
                    <Row>
                      {chartDiseaseWise.map((chart, index) => (
                        <Col span={12} key={index}>
                          <HighChart chartData={chart} height={'270px'} />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
                <Col md={24} key={index}>
                  <Card title="Pilccods" className="mt-10" size="small">
                    {data?.head_to_toe}
                  </Card>
                </Col>
                <Col md={24} key={index}>
                  <Card title="BMI" className="mt-10" size="small">
                    {medicalRecord?.bmi?.map((data: any) => {
                      return (
                        <div key={index} style={{display:'flex', gap:'10px'}}>
                          <span>Height: {data?.height} cm</span>
                          <span>Weight: {data?.weight} kg</span>
                          <span>BMI: {data?.bmi}</span>
                        </div>
                      );
                    })}
                  </Card>
                </Col>
                <Col md={12} key={index}>
                  <Card title="Auscultation" className="mt-10" size="small">
                    {data?.auscultation}
                  </Card>
                </Col>
                <Col md={12} key={index}>
                  <Card title="Inspection" className="mt-10" size="small">
                    {data?.inspection}
                  </Card>
                </Col>
                <Col md={12} key={index}>
                  <Card title="Percussion" className="mt-10" size="small">
                    {data?.percussion}
                  </Card>
                </Col>
                <Col md={12} key={index}>
                  <Card title="Palpation" className="mt-10" size="small">
                    {data?.percussion}
                  </Card>
                </Col>
                <Col md={24} key={index}>
                  <Card title="Head to toe examination" className="mt-10" size="small">
                    {data?.head_toe_examination}
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Card>
      {medicalRecord?.medicalRecordDetails?.map((data: any) => {
        return (
          <Card title="Provisional Diagnosis" className="mt-10" size="small" key={data?.id}>
            <>{data?.provisional_diagnosis}</>
          </Card>
        );
      })}
      <Card
        title="Medicines"
        className="mt-10"
        size="small"
        extra={
          <Button
            style={{
              backgroundColor: Colors.MAIN_BACKGROUND,
              color: '#fff',
              marginLeft: '10px'
            }}
            size="middle"
            onClick={openClosePrescriptionModal}
          >
            <PlusOutlined />
            Add Medication
          </Button>
        }
      >
        <>{<MedicineList medication={medicalRecord?.id} print={handleMedicinePrint} />}</>
      </Card>
      <Card
        title="Test Reports"
        headStyle={{ fontSize: '16px' }}
        className="mt-10"
        size="small"
        extra={
          <Button
            style={{
              backgroundColor: Colors.MAIN_BACKGROUND,
              color: '#fff',
              marginLeft: '10px'
            }}
            size="middle"
            onClick={openCloseLabModal}
          >
            <PlusOutlined />
            Add Lab Report
          </Button>
        }
      >
        <Row>
          <Col span={12}>
            <Card
              title="Lab Tests"
              size="small"
              extra={
                <Button
                  style={{
                    backgroundColor: Colors.MAIN_BACKGROUND,
                    color: '#fff',
                    marginLeft: '10px'
                  }}
                  size="small"
                  onClick={handleLabRequestPrint}
                >
                  <PrinterOutlined/>
                  Print Lab Request
                </Button>
              }
            ></Card>
          </Col>
          <Col span={12}>
            <LabTestUpload />
          </Col>
        </Row>
      </Card>
      <HistoryModal
        handleCancel={openClosePastHistoryModal}
        isModalOpen={openPastHistoryModal}
        defaultValue={medicalRecord?.patient_history}
        form={form}
      />
      <AddVitalModal
        isModalOpen={openVitalModal}
        handleCancel={openCloseVitalModal}
        recordId={medicalRecord?.id}
      ></AddVitalModal>
      <AddPrescriptionModal
        handleCancel={openClosePrescriptionModal}
        isModalOpen={openPrescriptionModal}
        patient_id={medicalRecord?.id}
      ></AddPrescriptionModal>
      <AddLabRequestModal
        isModalOpen={openLabModal}
        handleCancel={openCloseLabModal}
        medical_record_id={medicalRecord?.id}
      ></AddLabRequestModal>
    </Col>
  );
};

export default MedicalRecordView;
