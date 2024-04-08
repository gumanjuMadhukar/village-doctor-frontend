import { Card, Checkbox, Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import { ContraceptionTypeOption } from 'constants/schema';
import React, { useState } from 'react';

interface CheckboxStyle {
  flexDirection?: 'row' | 'column';
}
const checkboxStyle: CheckboxStyle = {
  flexDirection: 'column'
};
const ContraceptiveHistoryForm = () => {
  const [contraceptiveHistory, setContraceptiveHistory] = useState<string>('');
  const [prevContraception, setPrevContraception] = useState(false);

  const onContraceptiveHistoryChange = ({ target: { value } }: RadioChangeEvent) => {
    setContraceptiveHistory(value);
  };
  const onPrevContraception = () => {
    setPrevContraception(!prevContraception);
  };
  return (
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
            <Form.Item label="Types of Contraception / गर्भनिरोधक को प्रकार " name="current_contraception">
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
              <Form.Item label="Types of Contraceptive" name="previous_contraception">
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
  );
};

export default ContraceptiveHistoryForm;
