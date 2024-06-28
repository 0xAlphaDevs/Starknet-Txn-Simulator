"use client"

import React from 'react';
import { Button } from "@/components/ui/button";

const Step4 = ({ formData, setSimulationStarted }: any) => {
  const handleSubmit = () => {
    console.log(formData);
    setSimulationStarted(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-bold">Summary</h3>
      <div className="flex flex-col space-y-1.5">
        <div>
          <strong>Contract Address:</strong> {formData.contractAddress}
        </div>
        <div>
          <strong>Network:</strong> {formData.network}
        </div>
        <div>
          <strong>ABI:</strong>
          <pre className="bg-gray-100 p-2 rounded">{formData.abi}</pre>
        </div>
        <div>
          <strong>Selected Function:</strong> {formData.selectedFunction}
        </div>
        <div>
          <strong>Function Parameters:</strong>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(formData.functionParams, null, 2)}
          </pre>
        </div>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Step4;
