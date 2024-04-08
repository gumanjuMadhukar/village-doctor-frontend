import { Card, Checkbox, Col, Form, Input, Row, Select, Table } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ColumnsType } from 'antd/es/table';
import { getAllergiesOfPatient } from 'apis/admin/allergies';
import { ChildPersonalHistoryOption, NeuroticSymptomsOption, PersonalHistoryOption} from 'constants/schema';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { calculateAge } from 'utils/helpers';

import AddAlcoholConsumptionForm from './AddAlcoholConsumptionForm';
import AddAllergiesForm from './AddAllergiesForm';
import AddSmokerForm from './AddSmokerForm';
import ChildForm from './ChildForm';

interface Props {
  dob:string;
  isPsychiatryPatient?:boolean;
  selectedOption:number
}

const PersonalHistoryForm = (pdata:Props) => {
  const {dob,isPsychiatryPatient, selectedOption} = pdata
  // const {isPsychiatryPatient, DateOfBirth, selectedOption} = data;
  const age = calculateAge(dob);
  const [allergiesChecked, setAllergiesChecked] = useState(false);
  const [BBChecked, setBBChecked] = useState(false);
  const [smokerChecked, setSmokerChecked] = useState(false);
  const [alcoholicsChecked, setAlcoholicsChecked] = useState(false);

  const onPersonalHistoryChange = (checkedValues: CheckboxValueType[]) => {
    setBBChecked(checkedValues.includes('Bowel&Bladder'));
    setAllergiesChecked(checkedValues.includes('Allergies'));
    setSmokerChecked(checkedValues.includes('Smoker'));
    setAlcoholicsChecked(checkedValues.includes('Alcoholics'));
  };
  const { data: allergiesData } = useQuery(['allergiesData', { selectedOption }], getAllergiesOfPatient, {
    enabled: !!selectedOption
  });
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
  const { TextArea } = Input;

  return (
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
        </Col>
        {BBChecked && (
          <Col span={12}>
            <Card title="Bowel & Bladder" className="mt-10" size="small">
              <Form.Item name="bowel_and_bladder">
                <Select
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
        {isPsychiatryPatient && (
          <>
              <ChildForm />
            <Col span={12}>
              <Card title="Neurotic Symptoms" size="small">
                <Form.Item name="neurotic_symptoms">
                  <Checkbox.Group options={NeuroticSymptomsOption} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Work History" size="small">
                <Form.Item name="work_history">
                  <TextArea rows={1} />
                </Form.Item>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default PersonalHistoryForm;
