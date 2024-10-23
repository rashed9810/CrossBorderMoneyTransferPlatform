import React from 'react'
import SelectOptions from '@/components/shared/Select-options';

interface OptionTypes {
  value: string
  label: string
}
const transferOptions: OptionTypes[] = [
  { value: 'WALLET_TO_WALLET', label: 'Wallet to Wallet' }
];

const TransferOptionSelect = ({ control }: { control: any }) => {

  return (
        <SelectOptions
            placeholder="Select Transfer Type"
            label="transactionType"
            control={control}
            options={transferOptions}
            error="Please select transfer type"
        />
  )
}

export default TransferOptionSelect