import styled from "styled-components";

export const PrescriptionPrintLayout = styled.div`

h1 {
  font-size: 20px;
}
h2 {
  font-size: 16px;
}
p {
  font-size: 14px;
}
h1,
h2,
p {
  margin: 0px;
  margin-bottom: 5px;
}
.content .inner {
  min-height: 50px;
  width: 597px;
  /* border:0.5px solid rgba(0,0,0,0.3); */
  border: none;
}
table {
  width: 597px;
}
table tr {
  text-align: left;
}
table tr,
table tr th {
  padding: 3px 5px;
}
table tr,
table tr th:first-of-type {
  padding: 3px 5px 3px 0;
}
#prescription-section {
  background-image: url(letterhead.jpg);
  background-repeat: no-repeat;
  height: 100%;
  background-size: 100%;
  padding: 0 95.59px;
  padding-top: 130px;
}
.title-section {
  width: 100%;
  text-align: center;
}
.patient-detail{
  display: flex;
  flex-wrap: wrap;
  column-count: 2;
}
.group {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.group .title {
  font-weight: 600;
}
.date {
  width: 100%;
  text-align: right;
  font-weight: 600;
}
.date .group .title {
  width: inherit;
}
.opd-information .inner {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.opd-information .inner .date {
  width: 100%;
  text-align: right;
  font-weight: 600;
}
.patient-detail {
  width: 50%;
}
.patient-detail .group .title {
  width: 90px;
}
.patient-detail .group .seperator {
  width: 10px;
}
.vitals .inner {
  display: flex;
  flex-wrap: wrap;
}
.vitals .inner .title {
  width: 100%;
}
.vitals .inner .group {
  width: initial;
  padding-left: 30px;
}
`