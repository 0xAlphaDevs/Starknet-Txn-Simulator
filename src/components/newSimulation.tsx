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

const NewSimulation = () => {
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const handleCopy = (text: string, setIsCopied: { (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (arg0: boolean): any; }) => {
    navigator.clipboard.writeText(text)
      .then(() => setIsCopied(true))
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  return (
    <div>
      <div className='flex justify-end'>
        <Button onClick={() => { }} className=''>+ New Simulation</Button>
      </div>
      <div className='flex flex-col gap-8 items-center mt-40'>
        <p className=''>Click on the New Simulation button to simulate a transaction on Starknet </p>
        <div className='flex gap-8'>
          <Dialog>
            <DialogTrigger asChild>
              <Button> Sample 1</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex justify-center'>Sample Data 1</DialogTitle>
                <DialogDescription>

                  <div className="relative">

                    <button
                      onClick={() => handleCopy(
                        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                        setIsCopied1
                      )}
                      className="absolute top-2 right-2 mb-4 p-1 text-sm  text-white rounded"
                    >
                      {isCopied1 ? <CopyCheckIcon className='w-4 h-4 text-green-600 font-semibold' /> : <CopyIcon className='w-4 h-4 text-white font-semibold' />}
                    </button>
                    <pre className="p-4 bg-black text-white rounded overflow-x-auto ">
                      <code className="whitespace-pre-wrap">
                        This action cannot be undone.  This action cannot be undone.  This action cannot be undone.  This action cannot be undone.  This action cannot be undone.  This action cannot be undone.  This action cannot be undone.  This action cannot be undone.
                      </code>
                    </pre>

                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button> Sample 2</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex justify-center'>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <div className="relative">
                    <pre className="p-4 bg-gray-100 rounded">
                      <code>
                        This action cannot be undone.
                      </code>
                    </pre>
                    <button
                      onClick={() => handleCopy(
                        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                        setIsCopied2
                      )}
                      className="absolute top-2 right-2 p-1 text-sm bg-blue-500 text-white rounded"
                    >
                      {isCopied2 ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default NewSimulation
