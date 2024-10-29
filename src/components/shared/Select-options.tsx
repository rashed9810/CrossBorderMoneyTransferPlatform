/* eslint-disable @next/next/no-async-client-component */
'use client'
import Select from 'react-select';
import { Controller } from "react-hook-form"
import { optionsStyles } from './optionStyles';

interface PropTypes {
    control: any,
    label: string,
    placeholder: string,
    error: string,
    options: {
        value: string,
        label: string
    }[],
    name?: string;
    borderColor?: boolean | undefined
}

const SelectWalletType = ({ control, label, placeholder, options, error, name, borderColor }: PropTypes) => {
    
    return (
        <Controller
            name={name ||label}
            control={control}
            rules={{ required: `${error}` }}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Select
                        {...field}
                        options={options}
                        placeholder={placeholder}
                        styles={optionsStyles(error, borderColor)}
                    />
                    {error && (
                        <p className='text-red-500 text-xs ml-1 mt-1'>{error.message}</p>
                    )}
                </>
            )}
        />)
}
export default SelectWalletType


