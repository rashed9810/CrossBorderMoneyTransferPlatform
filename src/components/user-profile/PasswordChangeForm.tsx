'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

interface FormData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const PasswordChangeForm = () => {
    const [currentPassword, setCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const axiosInstance = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        const oldPassword = data.currentPassword;
        const newPassword = data.newPassword;
        const confirmPassword = data.confirmNewPassword;

        const changedPasswordInfo = {
            oldPassword,
            newPassword,
        };
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                toast.error("New Password doesn't match");
                setLoading(false);
                return
            }
            else {
                const res = await axiosInstance.post('/auth/change-password', changedPasswordInfo);
                if (res?.status === 200) {
                    reset();

                    toast.success("Password has been changed");
                    setLoading(false);
                }
            }
        } catch (error: any) {
            if (error) {
                toast.error(error?.response?.data?.message);
                setLoading(false);
            }

        }
    }

    return (
        <div className='bg-white p-4 mt-7 rounded-xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Current Password Field */}
                <div className="">
                    <label className="text-gray-600 font-bold text-sm">Current Password*</label>
                    <div className="relative">
                        <input
                            type={`${currentPassword ? 'text' : 'password'}`}
                            {...register("currentPassword", {
                                required: "Current Password is required",
                            })}
                            className={`my-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-[10px] focus:outline-none`}
                            placeholder="Enter Password....."
                        />
                        <button
                            type="button"
                            onClick={() => setCurrentPassword(!currentPassword)}
                            className="absolute top-3 right-2 text-[11px]"
                        >
                            {currentPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                        </button>
                    </div>

                    {errors.currentPassword && (
                        <p className="text-red-500 text-xs">{errors.currentPassword.message}</p>
                    )}
                </div>
                {/* Current Password Field */}
                <div className="mt-5">
                    <label className="text-gray-600 font-bold text-sm">New Password*</label>
                    <div className="relative">
                        <input
                            type={`${newPassword ? 'text' : 'password'}`}
                            {...register("newPassword", {
                                required: "New Password is required",
                                minLength: 8,
                                maxLength: 15,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                            })}
                            className={`my-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-[10px] focus:outline-none`}
                            placeholder="Enter Password....."
                        />
                        <button
                            type="button"
                            onClick={() => setNewPassword(!newPassword)}
                            className="absolute top-3 right-2 text-[11px]"
                        >
                            {newPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                        </button>
                    </div>

                    {errors.newPassword && (
                        <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
                    )}
                    {errors.newPassword?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Password must be at least 8 characters</p>
                    )}
                    {errors.newPassword?.type == "maxLength" && (
                        <span className='text-red-600 text-xs -mt-5'>Password must be maximum 15 characters</span>
                    )}
                    {errors.newPassword?.type == "pattern" && (
                        <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
                    )}
                </div>
                {/* Current Password Field */}
                <div className="mt-5">
                    <label className="text-gray-600 font-bold text-sm">Confirm Password*</label>
                    <div className="relative">
                        <input
                            type={`${confirmPassword ? 'text' : 'password'}`}
                            {...register("confirmNewPassword", {
                                required: "Password is required",
                                minLength: 8,
                                maxLength: 15,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
                            })}
                            className={`my-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-[10px] focus:outline-none`}
                            placeholder="Enter Password....."
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPassword(!confirmPassword)}
                            className="absolute top-3 right-2 text-[11px]"
                        >
                            {confirmPassword ? <LiaEyeSolid className='text-base' /> : <LiaEyeSlashSolid className='text-base' />}
                        </button>
                    </div>

                    {errors.confirmNewPassword?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.confirmNewPassword.message}</p>
                    )}
                    {errors.confirmNewPassword?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Password must be at least 8 numbers</p>
                    )}
                    {errors.confirmNewPassword?.type == "maxLength" && (
                        <span className='text-red-600 text-xs -mt-5'>Password must be maximum 15 characters</span>
                    )}
                    {errors.confirmNewPassword?.type == "pattern" && (
                        <span className='text-red-600 text-xs -mt-5'>Password must have atleast one uppercase,one lowercase and one special character</span>
                    )}
                </div>
                <div className="w-full mx-auto mt-3">
                    <button
                        type="submit"
                        className="w-full bg-[#723EEB] text-white p-1 rounded text-sm"
                    >
                        {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Change'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChangeForm;