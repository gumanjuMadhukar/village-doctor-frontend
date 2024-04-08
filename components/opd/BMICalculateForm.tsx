import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';

const BMICalculateForm = () => {
  const [heightValue, setHeightValue] = useState<string>('');
  const [weightValue, setWeightValue] = useState<string>('');
  const [bmiValue, setBmiValue] = useState<string>('');
  const [bmiMessage, setBmiMessage] = useState<string>('');

  const calculateBmi = () => {
    if (heightValue && weightValue) {
      const heightInMeters: number = parseFloat(heightValue) / 100;
      const bmi: string = (parseFloat(weightValue) / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);
      let message: string = '';
      if (parseFloat(bmi) < 18.5) {
        message = 'Underweight';
      } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25) {
        message = 'Normal';
      } else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 30) {
        message = 'Overweight';
      } else {
        message = 'Obese';
      }
      setBmiMessage(message);
    } else {
      setBmiValue('');
      setBmiMessage('');
    }
  };
  const getBmiColor = (): React.CSSProperties => {
    const bmi = parseFloat(bmiValue);
    if (bmi >= 18.5 && bmi < 25) {
      return { backgroundColor: 'green', color: 'white', padding: '3px', borderRadius: '3px' }; // Green background with white text
    }
    return { backgroundColor: 'red', color: 'white', padding: '3px', borderRadius: '3px' }; // Red background with white text
  };

  return (
    <Card title="BMI/ बी.एम.आई" className="mt-10" size="small">
      <Form.Item label="Height (cm) / उचाइ (से मी)" name="height">
        <Input type="number" id="height" value={heightValue} onChange={e => setHeightValue(e.target.value)} />
      </Form.Item>
      <Form.Item label="Weight (kg) / वजन (किग्रा)" name="weight">
        <Input type="number" id="weight" value={weightValue} onChange={e => setWeightValue(e.target.value)} />
      </Form.Item>

      <Button type="primary" onClick={() => calculateBmi()}>
        Click to Calculate BMI / बी.एम.आई हिसाब गर्नुहोस्
      </Button>
      {bmiValue && bmiMessage && (
        <div>
          <Form.Item label="BMI" name="bmi_result" hidden>
            <Input value={parseFloat(bmiValue)} />
          </Form.Item>
          <p>
            Your BMI / तपाईँको बी.एम.आई:{' '}
            <span style={getBmiColor()}>
              {bmiValue} - {bmiMessage}
            </span>
          </p>
        </div>
      )}
    </Card>
  );
};

export default BMICalculateForm;
