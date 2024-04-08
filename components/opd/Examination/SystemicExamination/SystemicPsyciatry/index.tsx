import { Col} from "antd";
import { NeuroFormDesign } from "styles/styled/OPD";

import HigherFunction from "../HigherFunction";

const SystemicPsychiatryForm = () => {
  return (
    <NeuroFormDesign>
      <Col span={24} className="neuro-form">
        <HigherFunction/>
      </Col>
    </NeuroFormDesign>
  );
};

export default SystemicPsychiatryForm;
