import { Search } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";
import SkeletonCurrencyDropdawn from '../skeleton/SkeletonCurrencyDropdawn';

type CurrencyDropdownProps = {
    label: string;
    options: { name: string; value: any; }[];
    selectedValue: any;
    setSelectedValue: (value: any) => void;
    isLoading?: boolean;
    placeholder?: string;
    errorMassage?: string
    isSubmitted?: boolean;
    fixedValue?: boolean;
};


const CurrencyDropdown: React.FC<CurrencyDropdownProps & { isOpen?: boolean; onToggle?: () => void; }> = ({
    label,
    options,
    selectedValue,
    setSelectedValue,
    isLoading,
    isOpen,
    onToggle,
    placeholder,
    errorMassage,
    isSubmitted,
    fixedValue
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options?.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full text-xs xl:text-sm">
            <label className="block mb-1 font-semibold">{label}</label>
            <div className="border rounded-xl flex">
                <div className="mx-auto flex w-full items-center px-3 py-1 cursor-pointer rounded-l-xl">
                    {Object.keys(selectedValue).length !== 0 && (
                        <div className="relative w-5 h-5 mr-2">
                            <Image
                                src={selectedValue?.flag}
                                alt={`${selectedValue?.name} flag`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    )}
                    <h1 className="font-medium text-xs text-gray-700">{Object.keys(selectedValue).length !== 0 ? selectedValue.name : <span className='text-gray-400'>{`Choose ${label}`}</span>}</h1>
                </div>
                <div
                    onClick={onToggle} // Toggle function passed from the parent
                    className={`mx-auto flex items-center justify-center px-3 ${fixedValue && Object.keys(selectedValue).length === 0 ? 'py-4' : ''} py-2 cursor-pointer bg-[#723EEB] rounded-r-xl text-white w-16 xl:w-24`}>
                    <h1 className="font-medium">{selectedValue ? selectedValue.code : ''}</h1>
                    <svg
                        className={`transition-transform duration-300 ${isOpen && !fixedValue ? 'rotate-180' : fixedValue ? 'hidden' : ''}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7 10L12 15L17 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <div
                className={`${isOpen && !fixedValue ? 'visible top-[3.8rem] bg-white opacity-100' : 'invisible top-0 opacity-0'} absolute z-10 w-full mt-1 bg-white border rounded-l-xl rounded-r-xl shadow-lg duration-300`}
            // className="absolute z-10 w-full mt-1 bg-white border rounded-l-xl rounded-r-xl shadow-lg"
            >
                <div className="p-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search currency..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-8 px-3 py-2 text-xs border rounded-l-xl rounded-r-xl pr-10 focus:outline-none focus:ring-1 focus:ring-[#723EEB]"
                        />
                        <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
                <div className="max-h-36 overflow-y-auto">
                    {isLoading ? (
                        <div className='w-full py-2'><SkeletonCurrencyDropdawn /></div>
                    ) : (
                        filteredOptions?.map((option) => (
                            <div
                                key={option?.name}
                                onClick={() => {
                                    setSelectedValue(option?.value);
                                    onToggle && onToggle(); // Close the dropdown
                                    setSearchTerm('');
                                }}
                                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="relative w-5 h-5 mr-3">
                                    <Image
                                        src={option?.value?.flag}
                                        alt={`${option?.name} flag`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                </div>
                                <span className="text-xs">{option.name}</span>
                                <span className="ml-auto text-xs text-gray-500">{option?.value?.code}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {
                isSubmitted && Object.keys(selectedValue).length === 0 && <p className='text-red-500 font-medium text-xs'>{errorMassage}</p>
            }
        </div>
    );
};


export default CurrencyDropdown;