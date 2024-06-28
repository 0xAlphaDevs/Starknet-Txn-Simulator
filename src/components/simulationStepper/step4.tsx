"use client"

import React from 'react';
import { Button } from '../ui/button';

const Step4 = ({ formData, setFormData }: any) => {

  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button className=''>Simulate</Button>


    </div>
  );
};

export default Step4;
