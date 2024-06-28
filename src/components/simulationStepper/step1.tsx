"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '../ui/textarea';

const Step1 = ({ formData, setFormData }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="contractAddress">Contract Address</Label>
        <Input
          id="contractAddress"
          placeholder="enter your contract address"
          value={formData.contractAddress}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="network">Network</Label>
        <Select defaultValue="mainnet" disabled>
          <SelectTrigger id="network" disabled>
            <SelectValue placeholder="Mainnet" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="mainnet">Mainnet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="abi">ABI</Label>
        <Textarea
          id='abi'
          placeholder='Enter your ABI'
          value={formData.abi}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  )
}

export default Step1;
