"use client";
import { SocialLogin } from "@/app/auth/login/components";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import useAuthContext from "../AuthContext/useAuthContext";
import LoadingSpinner from "../common/Loading/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import './auth.css';


interface FormData {
  fullName: string;
  email: string;
  password: string;
  repassword: string;
}

const RegistrationForm = () => {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const axiosIntance = useAxiosSecure();
  const { loading, setLoading }: any = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const baseURL = process.env.BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (data.password !== data.repassword) {
        toast.error("Please fill the correct password");
      } else {
        const userInfo = {
          name: data.fullName,
          email: data.email,
          password: data.password,
          role: "USER"
        };
        const res = await axiosIntance.post('/auth/register', userInfo);
        if (res.status === 200) {
          toast.success("Please Check Your mail");
          setLoading(false);
          reset();
          // router.push('/auth/verify-email')
        }
      };
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Invalid data. Please check your input.");
        } else if (error.response.status === 409) {
          toast.error("Email is already registered. Please try logging in.");
        } else if (error.response.status === 500) {
          toast.error('Server Error');
        } else {
          toast.error(`Unexpected error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error("No response from the server. Please check your network.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }

  };

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-10 lg-my-0 max-w-xl w-full mx-auto">
      <h3 className="text-black font-semibold">Register</h3>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div className="mt-7">
          <input
            type="text"
            {...register("fullName", {
              required: "Name is required",
              minLength: 3
            })}
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-xl block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.fullName ? "border-red-500" : "border-gray-300"
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
            className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-xl block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.email ? "border-red-500" : "border-gray-300"
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
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                })}
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-xl block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter Password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-xl"
              >
                {showPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
              </button>
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
                type={showRePassword ? "text" : "password"}
                {...register("repassword", {
                  required: "Password is required",
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                })}
                className={`border border-gray-300 text-gray-900 focus:outline-none text-xs rounded-xl block w-full py-2.5 px-4 dark:border-gray-600 bg-white mt-1 ${errors.repassword ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Re-enter Password..."
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute top-3 right-4 text-xl"
              >
                {showRePassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
              </button>
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

{/*         <div className="border-[1.5px] border-[#9747FF] w-full p-2 rounded-xl">
          <h4 className="text-[#9747FF] text-xs px-2">
            You Are Referred By Abdul Karim
          </h4>
        </div> */}

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center text-sm justify-center text-black">
          <div className="custom-checkbox-container">
            <input
              type="checkbox"
              id="customCheckbox"
              className="hidden"
              checked={isChecked}
              onChange={toggleCheckbox}
            />
            <label htmlFor="customCheckbox" className="cursor-pointer flex items-center mr-2">
              <span className={`checkbox-icon ${isChecked ? 'checked' : ''}`}></span>
            </label>
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
            {loading ? <LoadingSpinner className="h-4 w-4" /> : 'Register'}
          </button>
        </div>
      </form>
      {/* Social Login */}
{/*       <div>
        <SocialLogin />
      </div> */}
    </div>
  );
};

export default RegistrationForm;
