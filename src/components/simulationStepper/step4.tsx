"use client";

import React from "react";
import TransactionTrace from "./transactionTrace";
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
