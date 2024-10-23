import TextInputKYC from './TextInputField';
import InputSelectKyc from './InputSelectKYC';
import { useForm } from 'react-hook-form';
import SecondaryFileUpload from './SecondaryFileUpload';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useKYC } from '@/context/useKyc';
import Cookies from 'js-cookie';
import { uploadFilesImgBB } from '@/lib/fileUpload';
import LoadingSpinner from '../LoaderSpinner';
import { useState } from 'react';

const SecondaryKycForm = () => {
    const [loading, setLoading] = useState(false);

    const axiosInstance = useAxiosSecure();
    const {primaryKycData, setPrimaryKycData} = useKYC()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    
    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const uploadFile = await uploadFilesImgBB({
                frontPartDoc: primaryKycData.frontPart,
                backPartDoc: primaryKycData.backPart,
                secondaryKycDocument: data.secondaryKycDocument,
                secondaryKycFace: data.secondaryKycFace
            })
            const {
                fullName,
                email,
                country,
                documentType,
                secondaryKycDocument,
                secondaryKycFace,
                checkbox
            } = data
            const kycData: any = {
                fullName: primaryKycData.fullName,
                email: primaryKycData.email,    
                country: country.value,
                documentType: primaryKycData?.documentType.value,
                city: primaryKycData.city,
                state: primaryKycData.state,
                zipCode: primaryKycData.zip_code,
                phone: primaryKycData.phone,
                address: primaryKycData.address,
                secondaryKycFullName: fullName,
                secondaryKycEmail: email,
                secondaryKycCountry: country.value,
                secondaryKycDocumentType: documentType.value,
                frontPartDoc: uploadFile.frontPartDoc,
                backPartDoc: uploadFile.backPartDoc,
                secondaryKycDocument: uploadFile.secondaryKycDocument,
                secondaryKycFace: uploadFile.secondaryKycFace
            } 
            const res = await axiosInstance.post('/kyc', kycData)
            if (res.status === 200) {
                toast.success('Kyc submitted successfully');
                localStorage.removeItem('primaryFormData');
            } else { 
                toast.error('Kyc submission failed');  
            } 
        } catch(error) {
            toast.error('Kyc submission failed');
        } finally {
            setLoading(false)
        }
    }     
    
    return (
        <div>
            <div className='lg:w-1/2 px-2 lg:px-0 mx-auto my-10'>
                <div className='text-center mb-14 space-y-2'>
                    <h1 className="text-xl font-bold">Upload a proof of your identity</h1>
                    <p className='text-xs'>DiasporeX Requires a valid government issue ID(drivers license,passport,national ID)</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='text-xs' encType="multipart/form-data">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
                        <div className="w-full">
                            <TextInputKYC
                                label="Full Name"
                                name="fullName"
                                register={register}
                                validation={{ required: 'Full Name is required' }}
                                errors={errors}
                                placeholder="Enter Full Name ..."
                            />
                        </div>
                        <div className="w-full">
                            <TextInputKYC
                                label="Email"
                                name="email"
                                register={register}
                                validation={{ required: 'Email is required' }}
                                errors={errors}
                                placeholder="Enter Email ..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-7">
                        <div className=" w-full">
                            <InputSelectKyc
                                name="country"
                                label="Country"
                                error="Country is required"
                                placeholder="Select Country"
                                control={control}
                                 borderColor={true}
                            />
                        </div>
                        <div className=" w-full">
                            <InputSelectKyc
                                control={control}
                                name="documentType"
                                label="Document Type"
                                error="Document Type is required"
                                placeholder="Select Document Type"
                                borderColor={true}
                            />
                        </div>
                    </div>
                    <SecondaryFileUpload
                        control={control}
                        errors={errors}
                    />
                    <div className='w-full pt-5 pb-7 '>
                        {
                            <button className='w-full bg-[#723EEB] lg:text-sm text-white px-1 py-[6px] rounded-[5px] cursor-pointer' type="submit" value="Apply">
                                {
                                    loading ? <LoadingSpinner className='w-4 h-4'/> : 'Apply'
                                }
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SecondaryKycForm;