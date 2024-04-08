import { Card, Checkbox, Col, Form, Row, Select } from 'antd';
import { SanitationOption, WaterConsumptionOption } from 'constants/schema';
import React from 'react';

const SocioconomicHistoryForm = () => {
  return (
    <Card title="Socio-Economic History / सामाजिक-आर्थिक इतिहास" className="mt-10" size="small">
      <Row style={{}}>
        <Col>
          <Form.Item name="sustainability">
            <Checkbox >Enough Income to sustain livelihood.</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="dependent">
            <Checkbox>Any Dependents at home</Checkbox>
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
          <Form.Item label="Sanitation at Office" name="office_sanitation">
            <Select
              placeholder="Sanitation at Office Environment / सरसफाई"
              style={{ width: 180 }}
              allowClear
              options={SanitationOption}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Water Consumption" name="water_consumption">
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
  );
};

export default SocioconomicHistoryForm;
