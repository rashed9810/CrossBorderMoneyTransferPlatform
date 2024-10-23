import React from 'react'
import SelectOptions from '@/components/shared/Select-options';
import useMainWallet from '@/components/hooks/useMainWallet';
import useSubWallets from '@/components/hooks/useSubWallets';
import useCurrency from '../hooks/useCurrency';

interface PropTypes {
  control: any
  label: string
  placeholder: string
  error: string;
  name: string;
  borderColor?: boolean | undefined
}
const InputSelectKYC = ({ control, label, placeholder, error, name, borderColor }: PropTypes) => {
  const [mainWallet, isPending] = useMainWallet()
  const [subWallet] = useSubWallets();
  const [currency] = useCurrency();
  const walletOptions = [mainWallet, ...subWallet]
  let options = null
  if (name === 'documentType') {
    options = [
      {
        value: 'Passport',
        label: 'Passport'
      },
      {
        value: 'National ID',
        label: 'National ID'
      },
      {
        value: 'Drivers License',
        label: 'Drivers License'
      }
    ]
  }
  if (name === 'country') {
    const countries = currency?.map((data: any) => {
      const op = {
        value: data?.country,
        label: data?.country
      }
      return op
    })
    options = [
      ...countries
    ];

  }
  return (
    <>
      <label htmlFor={label} className='block mb-3 text-gray-700 font-bold'>{label}</label>
      <SelectOptions
        placeholder={placeholder}
        label={label}
        name={name}
        control={control}
        options={options as {
          value: string;
          label: string;
        }[]}
        error={error}
        borderColor={borderColor}
      />
    </>
  )
}

export default InputSelectKYC 