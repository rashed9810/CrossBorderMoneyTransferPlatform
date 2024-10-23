"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SocialLogin } from "@/app/auth/login/components";
import useAxiosSecure from "../hooks/useAxiosSecure";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  repassword: string;
}

const RegistrationForm = () => {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const axiosIntance = useAxiosSecure();
  const baseURL = process.env.BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

    if (data.password !== data.repassword) {
      console.log("Please fill the correct password");
    } else {
      const userInfo = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };
      const res = await axiosIntance.post('/auth/register', userInfo);
      if (res.status === 200) {
        console.log(res.status)
        toast.success("You have successfully registered");
      }
    };

  };

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-2 lg:px-6 py-6 my-5 lg:my-10 w-full">
      <h3 className="text-base font-semibold text-black">Register</h3>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div className="mt-7">
          <input
            type="text"
            {...register("fullName", {
              required: "Name is required",
              minLength: 3
            })}
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter Full Name"
          />
          {errors.fullName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </span>
          )}
          {errors.fullName?.type == "minLength" && (
            <span className='text-red-600 text-xs -mt-5'>Name must be atleast 3 characters</span>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <div className="w-full">
            <div className="relative">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                })}
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter Password..."
              />
            </div>
            {errors.password?.type == "required" && (
              <span className='text-red-600 text-xs -mt-5'>Password is required</span>
            )}
            {errors.password?.type == "minLength" && (
              <span className='text-red-600 text-xs -mt-5'>Password must be atleast 8 characters</span>
            )}
            {errors.password?.type == "maxLength" && (
              <span className='text-red-600 text-xs -mt-5'>Password must be maximum 20 characters</span>
            )}
            {errors.password?.type == "pattern" && (
              <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
            )}
          </div>

          <div className="w-full">
            <div className="relative">
              <input
                type="password"
                {...register("repassword", {
                  required: "Password is required",
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                })}
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-full block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.repassword ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Re-enter Password..."
              />
            </div>
            {errors.repassword?.type == "required" && (
              <span className='text-red-600 text-xs -mt-5'>Password is required</span>
            )}
            {errors.repassword?.type == "minLength" && (
              <span className='text-red-600 text-xs -mt-5'>Password must be atleast 8 characters</span>
            )}
            {errors.repassword?.type == "maxLength" && (
              <span className='text-red-600 text-xs -mt-5'>Password must be maximum 20 characters</span>
            )}
            {errors.repassword?.type == "pattern" && (
              <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
            )}
          </div>
        </div>

        <div className="border-[1.5px] border-[#9747FF] w-full p-2 rounded-full">
          <h4 className="text-[#9747FF] text-xs px-2">
            You Are Referred By Abdul Karim
          </h4>
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center text-sm justify-center text-black">
          <div onClick={toggleCheckbox} className="cursor-pointer flex items-center mr-2">
            {isChecked ? (
              // Checked SVG
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  fill="#723EEB"
                />
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  stroke="#723EEB"
                  strokeWidth="0.5"
                />
                <path
                  d="M5 9L7.5 11.5L13 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Unchecked SVG
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  fill="black"
                  fillOpacity="0.3"
                />
                <rect
                  x="0.25"
                  y="0.25"
                  width="17.5"
                  height="17.5"
                  rx="6.75"
                  stroke="#AAA9A9"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <span>
            I have agreed with{" "}
            <Link href="/terms" className="underline ml-1 text-[#723EEB]">
              Terms Of Use & Privacy Policy
            </Link>{" "}
            {" "}

          </span>
        </div>

        {/* Registration Button */}
        <div className="">
          <button
            type="submit"
            className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500">
            Register
          </button>
        </div>


        <SocialLogin />
      </form>
    </div>
  );
};

export default RegistrationForm;
