import { Alert, Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';

const AddSmokerForm = () => {
  const [noPerDay, setNoPerDay] = useState(0);
  const [duration, setDuration] = useState(0);
  const [packYear, setPackYear] = useState(0);
  const calculatePacksYear = () => {
    const packPerDay = noPerDay / 20;
    const packPerYear = packPerDay * duration;
    setPackYear(packPerYear);
  };

  return (
    <Card title="Cigarettes Count" className="mt-10" size="small">
      <Form.Item label="" name="pack_year" hidden={true} >
        <Input type="number" value={packYear} />
      </Form.Item>
      <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Col span={24}>
          <Form.Item label="No of Cigarettes: (Per Day)" name="no_of_cigarettes">
            <Input type="number" value={noPerDay} onChange={e => setNoPerDay(parseInt(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Duration (From How many Years)" name="duration">
            <Input type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={() => calculatePacksYear()}>
            Calculate / हिसाब गर्नु
          </Button>
        </Col>
        {packYear > 0 && (
          <Col span={12}>
            <Alert message={`${packYear.toLocaleString()} Pack Year`} type="warning" closable />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default AddSmokerForm;
