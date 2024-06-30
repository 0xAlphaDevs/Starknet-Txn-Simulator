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
import TransactionSummary from "./transactionSummary";

const Step4 = ({ internalCalls, setFormData }: any) => {
  const handleFunctionChange = (value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
    }));
  };

  return (
    <div className="flex flex-col gap-12">
      <TransactionTrace internalCalls={internalCalls} />

      <TransactionSummary internalCalls={internalCalls} />
    </div>
  );
};

export default Step4;
