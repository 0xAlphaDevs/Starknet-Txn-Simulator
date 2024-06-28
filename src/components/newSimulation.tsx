import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { sampleData1, sampleData2 } from '@/lib/sampleData';

const NewSimulation = () => {
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [isSimulationStarted, setIsSimulationStarted] = useState(false);

  const copyToClipboard = (text: string, setCopied: { (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className='flex justify-end'>
        <Button onClick={() => setIsSimulationStarted(true)} className='rounded-[10px] text-lg font-semibold'>+ New Simulation</Button>
      </div>

      {isSimulationStarted ? (
        <div className='flex flex-col gap-8 items-center mt-40'>
          <p className='text-lg font-medium'>New Simulation button is clicked</p>
        </div>
      ) : (

        <div className='flex flex-col gap-8 items-center mt-40'>
          <p className='text-lg font-medium'>Click on the New Simulation button to simulate a transaction on Starknet </p>
          <div className='flex gap-8'>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='rounded-[10px] text-md'> Sample 1</Button>
              </DialogTrigger>
              <DialogContent className=''>
                <DialogHeader>
                  <DialogTitle className='flex justify-center mb-4'>Sample Data 1</DialogTitle>
                  <DialogDescription className=''>
                    <div className="relative">
                      <pre className="p-4 bg-black text-white rounded">
                        <code className="whitespace-pre-wrap">
                          {sampleData1}
                        </code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(sampleData1, setIsCopied1)}
                        className="absolute top-2 right-2 p-1 text-sm rounded-[20px]"
                      >
                        {isCopied1 ? <CopyCheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-white" />}
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className='rounded-[10px] text-md'> Sample 2</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='flex justify-center mb-4'>Sample Data 2</DialogTitle>
                  <DialogDescription>
                    <div className="relative">
                      <pre className="p-4 bg-black text-white rounded-[20px] ">
                        <code className="whitespace-pre-wrap">
                          {sampleData2}
                        </code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(sampleData2, setIsCopied2)}
                        className="absolute top-2 right-2 p-1 text-sm rounded"
                      >
                        {isCopied2 ? <CopyCheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4 text-white" />}
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewSimulation
