"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Topbar from "../Topbar";
import LoadingSpinner from "../common/Loading/LoadingSpinner";
import CardSubTitle from "../common/cardSubTitle/CardSubTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCurrency from "../hooks/useCurrency";



interface FormValues {
  fullName: string;
  email: string;
  country: string;
  city: string;
  phone: string;
  bankName: string;
  accountNumber: string;
}

const CreateSelectRecipientForm: React.FC = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [currency] = useCurrency();
  const axiosInstance = useAxiosSecure();
  const router = useRouter();
  const id = useSearchParams().get('id');

  


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit = async (data: FormValues) => {

    setLoading(true);
    try {
      setSubmitError("");
      // const res = await CreateRecipient(data);
      const res = await axiosInstance.post('/recipient', data);
      if (res.status === 200) {
        router.push(`/user/recipients/select-recipients?id=${id}`);
        toast.success("Recipient created successfully");
        reset();
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Token not found")) {
        toast.error("Authentication failed. Please log in again.");
        setSubmitError("Authentication failed. Please log in again.");
      } else {
        toast.error(error instanceof Error ? error.message : "Failed to create recipient. Please try again.");
        setSubmitError(error instanceof Error ? error.message : "Failed to create recipient. Please try again.");
      }
    }
    setLoading(false);
  };


  return (
    <div>
      <Topbar>Create Recipient</Topbar>
      <CardSubTitle title="Create Recipient" />
      <div className="bg-white px-2 lg:px-6 py-10 rounded-2xl text-xs my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <label className="block mb-3 font-semibold">Full Name*</label>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 2, message: "Full name must be at least 2 characters long" },
              })}
              className={`w-full px-3 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
              placeholder="Enter Full Name ..."
            />
            {errors.fullName && <div className="text-red-500 text-xs mt-1">{errors.fullName.message}</div>}
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4 mb-4">
            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">Email*</label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email",
                  },
                })}
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                placeholder="Enter Email ..."
              />
              {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
            </div>

            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">Phone*</label>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: "Phone number must be valid and contain 10 to 15 digits",
                  },
                })}
                className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                placeholder="Enter Phone Number..."
              />
              {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone.message}</div>}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4 mb-4">
            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">Select Country*</label>
              <select
                {...register("country", { required: "Country is required" })}
                className={`w-full px-3 py-2 border cursor-pointer ${errors.country ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
              >   <option disabled value="">Select Country</option>
                {

                  currency?.map((currency: any) => (
                    <option key={currency.id} value={currency?.country}>{currency?.country}</option>
                  ))
                }

              </select>
              {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country.message}</div>}
            </div>

            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">City*</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className={`w-full px-3 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                placeholder="Enter City ..."

              />
              {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city.message}</div>}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4 mb-4">
            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">Bank Name*</label>
              <select
                {...register("bankName", { required: "Bank name is required" })}
                className={`w-full px-3 py-2 border ${errors.bankName ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
              >
                <option value="">Select Bank</option>
                <option value="BankOfAmerica">Bank of America</option>
                <option value="FidelityBankPlc">Fidelity Bank Plc</option>
                <option value="WellsFargo">Wells Fargo</option>
                <option value="RoyalBankofCanada">Royal Bank of Canada</option>
                <option value="Rupali">Rupali</option>

              </select>
              {errors.bankName && <div className="text-red-500 text-xs mt-1">{errors.bankName.message}</div>}
            </div>
            <div className="lg:w-1/2">
              <label className="block mb-3 font-semibold">Bank Account Number*</label>
              <input
                type="text"
                {...register("accountNumber", {
                  required: "Account number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Account number must only contain digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Account number must be at least 10 digits long",
                  },
                })}
                className={`w-full px-3 py-2 border ${errors.accountNumber ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                placeholder="Enter Bank Account Number ..."
              />
              {errors.accountNumber && <div className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</div>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#723EEB] text-white w-full text-max px-4 py-2 text-xs rounded"
            >
              {loading ? <LoadingSpinner className="h-3 w-3" /> : 'Confirm'}
            </button>
          </div>
          {submitError && <div className="text-red-500 mt-4">{submitError}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateSelectRecipientForm;






