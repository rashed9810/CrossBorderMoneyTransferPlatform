"use client"
import { GoDotFill } from "react-icons/go";
// import { recipientsData } from "../../utils/data/recipientsData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpin from "../2fa-security/LoadingSpin";
import SkeletonForRecipient from "../common/skeleton/SkeletonForRecipient";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRecipients from "../hooks/useRecipients";
import RecipientsTable from "./RecipientsTable";


type OpenStateType = {
    [key: number]: boolean;
};


const RecipientsCards = () => {
    const [open, setOpen] = useState<OpenStateType>({});
    const [select, setSelect] = useState<OpenStateType>({});
    const [selectID, setSelectID] = useState('');
    const [recipients, isPending, isLoading] = useRecipients();
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();
    const router = useRouter();

    const id = useSearchParams().get('id');
    //Add recipient
    const { data, isSuccess, isPending: isAddRecipientPending, isError, mutate, error } = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/transaction/wallet-to-bank/add-recipient/${id}`, {
                "recipientId": selectID
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['add-recipient'] })
        },
    });



    const toggleCard = (id: number) => {
        setOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSelect = (id: number) => {
        setSelectID(id.toString());
        setSelect(prevState => ({
            // ...prevState,
            [id]: !prevState[id]
        }));
    }

    const handleAddRecipient = () => {
        mutate();
    }


    useEffect(() => {
        if (isError) {
            toast.error(error.message);
        }
        if (isSuccess) {
            toast.success('Recipient selected successfully');
            redirect(`/user/send-money/wallet-payment-confirmation-card?id=${id}`);
        }
    }, [isSuccess, isError, id, error]);



    return (
        <>

            {isLoading ? <SkeletonForRecipient /> :
                recipients?.map((data: any) => (
                    <div key={data.id} className={`${select[data.id] ? 'bg-[#abd2e9]' : 'bg-white'} px-2 py-2 lg:px-6 lg:py-4 mb-5 rounded-2xl group cursor-pointer ${open[data.id] ? ' shadow-md shadow-neutral-400' : ''}`}>
                        <div className="flex flex-row justify-between items-center w-full">
                            <div onClick={() => toggleCard(data.id)} className="flex flex-row gap-3 lg:gap-4 items-start w-[85%]">
                                <div className="bg-gray-200 rounded-[50%] w-6 lg:w-9 h-6 lg:h-9 flex justify-center items-center ">
                                    <div
                                        className={`${open[(data.id)] ? "rotate-0" : "-rotate-180"
                                            } duration-500 bg-gray-200 rounded-full w-6 lg:w-9 h-6 lg:h-9 flex justify-center items-center text-black group-hover:bg-[#723EEB] group-hover:text-white`}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="lg:w-36 w-24">
                                    <h3 className="text-[10px] lg:text-base font-bold">{data.fullName}</h3>
                                    <div>
                                        <p className="text-[10px] -ml-[2px]"> <GoDotFill className="text-[#FF9F43] inline-block items-center -mr-1" /> Bank transfer</p>
                                    </div>
                                </div>
                                <div className="">
                                    <h3 className="text-[10px] lg:text-base font-semibold text-[#723EEB]">ID: {data.recipientId}</h3>
                                </div>
                            </div>
                            <div onClick={() => handleSelect(data.id)} className="flex flex-row justify-end gap-2 w-[15%]">
                                <button className="text-xs bg-[#723EEB] text-white w-24 p-1.5 rounded font-semibold">{select[data.id] ? 'Selected' : 'Select'}</button>
                            </div>
                        </div>
                        <div className={`grid transition-all duration-500 ease-in-out  ${open[data.id] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className='overflow-hidden flex flex-col'>
                                <RecipientsTable data={data} />
                            </div>
                        </div >
                    </div>
                ))
            }
            {!isLoading &&
                (
                    <div className='w-[50%] lg:w-[100%]'>
                        <button onClick={() => handleAddRecipient()} className="text-sm bg-[#723EEB] text-white w-full p-2.5 rounded-xl font-semibold flex justify-center items-center">
                            {isAddRecipientPending ? <LoadingSpin height='1rem' width='1rem' borderWidth='0.225rem' color='#FFF' /> : 'Next'}
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default RecipientsCards;