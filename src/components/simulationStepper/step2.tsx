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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Step2 = ({ formData, setFormData, contractFunctions, loading }: any) => {

  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      selectedFunction: value,
    }));
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Simulation Details</CardTitle>
        <CardDescription>
          Enter details below to get started with a simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        {loading ? (
          <div>Loading functions...</div>
        ) : (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="functionSelect">Select Function</Label>
            <Select onValueChange={handleFunctionChange} value={formData.selectedFunction}>
              <SelectTrigger id="functionSelect">
                <SelectValue placeholder="Select a function" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.keys(contractFunctions).map((funcKey) => {
                  const func = contractFunctions[funcKey];
                  const paramNames = func.inputs.map((input: any) => input.name).join(", ");
                  return (
                    <SelectItem key={funcKey} value={func.name}>
                      {func.name} ({paramNames})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Step2;
