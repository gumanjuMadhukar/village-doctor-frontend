import { PlusOutlined } from "@ant-design/icons";
import PageHeader from "components/layout/page-header";
import React from "react";
import { PageHeaderWrapper } from "styles/authCSS";

const HeaderItems = [
  {
    name: "Lab Report",
    link: "",
  },
];
const LabReport = () => {
  return (
    <div>
      <PageHeaderWrapper>
        <PageHeader
          items={HeaderItems}
          titleContent="Patient List / बिरामीहरू"
          icon={<PlusOutlined />}
          //   buttonCb={openCloseModal}
        />
      </PageHeaderWrapper>
    </div>
  );
};

export default LabReport;
