import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { createNewPatient, getAddress, getFamilyHead } from 'apis/admin/patient';
import { districtData, getAddressOption, municipalityData, provinceData, ReligionOption } from 'constants/schema';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Colors from 'utils/colors';
import { Gender, MaritalStatus } from 'utils/enums';
import { calculateAge } from 'utils/helpers';

interface PatientData {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: string;
  ward_no: string;
  contact_number: string;
  head_contact: string;
  gender: string;
  address: string;
}

const PatientForm: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [image, setImage] = useState('string');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState(false);
  const [isHead, setIsHead] = useState<number>(0);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [age, setAge] = useState<number>();
  const [househeadNo, setHouseheadNo] = useState<number>();
  const [selectedProvince, setSelectedProvince] = useState<string>(provinceData[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedMunicipality('');
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedMunicipality('');
  };

  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value);
  };
  const createPatientMutation = useMutation(createNewPatient, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['AllowanceData']);
      queryClient.invalidateQueries(['allPatientList']);
      form.resetFields();
      message.success('Patient have been created successfully');
      setPatientData(data);
      setShowModal(true);
    },
    onError: (data: any) => {
      const errorMessage = data?.response?.data?.message;
      message.error(errorMessage);
    }
  });

  const { data: houseHeadData, refetch } = useQuery(['patient', househeadNo], getFamilyHead, {
    enabled: !!househeadNo
  });

  const { data: addressData } = useQuery(['addressData'], getAddress);

  const handleBlur = (e: any) => {
    if (e.target.value.length === 10) {
      setHouseheadNo(e.target.value);
      refetch();
    }
  };
  const { provinceOption, districtOption, municipalityOption } = getAddressOption(addressData);
  const closeModal = () => {
    setShowModal(false);
  };
  const handlePrint = () => {
    if (patientData && patientData.id) {
      const width = 600;
      const height = 400;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      const newTab = window.open(
        `/ward/${patientData.id}`,
        'PopupWindow',
        `width=${width}, height=${height}, top=${top}, left=${left}`
      );
      if (newTab) {
        newTab.focus();
      }
    }
  };
  const onFinish = (data: any) => {
    const formData = {
      ...data,
      date_of_birth: dayjs(data.date_of_birth).format('YYYY-MM-DD'),
      contact_number: data.contact_no,
      images: image,
      is_house_head: isHead
    };
    createPatientMutation.mutate(formData);
  };

  const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
    const patientAge = calculateAge(dateString);
    setAge(patientAge);
  };

  const onHeadChecked = (e: CheckboxChangeEvent) => {
    const checkedValue = e.target.checked ? 1 : 0;
    setIsHead(checkedValue);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    handleStartCamera();
  }, []);

  useEffect(() => {
    form.setFieldValue('age', age);
    form.setFieldValue('isHead', isHead);
    if (houseHeadData) {
      form.setFieldValue('address', houseHeadData.address);
      form.setFieldValue('ward_no', houseHeadData.ward_no);
    }
  }, [age, isHead, form, houseHeadData]);

  const handleStartCamera = async () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      try {
        // Get user media (camera) and set it as video source
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        videoElement.srcObject = mediaStream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const handleCapturePhoto = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      // Get the video element dimensions
      const videoWidth = videoElement.videoWidth;
      const videoHeight = videoElement.videoHeight;

      // Set the canvas element dimensions to match the video element
      canvasElement.width = videoWidth;
      canvasElement.height = videoHeight;

      // Draw the current video frame onto the canvas
      const canvasContext = canvasElement.getContext('2d');
      if (canvasContext) {
        canvasContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
        const imageDataUrl = canvasElement.toDataURL('image/jpeg'); // Get the data URL of the captured photo
        setImage(imageDataUrl);
      }
    }
  };
  const { Option } = Select;

  return (
    <Form
      name="create-patient-form / नयाँ फारम सिर्जना गर्नुहोस्"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      form={form}
      style={{
        padding: '30px'
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24} style={{ right: '0' }} className={`profile-img`}>
          <div className="concent">
            <label style={{ fontSize: '11px', fontWeight: '500' , color:'red' }}>
              *I hereby grant [Your Organizations Name] permission to use my photographs on its website and
              associated web platforms.{' '}
            </label>
            <br></br>
            <label htmlFor="" style={{ fontSize: '11px', fontWeight: '500', color:'red' }}>
              {' '}
              *I hereby consent to participate voluntarily in the research study titled [Title of the Research Study]
              conducted by [Researchers Name] from [Institutions Name].
            </label>
          </div>
          <div>
            <video ref={videoRef} style={{ width: '180px' }} autoPlay />
            <canvas ref={canvasRef} style={{ maxWidth: '30%', marginLeft: '20px' }} />
          </div>
          <Button
            style={{
              backgroundColor: Colors.PRIMARY,
              color: '#fff'
            }}
            size="small"
            onClick={handleCapturePhoto}
          >
            Capture Photo / फोटो खिच्नुहोस्
          </Button>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            label="First Name / पहिलो नाम"
            name="first_name"
            rules={[{ required: true, message: 'Please enter First Name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Middle Name / बीचको नाम" name="middle_name">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            label="Last Name / थर"
            name="last_name"
            rules={[{ required: true, message: 'Please enter Last name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Date of Birth / जन्म मिति" name="date_of_birth">
            <DatePicker onChange={onDateChange} style={{ width: '100%' }} placeholder="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Age / उमेर"
            name="age"
            rules={[
              { required: true, message: 'Please enter Age' },
              { pattern: /^[\d]{0,3}$/, message: 'Invalid Number!' }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Religion / धर्म"
            name="religion"
            rules={[{ required: true, message: 'Please enter Religion!' }]}
          >
            <Select
              showSearch
              placeholder="Select Religion"
              optionFilterProp="children"
              filterOption={filterOption}
              options={ReligionOption}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            label="Gender / लिङ्ग"
            name="gender"
            rules={[{ required: true, message: 'Please choose gender!' }]}
          >
            <Radio.Group>
              <Radio value={Gender.MALE}>Male / पुरुष</Radio>
              <Radio value={Gender.FEMALE}>Female / महिला</Radio>
              <Radio value={Gender.OTHER}>Other / अन्य</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Marital Status / वैवाहिक स्थिति"
            name="marital_status"
            rules={[{ required: true, message: 'Please choose marital status!' }]}
          >
            <Radio.Group>
              <Radio value={MaritalStatus.MARRIED}>Married</Radio>
              <Radio value={MaritalStatus.SINGLE}>Single</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phone / फोन"
            name="contact_no"
            rules={[
              { required: true, message: 'Please enter phone number!' },
              {
                pattern: /^[\d]{10}$/,
                message: 'Invalid Number!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <strong>Permanent Address</strong>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Province / प्रान्त"
            name="province_id"
            rules={[{ required: true, message: 'Please enter province!' }]}
          >
            {/* <Select showSearch placeholder="Select Province" filterOption={filterOption} options={provinceOption} /> */}
            <Select
              // defaultValue={provinceData[0]}
              value={selectedProvince}
              style={{ width: 120 }}
              onChange={handleProvinceChange}
              options={provinceData.map(province => ({ label: province, value: province }))}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="District / जिल्ला"
            name="district_id"
            rules={[{ required: true, message: 'Please enter district!' }]}
          >
            {/* <Select showSearch placeholder="Select District" filterOption={filterOption} options={districtOption} /> */}
            <Select value={selectedDistrict} onChange={handleDistrictChange}>
              {districtData[selectedProvince]?.map(district => (
                <Option key={district} value={district}>
                  {district}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Municipality / नगरपालिका"
            name="municipality_id"
            rules={[{ required: true, message: 'Please enter municipality!' }]}
          >
            <Select value={selectedMunicipality} onChange={handleMunicipalityChange}>
              {municipalityData[selectedDistrict]?.map(municipality => (
                <Option key={municipality} value={municipality}>
                  {municipality}
                </Option>
              ))}
            </Select>
            {/* <Select showSearch placeholder="Select District" filterOption={filterOption} options={municipalityOption} /> */}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Ward / वार्ड" name="ward_no" rules={[{ required: true, message: 'Please enter ward!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Address / ठेगाना"
            name="address"
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <strong>Current Address</strong>
          <Checkbox onChange={() => setPermanentAddress(!permanentAddress)}>Same as Permanent</Checkbox>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Province / प्रान्त"
            name={permanentAddress ? 'province_id' : 'c_province_id'}
            className={permanentAddress ? 'province_id' : 'c_province_id'}
          >
            <Select showSearch placeholder="Select Province" filterOption={filterOption} options={provinceOption} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="District / जिल्ला"
            name={permanentAddress ? 'district_id' : 'c_district_id'}
            rules={[{ required: true, message: 'Please enter district!' }]}
          >
            <Select showSearch placeholder="Select District" filterOption={filterOption} options={districtOption} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Municipality / नगरपालिका"
            name={permanentAddress ? 'municipality_id' : 'c_municipality_id'}
            rules={[{ required: true, message: 'Please enter municipality!' }]}
          >
            <Select showSearch placeholder="Select District" filterOption={filterOption} options={municipalityOption} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Ward / वार्ड" name="ward_no" rules={[{ required: true, message: 'Please enter ward!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Address / ठेगाना"
            name={permanentAddress ? 'address' : 'c_address'}
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email (optional) / इमेल"
            name="email"
            rules={[{ pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Invalid email' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Citizenship Number / नागरिकता नम्बर" name="citizenship_no">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="NID Number / राष्ट्रिय परिचय पत्र" name="nid_no">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Blood Group / ब्लड ग्रुप" name="blood_group">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Insurance Number / बीमा नम्बर" name="insurance_no">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="  " name="is_head" initialValue={isHead}>
            <Checkbox onChange={onHeadChecked}>Is Head / प्रमुख</Checkbox>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Family Head Contact / परिवार प्रमुखको सम्पर्क"
            name="househead_no"
            rules={[
              {
                pattern: /^[\d]{10}$/,
                message: 'Invalid Number!'
              }
            ]}
          >
            <Input onBlur={handleBlur} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ float: 'right' }}>
        <Button
          style={{
            backgroundColor: Colors.PRIMARY,
            color: '#fff'
          }}
          size="large"
          htmlType="submit"
        >
          Save
        </Button>
      </Form.Item>
      <Modal
        title="Patient Information"
        open={showModal}
        onCancel={closeModal}
        footer={[
          <Button key="print" onClick={handlePrint} style={{ display: 'none' }}>
            Print ID
          </Button>
        ]}
      >
        {patientData && (
          <div>
            <h2>ID: {patientData.id}</h2>
            <h2>
              Name: {patientData.first_name} {patientData.last_name}
            </h2>
            <p>DOB: {patientData.date_of_birth}</p>
            <p>Age: {patientData.age}</p>
            <p>Phone.no: {patientData.contact_number}</p>
            <p>Gender: {patientData.gender}</p>
            <p>Address: {patientData.address}</p>
            <p>Ward No: {patientData.ward_no}</p>
            <p>Head Contact: {patientData.head_contact}</p>

            {/* Include other patient information */}
          </div>
        )}
        {!patientData && <p>No patient information available</p>}
      </Modal>
    </Form>
  );
};

export default PatientForm;
