import { Card, Form, Radio } from 'antd';
import { YesNoOption } from 'constants/schema';
import React from 'react';

const ReproductivePlanForm = () => {
  return (
    <Card title="Is there any reproductive plans?">
      <Form.Item name="reproductive_plans">
        <Radio.Group
          options={YesNoOption}
          optionType="button"
        />
      </Form.Item>
    </Card>
  );
};

export default ReproductivePlanForm;
