import { Alert, Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { ExceedOption } from 'constants/schema';
import React, { useState } from 'react';

const AddAlcoholConsumptionForm = () => {
  const [alcoholPercentage, setAlcoholPercentage] = useState(0);
  const [volumeConsumed, setVolumeConsumed] = useState(0);
  const [unitsConsumedPerWeek, setUnitsConsumedPerWeek] = useState(0);
  const [daysCount, setDaysCount] = useState(1);
  const calculateAlcoholUnit = () => {
    const alcoholPercentagePerDay = alcoholPercentage / 1000;
    const unitsConsumedPerDay = alcoholPercentagePerDay * volumeConsumed;
    setUnitsConsumedPerWeek(unitsConsumedPerDay * daysCount);
  };
 
  interface CheckboxStyle {
    flexDirection?: 'row' | 'column';
  }
  const checkboxStyle: CheckboxStyle = {
    flexDirection: 'column'
  };
  return (
    <Card title="Alcohol Unit Count / रक्सी एकाइ मात्रा" className="mt-10" size="small">
      <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Col span={11}>
          <Form.Item label="% of alcohol / रक्सी को मात्रा" name="percentage_of_alcohol">
            <Input
              type="number"
              value={alcoholPercentage}
              onChange={e => setAlcoholPercentage(parseInt(e.target.value))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Volume Consumed (ml) / मात्रा खपत " name="volume_consumed">
            <Input type="number" value={volumeConsumed} onChange={e => setVolumeConsumed(parseInt(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Days Per Week" name="days_count">
            <Input type="number" value={daysCount} onChange={e => setDaysCount(parseInt(e.target.value))}></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={() => calculateAlcoholUnit()}>
            Calculate / हिसाब गर्नु
          </Button>
        </Col>
        {unitsConsumedPerWeek > 0 && (
          <>
          <Col span={12}>
            {unitsConsumedPerWeek > 14 ? (
              <>
                <Alert
                  message={`${unitsConsumedPerWeek.toLocaleString()} Units Per Week`}
                  type="error"
                  closable
                />
              </>
            ) : (
              <Alert
                message={`${unitsConsumedPerWeek.toLocaleString()} Units Per Week`}
                type="warning"
                closable
              />
            )}
          </Col>
          {unitsConsumedPerWeek > 14 && (
              <Card title="Questions" className="mt-10" size="small" style={{width:"100%"}}>
                <Checkbox.Group options={ExceedOption} className="pilccod" style={checkboxStyle}>
                  Exceeds The Limit
                </Checkbox.Group>
              </Card>
            )}
          </>
        )}
      </Row>
    </Card>
  );
};

export default AddAlcoholConsumptionForm;
