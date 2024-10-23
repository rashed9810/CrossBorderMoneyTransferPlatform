'use client'
import Image from "next/image";
import avatar from '../../../public/user-avater.png';
import { useState } from "react";
import { Controller } from "react-hook-form";

const SecondaryFileUpload = ({ control, errors }: { control: any, errors: any }) => {
    const [profile, setProfile] = useState<string | null>(avatar as unknown as string | null);

    // Handle file change for preview
    const handleFileChange = (e: any, onChange: any) => {
        const file = e.target.files[0];
        if (e.target.name === 'secondaryKycDocument') {
            onChange(file);
        } else {
            const fileURL = URL.createObjectURL(file);
            setProfile(URL.createObjectURL(file));
            onChange(file);
            setProfile(fileURL);
        }
    };

    return (
        <>
            <div className="flex flex-row justify-between w-full gap-3 lg:gap-10 my-3 mt-12]">
                <div className="w-1/2 h-full">
                    <label className="mb-3 block">Front Part*</label>
                    <div className="">
                        <div className={`p-5 h-[220px] border-[1.5px] ${errors.secondaryKycDocument ? 'border-red-500' : 'border-gray-200'} rounded-xl border-dashed flex flex-col justify-center h-44`}>
                            <Controller
                                control={control}
                                name="secondaryKycDocument"
                                rules={{ required: 'Front part document is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, onChange)}
                                            name="secondaryKycDocument"
                                            className="hidden"
                                            id="fileInput" // Give an id to the input
                                        />
                                        <label htmlFor="fileInput" className="cursor-pointer px-3">
                                            {value ? (
                                                <div className="text-center">{value.name}</div>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="text-[#723EEB] w-5 mx-auto mb-2"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    <div className="text-center">
                                                        Drop your file or <span className="text-[#723EEB] font-semibold underline">Click</span> to select
                                                    </div>
                                                </>
                                            )}
                                        </label>
                                    </>
                                    // <>
                                    //     <input
                                    //         type="file"
                                    //         onChange={(e) => handleFileChange(e, onChange)}
                                    //         name="secondaryKycDocument"
                                    //         className="hidden"
                                    //     />
                                    //     <div className="cursor-pointer px-3">
                                    //         {
                                    //             value ? <div className="text-center">{value.name}</div>
                                    //                 :
                                    //             <>
                                    //                 <svg
                                    //                 className="text-[#723EEB] w-5 mx-auto mb-2"
                                    //                 xmlns="http://www.w3.org/2000/svg"
                                    //                 fill="none"
                                    //                 viewBox="0 0 24 24"
                                    //                 stroke="currentColor"
                                    //             >
                                    //                 <path
                                    //                     strokeLinecap="round"
                                    //                     strokeLinejoin="round"
                                    //                     strokeWidth="2"
                                    //                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    //                 />
                                    //                 </svg>
                                    //                 <div className="text-center ">
                                    //                     Drop your file or <span className="text-[#723EEB] font-semibold underline">Click</span> to select
                                    //                 </div>
                                    //             </>
                                    //         }
                                    //     </div>
                                    // </>
                                )}
                            />
                        </div>
                        {errors.secondaryKycDocument && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{errors.secondaryKycDocument.message}</p>
                        )}
                    </div>
                </div>
                <div className='w-1/2 h-full'>
                    <label className="mb-3 block">Back Part*</label>
                    <div className={`flex flex-col justify-center items-center gap-3 p-5 h-[220px] border ${errors.secondaryKycFace ? 'border-red-500' : 'border-gray-200'} rounded-[10px]`}>
                        <div className="face-img overflow-hidden">
                            <Image className="rounded-xl object-cover" src={profile as unknown as string} width={100} height={100} alt="face" />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="faceVerification" className="cursor-pointer text-xs bg-[#723EEB] text-white px-3 py-1.5 rounded-[10px] w-fit">
                                Facial Verification
                            </label>
                            <Controller
                                control={control}
                                name="secondaryKycFace"
                                rules={{ required: 'Back part document is required' }}
                                render={({ field: { onChange } }) => (
                                    <input
                                        id="faceVerification"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, onChange)}
                                        className="hidden"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {errors.secondaryKycFace && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.secondaryKycFace.message}</p>
                    )}
                </div>
            </div>
            <div className="flex items-start gap-1 mt-5">
                <Controller
                    control={control}
                    name="checkbox"
                    render={({ field }: any) => (
                        <input
                            {...field}
                            className='mt-1 4xl:mt-0'
                            type="checkbox"
                            id="checkbox"
                        />
                    )}
                />
                <label htmlFor="checkbox" className={`font-semibold ml-1`}>
                    Confirm that I uploaded valid government-issued photo ID. This ID includes my picture, signature, name, date of birth, and address.
                </label>
            </div>
        </>
    );
};

export default SecondaryFileUpload;
