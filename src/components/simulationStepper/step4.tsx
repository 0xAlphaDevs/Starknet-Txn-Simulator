"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import TxnInvocationTrace from './step4/txnInvocationTrace';
import SummarizeTxn from './step4/summarizeTxn';

const Step4 = ({ formData, setFormData }: any) => {

  const [showSimulationOptions, setShowSimulationOptions] = useState(false);

  const handleSimulateClick = () => {
    setShowSimulationOptions(true);
  };

  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className='flex justify-center'>
        <Button className='rounded-[10px] font-semibold text-md' onClick={handleSimulateClick}>Simulate</Button>
      </div>
      {showSimulationOptions && (
        <div className="flex justify-center mt-24 gap-40">
          <TxnInvocationTrace />
          <SummarizeTxn />
        </div>
      )}
    </div>
  );
};

export default Step4;
