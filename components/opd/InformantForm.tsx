import { Card, Col, Form, Input, Row, Select } from 'antd';
import { RelationOption } from 'constants/schema';
import React from 'react';

const InformantForm = (filterOption:any) => {
  return (
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
              filterOption={filterOption}
              options={RelationOption}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default InformantForm;
