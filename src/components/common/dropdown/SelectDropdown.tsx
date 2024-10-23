import SkeletonCurrencyDropdawn from "../skeleton/SkeletonCurrencyDropdawn";

type DropdownProps = {
    label: string;
    options: { name: string; value: string; }[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    isOpen?: boolean;
    onToggle?: () => void;
    fixedValue?: boolean;
    placeholder?: string;
    isLoading?: boolean;
    errorMassage?: string;
    isSubmitted?: boolean;
    loadDataEmptyMassage?: string;
};

const SelectDropdown: React.FC<DropdownProps> = ({
    label,
    options,
    selectedValue,
    setSelectedValue,
    isOpen,
    onToggle,
    fixedValue,
    placeholder,
    isLoading,
    errorMassage,
    isSubmitted,
    loadDataEmptyMassage
}) => {
    const selectedOption: { name: string; value: string; } | undefined = options?.find(option => option.value === selectedValue);


    return (
        <div className="relative w-full text-xs xl:text-sm">
            <label className="block mb-1 font-semibold">{label}</label>
            <div
                onClick={onToggle} // Toggle function passed from the parent
                className={`mx-auto flex w-full items-center justify-between rounded-xl px-3 ${fixedValue ? 'py-2' : 'py-1'} border cursor-pointer text-xs`}
            >
                <h1 className="font-medium text-gray-700">{selectedOption ? selectedOption.name : <span className="text-gray-400">{placeholder ? placeholder : 'Select'}</span>}</h1>
                <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300 ${fixedValue ? 'hidden' : 'block'}`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                        <path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
                    </g>
                </svg>
            </div>

            <div className={`${isOpen ? 'visible top-[2.8rem] bg-white opacity-100' : 'invisible top-0 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-2 space-y-2 border duration-300 ${fixedValue ? 'hidden' : 'block'}`}>
                {isLoading ? (
                    <div className='w-full py-2'><SkeletonCurrencyDropdawn /></div>
                ) : options?.length !== 0 ?
                    options?.map((option, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setSelectedValue(option.value);
                                onToggle && onToggle(); // Close the dropdown
                            }}
                            className="px-6 py-2 text-gray-500 hover:bg-gray-2s00 cursor-pointer bg-gray-100"
                        >
                            {option.name}
                        </div>
                    ))
                    :
                    <span className="px-3 text-xs text-red-400">{loadDataEmptyMassage}</span>
                }
            </div>
            {
                isSubmitted && Object.keys(selectedValue).length === 0 && <p className='text-red-500 font-medium text-xs'>{errorMassage}</p>
            }
        </div>
    );
};

export default SelectDropdown;
