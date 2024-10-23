"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";
import SkeletonForRecipient from "../common/skeleton/SkeletonForRecipient";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDeleteRecipient from "../hooks/useDeleteRecipients";
import RecipientsTable from "./RecipientsTable";

import AssetEmptyBox from '../../../public/empty-box.png';
import useRecipients from "../hooks/useRecipients";
import { useSearchTransaction } from "@/context/TransactionSearchContext";

const RecipientsCards = () => {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const {recipientSearchTerm} = useSearchTransaction();
    const [recipients, refetch, isPending, isLoading] = useRecipients(recipientSearchTerm);
    const { deleteRecipient, isDeleting } = useDeleteRecipient();
    const router = useRouter();
    const axiosInstance = useAxiosSecure();

    const toggleCard = (id: string) => {
        setOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    // get single recipient value
    const handleSingleRecipient = (id: any) => {
        router.push(`/user/recipients/edit-recipient?id=${id}`)
    };

    // delete recipient
    const handleDeleterecipient = async (id: string) => {
        // deleteRecipient(id);
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosInstance.delete(`/recipient/${id}`);
                if (res?.data?.statusCode === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Recipient deleted successfully",
                        icon: "success",
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <>
            {
                isLoading ? <SkeletonForRecipient /> :
                    recipients?.length === 0 ? (
                        <div className='flex animate-pulse justify-center flex-col items-center gap-2  py-5 rounded-xl bg-white w-full'>
                            <Image src={AssetEmptyBox} alt='empty' width={90} height={90} />
                            <p className='text-[#0F30B9]/60 font-semibold text-lg'>No Data!</p>
                        </div>
                    )
                        :
                        (
                            recipients?.map((data: any) => (
                                <div
                                    key={String(data.id)}
                                    className={`bg-white px-2 py-2 lg:px-6 lg:py-4 mb-5 rounded-2xl cursor-pointer group ${open[String(data.id)] ? "shadow-md shadow-neutral-400" : ""
                                        }`}
                                >
                                    <div className="flex flex-row justify-between items-center">
                                        <div onClick={() => toggleCard(String(data.id))} className="flex flex-row gap-3 lg:gap-4 items-start w-full">
                                            <div
                                                className={`${open[String(data.id)] ? "rotate-0" : "-rotate-180"
                                                    } duration-500 bg-gray-200 rounded-full w-6 lg:w-9 h-6 lg:h-9 flex justify-center items-center text-black group-hover:bg-[#723EEB] group-hover:text-white`}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <div className="lg:w-36 w-24">
                                                <h3 className="text-[10px] lg:text-base font-bold">{data.fullName}</h3>
                                                <div>
                                                    <p className="text-[10px] -ml-[2px]">
                                                        <GoDotFill className="text-[#FF9F43] inline-block items-center -mr-1" /> Bank transfer
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] lg:text-base font-semibold text-[#723EEB]">
                                                    ID: {data.recipientId}
                                                    {/* Convert recipientsId to string */}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <button onClick={() => handleSingleRecipient(data?.id)} className="bg-[#723EEB] rounded-full flex justify-center items-center w-6 lg:w-12 h-6">
                                                <svg
                                                    width="10"
                                                    height="10"
                                                    viewBox="0 0 10 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8.65388 -0.00390625C8.30888 -0.00390625 7.97356 0.134737 7.7124 0.3959L7.67371 0.434591L7.41577 0.189549L0.606158 6.99916L0.580364 7.12813L0.12897 9.398L0 10.0042L0.606158 9.87518L2.87603 9.42379L3.005 9.398L9.81461 2.58839L9.56956 2.34334L9.59536 2.31755L9.60825 2.29176C10.1306 1.76943 10.1306 0.918228 9.60825 0.3959C9.34709 0.134737 8.99887 -0.00390625 8.65388 -0.00390625ZM8.65388 0.808604C8.78285 0.808604 8.91827 0.86664 9.02789 0.976265C9.24875 1.19713 9.24875 1.49053 9.02789 1.71139L8.9892 1.75008L8.25407 1.01496L8.29276 0.976265C8.40239 0.86664 8.52491 0.808604 8.65388 0.808604ZM7.42866 1.35028L8.65388 2.57549L8.06062 3.18165L6.82251 1.94354L7.42866 1.35028ZM6.25504 2.5368L7.46735 3.74912L3.15976 8.06961L2.9921 7.32158L2.94051 7.06364L2.68257 7.01205L1.93455 6.84439L6.25504 2.5368ZM1.34129 7.55373L2.24408 7.76008L2.45043 8.66287L1.61212 8.83053L1.17363 8.39203L1.34129 7.55373Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </button>
                                            {/* <Link href="/user/recipients/edit-recipient" className="bg-[#723EEB] rounded-full flex justify-center items-center w-6 lg:w-12 h-6">
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.65388 -0.00390625C8.30888 -0.00390625 7.97356 0.134737 7.7124 0.3959L7.67371 0.434591L7.41577 0.189549L0.606158 6.99916L0.580364 7.12813L0.12897 9.398L0 10.0042L0.606158 9.87518L2.87603 9.42379L3.005 9.398L9.81461 2.58839L9.56956 2.34334L9.59536 2.31755L9.60825 2.29176C10.1306 1.76943 10.1306 0.918228 9.60825 0.3959C9.34709 0.134737 8.99887 -0.00390625 8.65388 -0.00390625ZM8.65388 0.808604C8.78285 0.808604 8.91827 0.86664 9.02789 0.976265C9.24875 1.19713 9.24875 1.49053 9.02789 1.71139L8.9892 1.75008L8.25407 1.01496L8.29276 0.976265C8.40239 0.86664 8.52491 0.808604 8.65388 0.808604ZM7.42866 1.35028L8.65388 2.57549L8.06062 3.18165L6.82251 1.94354L7.42866 1.35028ZM6.25504 2.5368L7.46735 3.74912L3.15976 8.06961L2.9921 7.32158L2.94051 7.06364L2.68257 7.01205L1.93455 6.84439L6.25504 2.5368ZM1.34129 7.55373L2.24408 7.76008L2.45043 8.66287L1.61212 8.83053L1.17363 8.39203L1.34129 7.55373Z"
                                            fill="white"
                                        />
                                    </svg>
                                </Link> */}
                                            <div onClick={() => handleDeleterecipient(data?.id)} className="bg-red-600 rounded-full flex justify-center items-center w-6 lg:w-12 h-6">
                                                <svg
                                                    width="10"
                                                    height="10"
                                                    viewBox="0 0 10 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4 0C3.73828 0 3.4707 0.091797 3.28125 0.28125C3.0918 0.470703 3 0.738281 3 1V1.5H0V2.5H0.5V10.5C0.5 11.3223 1.17773 12 2 12H8C8.82227 12 9.5 11.3223 9.5 10.5V2.5H10V1.5H7V1C7 0.738281 6.9082 0.470703 6.71875 0.28125C6.5293 0.091797 6.26172 0 6 0H4ZM4 1H6V1.5H4V1ZM1.5 2.5H8.5V10.5C8.5 10.7773 8.27734 11 8 11H2C1.72266 11 1.5 10.7773 1.5 10.5V2.5ZM2.5 4V9.5H3.5V4H2.5ZM4.5 4V9.5H5.5V4H4.5ZM6.5 4V9.5H7.5V4H6.5Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out  ${open[String(data.id)] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden flex flex-col">
                                            <RecipientsTable data={data} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
            }
        </>
    );
};
export default RecipientsCards; 
