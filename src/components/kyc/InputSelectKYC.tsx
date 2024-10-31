import React from 'react'
import SelectOptions from '@/components/shared/Select-options';
import useCurrency from '../hooks/useCurrency';

interface PropTypes {
  control: any
  label: string
  placeholder: string
  error: string;
  name: string;
  borderColor?: boolean | undefined;
  value?: string;
}
const InputSelectKYC = ({ control, label, placeholder, error, name, borderColor, value }: PropTypes) => {
  const [currency] = useCurrency();

  let options = null
  if (name === 'documentType') {
    options = [
      {
        value: 'Passport',
        label: 'Passport'
      },
      {
        value: 'GOVT_ID',
        label: 'GOVT ID'
      },
      {
        value: 'DRIVING_LICENSE',
        label: 'DRIVING LICENSE'
      }
      // {
      //   value: 'Drivers License',
      //   label: 'Drivers License'
      // }
    ]
  }
  if (name === 'country') {
    options =
      [
        {
          value: value,
          label: value,
        }
      ]
    // const countries = currency?.map((data: any) => {
    //   const op = {
    //     value: data?.country,
    //     label: data?.country
    //   }
    //   return op
    // })
    // options = [
    //   ...countries
    // ];

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