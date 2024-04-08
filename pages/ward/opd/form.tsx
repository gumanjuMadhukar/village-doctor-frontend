import PageHeader from 'components/layout/page-header';
import OpdForm from 'components/opd/OpdForm';
import React from 'react';

const Form = () => {
  return (
    <>
      <PageHeader titleContent="New Prescription" />

      <div style={{ overflow: 'auto', flex: '1' }}>
        <OpdForm />
      </div>
    </>
  );
};

export default Form;
