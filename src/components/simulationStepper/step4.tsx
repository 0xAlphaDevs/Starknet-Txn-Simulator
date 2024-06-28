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
    <div className="flex flex-col gap-12">
      <div className='flex justify-center'>
        <Button className='rounded-[10px] font-semibold text-md' onClick={handleSimulateClick}>Simulate</Button>
      </div>
      {showSimulationOptions && (
        <>
          <div className="flex justify-center gap-40">
            <TxnInvocationTrace />
            <SummarizeTxn />
          </div>
          <div className='flex justify-center mx-80'>
            <Button className='rounded-[10px] font-semibold text-md w-full'>Save Simulate</Button>
          </div>
        </>
      )}

    </div>
  );
};

export default Step4;
