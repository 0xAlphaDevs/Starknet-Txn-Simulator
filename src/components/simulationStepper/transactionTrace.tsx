import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyCheckIcon, CopyIcon } from "lucide-react";

const TransactionTrace = ({ internalCalls }: any) => {

  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  console.log("Internal Calls", internalCalls);


  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle>Transaction Trace</CardTitle>
        <CardDescription>Below are the details of your current simulates transaction</CardDescription>
      </CardHeader>
      <CardContent className='border rounded-[10px] bg-slate-200 mx-4 py-2'>
        {internalCalls.map((call: any, index: number) => (
          <div key={index} className='flex flex-col gap-4'>
            <div className='flex gap-2 justify-between'>
              <p className='font-medium'>CONTRACT ADDRESS :</p>
              <div className="bg-black rounded-[5px] text-white flex gap-4  px-2">
                <p className="text-sm">{call.contractAddress}</p>
                <button
                  onClick={() => copyToClipboard(call.contractAddress)}
                  className="text-sm rounded-[20px]"
                >
                  {isCopied ? (
                    <CopyCheckIcon className="h-3 w-3 text-green-500" />
                  ) : (
                    <CopyIcon className="h-3 w-3 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className='flex gap-12'>
              <p>Call Type : {call.callType}</p>
              <p>Function Name : {call.functionName}</p>

            </div>

            <div className='flex flex-col gap-2'>
              <p>Input </p>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-2'>
                  <p>Name : </p>
                  <p>{call.input.name}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Type : </p>
                  <p>{call.input.type}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>value : </p>
                  <p>{call.input.value}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Output </p>
              <div className='flex gap-8'>
                <div className='flex flex-col gap-2'>
                  <p>Type : </p>
                  <p>{call.output.type}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>value : </p>
                  <p>{call.output.value}</p>
                </div>
              </div>
            </div>
          </div>

        ))}
      </CardContent>
    </Card>
  )
}

export default TransactionTrace