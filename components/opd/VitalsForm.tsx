import { Card, Col, Form, Input, Row, Select } from "antd";
import { SelectScaleType } from "constants/schema";
import React, { useState } from "react";
import { calculateAge, calculateAgeYM } from "utils/helpers";

const VitalsOPDForm = (DateOfBirth: any) => {
  const [BPColor, setBPColor] = useState<string>("");
  const [BPMessage, setBPMessage] = useState<string>("");
  const [temperatureColor, setTemperatureColor] = useState<string>("");
  const [temperatureMessage, setTemperatureMessage] = useState<string>("");
  const [pulseColor, setPulseColor] = useState<string>("");
  const [pulseMessage, setPulseMessage] = useState<string>("");
  const [respirationColor, setRespirationColor] = useState<string>("");
  const [respirationMessage, setRespirationMessage] = useState<string>("");
  const [tempScale, setTempScale] = useState<string>("celcius");
  const dob = DateOfBirth?.DateOfBirth;
  const age = calculateAge(dob); // returns age in years
  const ageYM = calculateAgeYM(dob); // returns months value after age

  const onTempScaleChange = (value: string) => {
    setTempScale(value);
  };
  const checkBPRange = (event: any) => {
    var { value } = event.target;
    const [sys, diast] = value.split("/").map(Number);
    var ageYear = age;
    var ageMonth = ageYM;
    var newMessage = "";
    console.log();
    if (ageYear > 1) {
      ageMonth = 0;
    }
    const calculatedAge = ageYear + ageMonth / 12;
    const conditions = [
      {
        ageRange: { min: 0, max: Infinity },
        check: () =>
          sys == 0 || diast == 0
            ? (setBPColor("white"), (newMessage = ""))
            : "",
      },
      {
        ageRange: { min: 0, max: 0.25 },
        check: () =>
          sys == 0 || diast == 0
            ? (setBPColor("white"), (newMessage = "white"))
            : sys >= 65 && sys <= 80 && diast >= 45 && diast <= 55
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 65 || diast < 45
            ? (setBPColor("orange"), (newMessage = "orange"))
            : sys < 85 || diast < 55
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 0.25, max: 0.5 },
        check: () =>
          sys >= 70 && sys <= 90 && diast >= 50 && diast <= 65
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 70 || diast < 50
            ? (setBPColor("orange"), (newMessage = "Low Blood Pressure"))
            : sys < 90 || diast < 65
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 0.5, max: 1 },
        check: () =>
          sys >= 80 && sys <= 100 && diast >= 55 && diast <= 65
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 80 || diast < 55
            ? (setBPColor("orange"), (newMessage = "Low Blood Pressure"))
            : sys > 100 || diast > 65
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 1, max: 3 },
        check: () =>
          sys >= 90 && sys <= 105 && diast >= 55 && diast <= 70
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 90 || diast < 55
            ? (setBPColor("orange"), (newMessage = "Low Blood Pressure"))
            : sys > 105 || diast > 70
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 3, max: 6 },
        check: () =>
          sys >= 95 && sys <= 110 && diast >= 60 && diast <= 75
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 95 || diast < 60
            ? (setBPColor("orange"), (newMessage = "Low Blood Pressure"))
            : sys > 110 || diast > 75
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 6, max: 12 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 60 && diast <= 75
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 100 || diast < 60
            ? (setBPColor("orange"), (newMessage = "Low Blood Pressure"))
            : sys > 120 || diast > 75
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 12, max: 18 },
        check: () =>
          sys >= 100 && sys <= 120 && diast >= 70 && diast <= 80
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys < 100 || diast < 70
            ? (setBPColor("orange"), (newMessage = "Elevated"))
            : sys > 120 || diast > 80
            ? (setBPColor("red"), (newMessage = "Hypertension"))
            : null,
      },
      {
        ageRange: { min: 18, max: Infinity },
        check: () =>
          sys <= 120 && diast <= 80
            ? (setBPColor("green"), (newMessage = "Normal"))
            : sys > 120 && sys < 130 && diast <= 80
            ? (setBPColor("yellow"), (newMessage = "Elevated"))
            : (sys >= 130 && sys < 140) || (diast >= 80 && diast < 90)
            ? (setBPColor("orange"), (newMessage = "Hypertension - Stage 1"))
            : (sys >= 140 && sys < 180) || (diast >= 90 && diast < 120)
            ? (setBPColor("rgba(255,0,0,0.5"),
              (newMessage = "Hypertension - Stage 2"))
            : sys >= 180 && diast >= 120
            ? (setBPColor("rgba(255,0,0,1"),
              (newMessage =
                "Hypertensive Crisis - Consult your doctor immediately."))
            : null,
      },
    ];
    const result = conditions
      .filter(
        (condition) =>
          calculatedAge >= condition.ageRange.min &&
          calculatedAge <= condition.ageRange.max
      )
      .map((condition) => condition.check())
      .find((result) => result !== null);
    setBPMessage(newMessage);
    return result;
  };

  const checkTemperature = (event: any) => {
    var { value } = event.target;
    var newTextColor = "";
    var newMessage = "";
    // if(tempScale && tempScale==='fahrenheit'){
    //   var finalValue = (value-32)*5/9
    //   console.log(finalValue);
    // }
    console.log(value, "temp-value");
    if (value) {
      if (age >= 0 && age < 5) {
        if (value < 36.5) {
          newTextColor = "#0094b6";
          newMessage = "Lower Than Average";
        } else if (value >= 36.5 && value < 37.5) {
          newTextColor = "green";
          newMessage = "Normal";
        } else if (value >= 37.5 && value < 38.5) {
          newTextColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 38.5 && value <= 42.2) {
          newTextColor = "red";
          newMessage = "Fever";
        } else if (value > 42.2) {
          newTextColor = "red";
          newMessage = "High Fever";
        }
      } else if (age > 5) {
        if (value <= 35.9) {
          newTextColor = "#0094b6";
          newMessage = "Lower Than Average";
        } else if (value >= 36 && value <= 37) {
          newTextColor = "green";
          newMessage = "Normal";
        } else if (value >= 37.1 && value <= 38) {
          newTextColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 38.1 && value < 42.2) {
          newTextColor = "red";
          newMessage = "Fever";
        } else if (value > 42.2) {
          newTextColor = "red";
          newMessage = "High Fever";
        }
      }
    } else {
      newTextColor = "";
      newMessage = "";
    }
    setTemperatureColor(newTextColor);
    setTemperatureMessage(newMessage);
  };

  const checkPulseRange = (event: any) => {
    var { value } = event.target;
    var newColor = "";
    var newMessage = "";
    var ageY = age;
    var ageM = ageYM; //age in month
    if (!value) {
      newColor = "";
      newMessage = "";
    } else {
      if (ageY < 1) {
        if (ageM >= 0 && ageM < 3) {
          if (value < 110) {
            newColor = "orange";
            newMessage = "Lower Than Average";
          } else if (value > 160) {
            newColor = "orange";
            newMessage = "Higher Than Average";
          } else if (value >= 110 && value <= 160) {
            newColor = "green";
            newMessage = "Normal";
          }
        } else if (ageM >= 3 && ageM < 6) {
          if (value < 100) {
            newColor = "orange";
            newMessage = "Lower Than Average";
          } else if (value > 150) {
            newColor = "orange";
            newMessage = "Higher Than Average";
          } else if (value >= 100 && value <= 150) {
            newColor = "green";
            newMessage = "Normal";
          }
        } else if (ageM >= 6 && ageM < 12) {
          if (value < 90) {
            newColor = "orange";
            newMessage = "Lower than average !";
          } else if (value > 130) {
            newColor = "orange";
            newMessage = "Higher than average !";
          } else if (value >= 90 && value <= 130) {
            newColor = "green";
            newMessage = "Normal";
          }
        }
      } else if (ageY >= 1 && ageY < 3) {
        if (value < 80) {
          newColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 120) {
          newColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 80 && value <= 125) {
          newColor = "green";
          newMessage = "Normal";
        }
      } else if (ageY >= 3 && ageY <= 6) {
        if (value < 70) {
          newColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 115) {
          newColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 70 && value <= 115) {
          newColor = "green";
          newMessage = "Normal";
        }
      } else if (ageY > 6) {
        if (value < 60) {
          newColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 100) {
          newColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 60 && value <= 100) {
          newColor = "green";
          newMessage = "Normal";
        }
      }
    }

    setPulseColor(newColor);
    setPulseMessage(newMessage);
  };
  const checkRespiration = (events: any) => {
    var { value } = events.target;
    var newRespirationColor = "";
    var newMessage = "";
    var ageY = age;
    var ageMonth = ageYM;
    if (!value) {
      newRespirationColor = "";
      newMessage = "";
    } else {
      if (ageY < 1) {
        if (ageMonth >= 0 && ageMonth < 3) {
          if (value < 30) {
            newRespirationColor = "orange";
            newMessage = "Lower than average";
          } else if (value > 60) {
            newRespirationColor = "orange";
            newMessage = "Higher than average";
          } else if (value >= 30 && value <= 60) {
            newRespirationColor = "green";
            newMessage = "Normal";
          }
        } else if (ageMonth >= 3 && ageMonth < 6) {
          if (value < 30) {
            newRespirationColor = "orange";
            newMessage = "Lower than average";
          } else if (value > 45) {
            newRespirationColor = "orange";
            newMessage = "Higher than average";
          } else if (value >= 30 && value <= 45) {
            newRespirationColor = "green";
            newMessage = "Normal";
          }
        } else if (ageMonth >= 6 && ageMonth < 12) {
          if (value < 25) {
            newRespirationColor = "orange";
            newMessage = "Lower than average";
          } else if (value > 40) {
            newRespirationColor = "orange";
            newMessage = "Higher than average";
          } else if (value >= 25 && value <= 40) {
            newRespirationColor = "green";
            newMessage = "Normal";
          }
        }
      } else if (ageY >= 1 && ageY < 3) {
        if (value < 20 || value > 30) {
          newRespirationColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 30) {
          newRespirationColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 20 && value <= 30) {
          newRespirationColor = "green";
          newMessage = "Normal";
        }
      } else if (ageY >= 3 && ageY < 6) {
        if (value < 20) {
          newRespirationColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 25) {
          newRespirationColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 20 && value <= 25) {
          newRespirationColor = "green";
          newMessage = "Normal";
        }
      } else if (ageY >= 6 && ageY < 12) {
        if (value < 14) {
          newRespirationColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 22) {
          newRespirationColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 14 && value <= 22) {
          newRespirationColor = "green";
          newMessage = "Normal";
        }
      } else if (ageY >= 12) {
        if (value < 12) {
          newRespirationColor = "orange";
          newMessage = "Lower than average";
        } else if (value > 18) {
          newRespirationColor = "orange";
          newMessage = "Higher than average";
        } else if (value >= 12 && value <= 18) {
          newRespirationColor = "green";
          newMessage = "Normal";
        }
      }
    }
    setRespirationColor(newRespirationColor);
    setRespirationMessage(newMessage);
  };
  const selectScale = (
    <Select
      defaultValue={tempScale}
      onChange={onTempScaleChange}
      options={SelectScaleType}
    />
  );

  return (
    <Card title="Vitals / भाइटल्स" className="mt-10" size="small">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <Form.Item label="Blood Pressure / रक्तचाप" name="blood_pressure">
            <Input
              onChange={checkBPRange}
              addonAfter="mmHg"
              style={{ border: `1px solid ${BPColor || "white"}` }}
            />
          </Form.Item>
          {BPMessage && (
            <label
              style={{
                color: "white",
                background: `${BPColor}`,
                borderRadius: "4px",
                padding: "2px",
                margin: "3px 0",
              }}
            >
              {BPMessage}
            </label>
          )}
        </Col>
        <Col span={12}>
          <Form.Item label="Temperature / तापक्रम" name="temperature">
            <Input
              type="number"
              onChange={checkTemperature}
              addonAfter={selectScale}
              style={{ border: `1px solid ${temperatureColor || "white"}` }}
            />
          </Form.Item>
          {temperatureMessage && (
            <label
              style={{
                color: "white",
                background: `${temperatureColor}`,
                borderRadius: "4px",
                padding: "2px",
                margin: "3px 0",
              }}
            >
              {temperatureMessage}
            </label>
          )}
        </Col>
        <Col span={12}>
          <Form.Item label="Pulse / पल्स" name="pulse">
            <Input
              type="number"
              onChange={checkPulseRange}
              addonAfter="bpm"
              style={{ border: `1px solid ${pulseColor || "white"}` }}
            />
          </Form.Item>
          {pulseMessage && (
            <label
              style={{
                color: "white",
                background: `${pulseColor}`,
                borderRadius: "4px",
                padding: "2px",
                margin: "3px 0",
              }}
            >
              {pulseMessage}
            </label>
          )}
        </Col>
        <Col span={12}>
          <Form.Item label="Respiration / श्वासप्रश्वास" name="respiration">
            <Input
              type="number"
              onChange={checkRespiration}
              addonAfter="breaths/min"
              style={{ border: `1px solid ${respirationColor || "white"}` }}
            />
          </Form.Item>
          {respirationMessage && (
            <label
              style={{
                color: "white",
                background: `${respirationColor}`,
                borderRadius: "4px",
                padding: "2px",
                margin: "3px 0",
              }}
            >
              {respirationMessage}
            </label>
          )}
        </Col>
        <Col span={24}>
          <Form.Item label="SPO2 / अक्सिजन स्याचुरेसन" name="saturation">
            <Row>
              <Col span={12}>
                <Input
                  type="number"
                  addonAfter="%"
                  style={{ border: "1px solid white" }}
                />
              </Col>
              <Col span={12}>
                <Select
                  defaultValue="InRoom"
                  options={[
                    { value: "InRoom", label: "In Room Air" },
                    { value: "OnOxygen", label: "On Oxygen" },
                  ]}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default VitalsOPDForm;
