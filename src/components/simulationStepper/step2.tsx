"use client"

import React from 'react'
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Step2 = ({ formData, setFormData }: any) => {

  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      selectedFunction: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="functionSelect">Select Function</Label>
      <Select onValueChange={handleFunctionChange} value={formData.selectedFunction}>
        <SelectTrigger id="functionSelect">
          <SelectValue placeholder="Select a function" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="function1">Function 1</SelectItem>
          <SelectItem value="function2">Function 2</SelectItem>
          <SelectItem value="function3">Function 3</SelectItem>
          {/* Add more functions as needed */}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Step2;
