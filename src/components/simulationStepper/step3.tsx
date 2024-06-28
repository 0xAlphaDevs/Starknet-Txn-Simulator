"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Step3 = ({ formData, setFormData }: any) => {
  const [params, setParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setParams(formData.functionParams || {});
  }, [formData.functionParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [id]: value,
    }));
  };

  const handleAddParam = () => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      functionParams: params,
    }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1.5">
        <Label>Function: {formData.selectedFunction}</Label>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="param1">Parameter 1</Label>
        <Input id="param1" placeholder="Enter parameter 1" value={params.param1 || ''} onChange={handleInputChange} required />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="param2">Parameter 2</Label>
        <Input id="param2" placeholder="Enter parameter 2" value={params.param2 || ''} onChange={handleInputChange} required />
      </div>
    </div>
  )
}

export default Step3;
