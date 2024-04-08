import { UsergroupAddOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from '@types';
import { Card, Col, Modal, QRCode, Row, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getAllAppointment } from 'apis/admin/appointment';
import { getInfoCardDetails } from 'apis/dashboard';
import HighChart from 'components/charts';
// import { SupportedLanguage } from 'configs/i18n';
import { DEFAULT_PAGE_SIZE, INITIAL_CURRENT_PAGE } from 'constants/common';
import { AppointmentCommonColumns } from 'constants/schema';
import Link from 'next/link';
// import { useLocale } from 'providers';
import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background-color: #f6f7f9;
  height: 100vh;
  padding: 20px 30px;
  @media (max-width: 1024px) {
    padding: 15px;
  }
  @media (max-width: 991px) {
    padding: 10px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 30px 0;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CardsContainer = styled.div`
  width: 100%;
  line-height: 0.1;
  margin-top: 20px;
`;

const chartDataBar = {
  chartType: 'pie',
  chartTitle: 'Distribution with gender / लैङ्गिक वितरण ',
  xAxisTitle: 'Patients',
  yAxisTitle: '',
  seriesData: [
    {
      name: 'Percentage',
      colorByPoint: true,
      data: [
        {
          name: 'Male/ पुरुष',
          y: 55.02
        },

        {
          name: 'Female / महिला ',
          y: 44
        },
        {
          name: 'Other / अन्य',
          y: 1
        }
      ]
    }
  ],
  categories: [10, 20, 30, 40, 50], // Corrected from datacategory
  type: 'district'
};

const chartAgeGroupWise = {
  chartType: 'column',
  chartTitle: 'Age Group / उमेर समूह',
  xAxisTitle: 'Patients',
  yAxisTitle: '',
  seriesData: [
    {
      name: 'Patient Count / बिरामी गणना',
      colorByPoint: true,
      data: [20, 30, 40, 20, 10, 5, 4, 0, 1]
    }
  ],
  categories: [10, 20, 30, 40, 50], // Corrected from datacategory
  xAxis: {
    categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90'],
    crosshair: true,
    accessibility: {
      description: 'Countries'
    }
  }
};

const chartDiseaseWise = {
  chartType: 'column',
  chartTitle: 'Disease Wise / रोग अनुसार',
  xAxisTitle: 'Patients',
  yAxisTitle: '',
  seriesData: [
    {
      name: 'Patient Count / बिरामी गणना',
      colorByPoint: true,
      data: [20, 30, 40, 20, 10]
    }
  ],
  categories: [10, 20, 30, 40, 50], // Corrected from datacategory
  xAxis: {
    categories: [
      'Headache / टाउको दुख्ने',
      'Cold / रुगा',
      'Cough / खोकी',
      'Chest Pain / छातीको दुखाइ',
      'Fever / ज्वरो'
    ],
    crosshair: true,
    accessibility: {
      description: 'Countries'
    }
  }
};


interface FilterParams {
  currentPage: number;
  pageSize: number;
}


const Dashboard: NextPageWithLayout = (): JSX.Element => {

  const [viewQR, setViewQR] = useState(false);
  const [userQRUrl, setUserQRurl] = useState<string>('');
  const handleQRView = (record:any) => {
    setViewQR(true);
    console.log(record);
    setUserQRurl(record?.user?.teams_link);
  };

  const [filterParams, setFilterParams] = useState<FilterParams>({
    currentPage: INITIAL_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE
  });

  // const { changeLanguage, language } = useLocale();
  // const changeLang = (lang: SupportedLanguage) => {
  //   changeLanguage(lang);
  // };
  // console.log(language);
  // useEffect(() => {
  //   changeLanguage('en');
  // }, [language]);

  const { data: appointmentList } = useQuery(['allAppointmentList', { filterParams }], getAllAppointment);
  const { data: infoDetails } = useQuery(['cardInfoDetails', { filterParams }], getInfoCardDetails);

  const appointmentListColumns: ColumnsType<any> = [
   ...AppointmentCommonColumns,
    {
      title: 'Meeting Link',
      dataIndex: 'status',
      key: 'status',
      // render: text => <Tag color={Colors.ALGAE_GREEN}>{text}</Tag>
      render: (_text, record) => {
        return (
          <div onClick={()=>handleQRView(record)}>
            <QRCode value={record?.user?.teams_link} size={50} />
          </div>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Tooltip title="Join Meeting" className="semi-bold" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
            <Link href={record?.user?.teams_link} type="primary" style={{ marginLeft: '10px' }} target="_blank">
            <UsergroupAddOutlined />
          </Link>
          </Tooltip>
        );
      },
      width: 60
    }
  ];
  
  // const { t } = useTranslation(['general', 'sidebar']);
  return (
    <DashboardContainer>
      <InfoSection>
        <CardsContainer>
          {/* <button onClick={() => changeLang('np')}>Nepali</button>
          <button onClick={() => changeLang('en')}>English</button> */}

          <h3 style={{ fontSize: '24px', fontWeight: '500' }}>Welcome back / स्वागत छ</h3>
          {/* {t('general:yes')}
          {t('sidebar:urls.dashboard')} */}
          <span>there is the latest for the last 7 days, check now</span>
          <span>/ पछिल्लो 7 दिनको ग्राफिकल विवरण</span>
          <div className="inner"></div>
          <Row style={{ justifyContent: 'space-between', margin: '20px 0px' }} gutter={24}>
            <Col md={6} style={{ paddingLeft: '0px' }}>
              <div className="card widget-flat text-bg-primary">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-wallet-2-line widget-icon"></i>
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Patients / बिरामी
                  </h6>
                  <h2 className="my-2">{infoDetails?.data?.patients_count}</h2>
                  <p className="mb-0">
                    {/* <span className="badge bg-white bg-opacity-10 me-1">18.25%</span> */}
                    <span className="text-nowrap">Since last month / गत महिना देखि</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="card widget-flat text-bg-purple">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-wallet-2-line widget-icon"></i>
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    OPD / ओ.पि.डी
                  </h6>
                  <h2 className="my-2">{infoDetails?.data?.opd_count}</h2>
                  <p className="mb-0">
                    {/* <span className="badge bg-white bg-opacity-10 me-1">18.25%</span> */}
                    <span className="text-nowrap">Since last month / गत महिना देखि</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="card widget-flat text-bg-pink">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-wallet-2-line widget-icon"></i>
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    Appointments/ समय सूची
                  </h6>
                  <h2 className="my-2">{infoDetails?.data?.appointment_count}</h2>
                  <p className="mb-0">
                    {/* <span className="badge bg-white bg-opacity-10 me-1">18.25%</span> */}
                    <span className="text-nowrap">Since last month / गत महिना देखि</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="card widget-flat text-bg-info">
                <div className="card-body">
                  <div className="float-end">
                    <i className="ri-wallet-2-line widget-icon"></i>
                  </div>
                  <h6 className="text-uppercase mt-0" title="Customers">
                    AI Resolved / ए.आई समाधान गरियो
                  </h6>
                  <h2 className="my-2">50</h2>
                  <p className="mb-0">
                    {/* <span className="badge bg-white bg-opacity-10 me-1">18.25%</span> */}
                    <span className="text-nowrap">Since last month / गत महिना देखि</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col md={24}>
              <Card title="Appointment List / समय सूची" extra={<span>Total Appointments: {appointmentList?.meta.total.toLocaleString()}</span>}>
                <Table
                  className="appointmentTable"
                  columns={appointmentListColumns}
                  dataSource={appointmentList?.data}
                  scroll={{ x: 1000 }}
                  pagination={
                    appointmentList?.meta?.total > filterParams.pageSize && {
                      ...filterParams,
                      defaultPageSize: filterParams.pageSize,
                      total: appointmentList?.meta?.total,
                      hideOnSinglePage: true,
                      showSizeChanger: true,
                      current: +filterParams.currentPage,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      onChange: (page, pageSize) => {
                        setFilterParams({
                          ...filterParams,
                          currentPage: page,
                          pageSize
                        });
                      }
                    }
                  }
                />
              </Card>
            </Col>
            <Col md={12} style={{ marginTop: '20px' }}>
              <HighChart chartData={chartDataBar} />
            </Col>
            <Col md={12} style={{ marginTop: '20px' }}>
              <HighChart chartData={chartDiseaseWise} />
            </Col>
            <Col md={24} style={{ marginTop: '20px' }}>
              <HighChart chartData={chartAgeGroupWise} />
            </Col>
          </Row>
        </CardsContainer>
      </InfoSection>
      {viewQR && (
      <Modal title="" open={viewQR} onCancel={() => setViewQR (false)} footer={false} style={{display:"flex" , justifyContent:"center", padding:"20px" }} >
        <QRCode value={userQRUrl} size={350} />
      </Modal>
    )}
    </DashboardContainer>
   
  );
};

export default Dashboard;
