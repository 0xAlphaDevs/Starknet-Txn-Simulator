"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import TransactionTrace from "./transactionTrace";
import { traceData } from "@/lib/sampleData";

const Step4 = ({ formData, setFormData }: any) => {
  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
    }));
  };
  // TO DO : Design these cards

  const internalCalls = traceData.internal_calls;
  // console.log("Internal Calls", internalCalls);

  return (
    <div className="flex gap-12">
      <TransactionTrace internalCalls={internalCalls} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Summarize Transaction</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Step4;
