import { Card, Checkbox, Form } from 'antd';
import { PilccodOption } from 'constants/schema';
import React from 'react';

const PILCCODForm = () => {
  return (
    <Card title="PILCCOD" className="mt-10" size="small">
      <Form.Item name="pilccod">
        <Checkbox.Group options={PilccodOption} defaultValue={['']} className="vertical-checkbox" />
      </Form.Item>
    </Card>
  );
};

export default PILCCODForm;
