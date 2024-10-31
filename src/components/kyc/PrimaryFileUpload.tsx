import { Controller } from "react-hook-form"
import InputSelectKyc from "./InputSelectKYC"
import { useState } from "react"
import Image from "next/image"
interface PropTypes {
  control?: any
  errors: any
  register: any
  setProfileFilePath: any
  setBackProfileFilePath: any
}
const PrimaryFileUpload = ({ control, errors, register, setProfileFilePath, setBackProfileFilePath }: PropTypes) => {
  const [profile, setProfile] = useState<string | null>();
  const [backProfile, setBackProfile] = useState<string | null>();


  const handleFileChange = (e: any, onChange: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      onChange(file);

      if (e.target.name === "frontPart") {
        setProfile(fileURL); 
        setProfileFilePath(file); 
      } else {
        setBackProfile(fileURL);
        setBackProfileFilePath(file); 
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-3 lg:gap-10 my-3">
      <div className="mb-4 w-full">
        <InputSelectKyc
          name="documentType"
          label="Document Type*"
          control={control}
          error="Please select document type"
          placeholder="Select Document Type"
          borderColor={true}
        />
      </div>
      <div className="w-full">
          <h1  className=" text-gray-700 font-bold mb-3">Front Part*</h1>
        <label className="block text-gray-700 font-bold space-y-3">
          <Controller
            control={control}
            name="frontPart"
            rules={{ required: 'Front part document is required' }}
            render={({ field: { onChange, value } }) => (
              <div
                className={`border-[1.5px] rounded-xl border-dashed flex flex-col items-center justify-center ${profile ? 'h-20' : ' h-16'} cursor-pointer ${errors.frontPart ? 'border-red-500' : 'border-gray-200'
                  }`}
              >
                <div className="face-img overflow-hidden">
                  <Image className={`${profile ? 'rounded-xl object-cover' : 'hidden'}`} src={profile as unknown as string} width={100} height={100} alt="face" />
                </div>
                <input
                  id="frontPart"
                  type="file"
                  name="frontPart"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
                {value ? (
                  <span>{value.name}</span>
                ) : (
                  <div className="text-center">
                    <svg
                      className="text-[#723EEB] mx-auto w-6"
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
                    <div className='text-center'>
                      Drop your file or{' '}
                      <span className='text-[#723EEB] font-semibold underline'>
                        Click
                      </span>{' '}
                      to select
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          {errors.frontPart && (
            <p className="text-red-500 text-xs mt-1">{errors.frontPart.message}</p>
          )}
        </label>
      </div>

      <div className="w-full">
          <h1  className=" text-gray-700 font-bold mb-3">Back Part*</h1>
        <label className="block text-gray-700 font-bold space-y-3">
          <Controller
            control={control}
            name="backPart"
            rules={{ required: 'Back part document is required' }}
            render={({ field: { onChange, value } }) => (
              <div
                className={`border-[1.5px] rounded-xl border-dashed flex flex-col items-center justify-center ${backProfile ? 'h-20' : 'h-16'} cursor-pointer ${errors.backPart ? 'border-red-500' : 'border-gray-200'
                  }`}
              >
                <div className="face-img overflow-hidden">
                  <Image className={`${backProfile ? 'rounded-xl object-cover' : 'hidden'}`} src={backProfile as unknown as string} width={100} height={100} alt="face" />
                </div>
                <input
                  id="backPart"
                  type="file"
                  name="backPart"
                  onChange={(e) => handleFileChange(e, onChange)}
                  className="hidden"
                />
                {value ? (
                  <span className="text-center">
                    {value.name}
                  </span>
                ) : (
                  <div className="text-center">
                    <svg
                      className="text-[#723EEB] mx-auto w-6"
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
                    <div className='text-center'>
                      Drop your file or{' '}
                      <span className='text-[#723EEB] font-semibold underline'>
                        Click
                      </span>{' '}
                      to select
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          {errors.backPart && (
            <p className="text-red-500 text-xs mt-1">{errors.backPart.message}</p>
          )}
        </label>
      </div>
    </div>
  )
}
export default PrimaryFileUpload