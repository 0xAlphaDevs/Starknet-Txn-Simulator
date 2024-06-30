"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Step3 = ({ formData, setFormData, contractFunctions }: any) => {
  const handleFunctionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      functionParamsValues: {
        ...prevFormData.functionParamsValues,
        [id]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Simulation Details</CardTitle>
        <CardDescription>
          Enter details below to get started with a simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Function: {formData.selectedFunction}</Label>
          </div>
          {formData.functionParams.length > 0 ? (
            formData.functionParams.map((input: any, index: number) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={input.name}>{input.name}</Label>
                <p className="text-muted-foreground">{input.type}</p>
                <Input
                  id={input.name}
                  placeholder={`Enter ${input.name}`}
                  type={input.type.includes("integer") ? "number" : "text"}
                  value={
                    formData.functionParamsValues[input.name]
                      ? formData.functionParamsValues[input.name]
                      : ""
                  }
                  onChange={handleFunctionChange}
                  required
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center opacity-50 font-bold py-20">
              No Params required
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3;
