import { Col, Form, Input, Row, Select } from 'antd';
import { SaturationTakenLocation, SelectScaleType } from 'constants/schema';
import React, { useState } from 'react';

const Vitals = () => {
  const [BPColor, setBPColor] = useState<string>('');
  const [BPMessage, setBPMessage] = useState<string>('');
  const [temperatureColor, setTemperatureColor] = useState<string>('');
  const [pulseColor, setPulseColor] = useState<string>('');
  const [respColor, setRespColor] = useState<string>('');
  const age = 20;
  const checkBPRange = (event: any) => {
    var { value } = event.target;
    const [sys, diast] = value.split('/').map(Number);
    var ageYear = 19;
    var ageMonth = 3;
    if (ageYear > 1) {
      ageMonth = 0;
    }
    const calculatedAge = ageYear + ageMonth / 12;
    const conditions = [
      {
        ageRange: { min: 0, max: Infinity },
        check: () => (sys == 0 || diast == 0 ? setBPColor('white') : '')
      },
      {
        ageRange: { min: 0, max: 0.25 },
        check: () =>
          sys == 0 || diast == 0
            ? setBPColor('white')
            : sys >= 65 && sys <= 80 && diast >= 45 && diast <= 55
            ? setBPColor('green')
            : sys < 65 || diast < 45
            ? setBPColor('orange')
            : sys < 85 || diast < 55
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 0.25, max: 0.5 },
        check: () =>
          sys >= 70 && sys <= 90 && diast >= 50 && diast <= 65
            ? setBPColor('green')
            : sys < 70 || diast < 50
            ? setBPColor('orange')
            : sys < 90 || diast < 65
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 0.5, max: 1 },
        check: () =>
          sys >= 80 && sys <= 100 && diast >= 55 && diast <= 65
            ? setBPColor('green')
            : sys < 80 || diast < 55
            ? setBPColor('orange')
            : sys > 100 || diast > 65
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 1, max: 3 },
        check: () =>
          sys >= 90 && sys <= 105 && diast >= 55 && diast <= 70
            ? setBPColor('green')
            : sys < 90 || diast < 55
            ? setBPColor('orange')
            : sys > 105 || diast > 70
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 3, max: 6 },
        check: () =>
          sys >= 95 && sys <= 110 && diast >= 60 && diast <= 75
            ? setBPColor('green')
            : sys < 95 || diast < 60
            ? setBPColor('orange')
            : sys > 110 || diast > 75
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 6, max: 12 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 60 && diast <= 75
            ? setBPColor('green')
            : sys < 100 || diast < 60
            ? setBPColor('orange')
            : sys > 120 || diast > 75
            ? setBPColor('red')
            : null
      },
      {
        ageRange: { min: 12, max: 18 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 70 && diast <= 80
            ? setBPMessage('Normal')
            : sys < 100 || diast < 70
            ? setBPMessage('Eleveted')
            : sys > 120 || diast > 80
            ? setBPColor('red')
            : null
      },

      {
        ageRange: { min: 18, max: Infinity },
        check: () =>
          sys <= 120 && diast <= 80
            ? (setBPColor('green'), setBPMessage('Normal'))
            : sys > 120 && sys < 130 && diast <= 80
            ? (setBPColor('yellow'), setBPMessage('Elevated'))
            : (sys >= 130 && sys < 140) || (diast >= 80 && diast < 90)
            ? setBPColor('orange')
            : (sys >= 140 && sys < 180) || (diast >= 90 && diast < 120)
            ? setBPColor('red')
            : setBPColor('red')
      }
    ];
    const result = conditions
      .filter(condition => calculatedAge >= condition.ageRange.min && calculatedAge <= condition.ageRange.max)
      .map(condition => condition.check())
      .find(result => result !== null);
      console.log(result)
  };

  const checkTemperature = (event: any) => {
    var { value } = event.target;
    var newTextColor = '';
    if (age && age < 5) {

      if (value <= 36.4) {
        newTextColor = '#0094b6';
      } else if (value >= 36.5 && value <= 37.5) {
        newTextColor = 'green';
      } else if (value >= 37.5 && value <= 38.4) {
        newTextColor = 'orange';
      } else if (value >= 38.5 && value <= 42.2) {
        newTextColor = 'red';
      }
    } else if (age > 5) {
      if (value <= 35.9) {
        newTextColor = '#0094b6';
      } else if (value >= 38.1 && value < 42.2) {
        newTextColor = 'red';
      } else if (value >= 36 && value <= 37) {
        newTextColor = 'green';
      } else if (value >= 37.1 && value <= 38) {
        newTextColor = 'orange';
      }
    }
    setTemperatureColor(newTextColor);
  };

  const checkPulseRange = (event: any) => {
    var { value } = event.target;
    var newColor = '';
    var ageY = age;
    var ageM = 3;
    if (ageY < 1) {
      if (ageM && ageM >= 0 && ageM < 3) {
        if (value < 110 || value > 160) {
          newColor = 'orange';
        } else if (value >= 110 && value <= 160) {
          newColor = 'green';
        }
      } else if (ageM >= 3 && ageM < 6) {
        if (value < 100 || value > 150) {
          newColor = 'orange';
        } else if (value >= 100 && value <= 150) {
          newColor = 'green';
        }
      } else if (ageM >= 6 && ageM < 12) {
        if (value < 90 || value > 130) {
          newColor = 'orange';
        } else if (value >= 90 && value <= 130) {
          newColor = 'green';
        }
      }
    } else if (ageY >= 1 && ageY < 3) {
      if (value < 80 && value > 125) {
        newColor = 'orange';
      } else if (value >= 80 && value <= 125) {
        newColor = 'green';
      }
    } else if (ageY >= 3 && ageY <= 6) {
      if (value < 70 || value > 115) {
        newColor = 'orange';
      } else if (value >= 70 && value <= 115) {
        newColor = 'green';
      }
    } else if (ageY > 6) {
      if (value < 60 || value > 100) {
        newColor = 'orange';
      } else if (value >= 60 && value <= 100) {
        newColor = 'green';
      }
    }
   
    setPulseColor(newColor);
  };
  const checkRespiration = (events: any) => {
    var { value } = events.target;
    var newRespColor = '';
    var ageY = 50;
    var ageM = 0;
    if (ageY < 1) {
      if (ageM >= 0 && ageM < 3) {
        if (value < 30 || value > 60) {
          newRespColor = 'orange';
        } else if (value >= 30 && value <= 60) {
          newRespColor = 'green';
        }
      } else if (ageM >= 3 && ageM < 6) {
        if (value < 30 || value > 45) {
          newRespColor = 'orange';
        } else if (value >= 30 && value <= 45) {
          newRespColor = 'green';
        }
      } else if (ageM >= 6 && ageM < 12) {
        if (value < 25 || value > 40) {
          newRespColor = 'orange';
        } else if (value >= 25 && value <= 40) {
          newRespColor = 'green';
        }
      }
    } else if (ageY >= 1 && ageY < 3) {
      if (value < 20 || value > 30) {
        newRespColor = 'orange';
      } else if (value >= 20 && value <= 30) {
        newRespColor = 'green';
      }
    } else if (ageY >= 3 && ageY < 6) {
      if (value < 20 || value > 25) {
        newRespColor = 'orange';
      } else if (value >= 20 && value <= 25) {
        newRespColor = 'green';
      }
    } else if (ageY >= 6 && ageY < 12) {
      if (value < 14 || value > 22) {
        newRespColor = 'orange';
      } else if (value >= 14 && value <= 22) {
        newRespColor = 'green';
      }
    } else if (ageY >= 12) {
      if (value < 12 || value > 18) {
        newRespColor = 'orange';
      } else if (value >= 12 && value <= 18) {
        newRespColor = 'green';
      }
    }
    setRespColor(newRespColor);
  };

  const selectScale = <Select defaultValue="Fahrenheit" options={SelectScaleType} />;

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={12}>
        <Form.Item label="Blood Pressure / रक्तचाप" name="blood_pressure">
          <Input onChange={checkBPRange} addonAfter="mmHg" style={{ border: `1px solid ${BPColor || 'white'}` }} />
          {BPMessage != null && (
            <label
              style={{
                color: 'white',
                background: `${BPColor}`,
                borderRadius: '4px',
                padding: '2px',
                margin: '3px 0'
              }}
            >
              {BPMessage}
            </label>
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Temperature / तापक्रम" name="temperature">
          <Input
            onChange={checkTemperature}
            addonAfter={selectScale}
            style={{ border: `1px solid ${temperatureColor || 'white'}` }}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Pulse / पल्स" name="pulse">
          <Input onChange={checkPulseRange} addonAfter="bpm" style={{ border: `1px solid ${pulseColor || 'white'}` }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Respiration / श्वासप्रश्वास" name="respiration">
          <Input
            onChange={checkRespiration}
            addonAfter="breaths/min"
            style={{ border: `1px solid ${respColor || 'white'}` }}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="SPO2 / अक्सिजन स्याचुरेसन" name="saturation">
          <Row>
            <Col span={12}>
              <Input addonAfter="%" style={{ border: '1px solid white' }} />
            </Col>
            <Col span={12}>
              <Select
                defaultValue="InRoom"
                options={SaturationTakenLocation}
              />
            </Col>
          </Row>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Vitals;
