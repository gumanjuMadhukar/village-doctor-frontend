import React, { useEffect, useState } from 'react';

const PrintPage = () => {
  const [printedAndClosed, setPrintedAndClosed] = useState(true);
  useEffect(() => {
    if (printedAndClosed) {
      const handlePrint = () => {
        const printContent = document.getElementById('opd-print')?.innerHTML;
        const originalContent = document.body.innerHTML;
        if (printContent) {
          document.body.innerHTML = printContent;
          // Delay before printing (adjust as needed)
          setTimeout(() => {
            window.print();
            // Delay before closing the window (adjust as needed)
            setTimeout(() => {
              document.body.innerHTML = originalContent;
              // window.close();
            }, 1000);
          }, 1000);
        }
      };
      handlePrint();
      setPrintedAndClosed(!printedAndClosed);
    }
  }, [printedAndClosed]);

  return (
    <>
      <div id="opd-print">
        {/* Content to be printed */}
        <h1>hello</h1>
        <p>This will be printed.</p>
      </div>
    </>
  );
};

export default PrintPage;
