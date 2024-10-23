import Image from 'next/image';

import UserCover from '../../../public/user-cover.png';
import UserProfile from '../../../public/user-avater.png';

const UserUpdateForm = () => {
    return (
        <div className='my-6 bg-white rounded-xl border border-red-600 h-[150vh] lg:h-[90%] xl:h-[86vh] 2xl:h-[87vh] 3xl:h-[70vh] 4xl:h-[65vh] 5xl:h-[58vh]'>

            <div className='w-full h-40 relative rounded-t-xl overflow-hidden'>
                <Image
                    src={UserCover}
                    layout='fill'
                    objectFit='cover'
                    alt='cover-photo'
                />
            </div>
            <div className='mx-7'>
                <div className='flex flex-row gap-4 absolute lg:-mt-2'>
                    <div>
                        <label className='block cursor-pointer'>
                            <input className='hidden' type="file" name="" id="" />
                            <Image className='rounded-full' src={UserProfile} width={60} height={40} alt='profileImage'></Image>
                            <div className='absolute ml-12 -mt-7'>
                                <svg width="18" height="18" className='bg-[#723EEB] p-1 rounded-full' viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 0L3.22049 0.197183L0.498264 2.20487L1.05729 2.61716L3.11111 1.10243V5.85275H3.88889V1.10243L5.94271 2.61716L6.50174 2.20487L3.77951 0.197183L3.5 0ZM0 6.42638V7H7V6.42638H0Z" fill="white" />
                                </svg>
                            </div>
                        </label>

                        <h3 className="font-semibold text-xs mt-1 text-[#723EEB]">ID : DPX0005</h3>

                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-[#723EEB]">khalilcherry</h3>
                        <p className='text-[8px] text-gray-400 mt-4'>khalilcherry@gmail.com</p>
                    </div>
                </div>
                <form className='pt-20'>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">Country*</label>
                            <input
                                type="text"
                                name="country"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter Country...."
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter Number...."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter Address...."
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">City</label>
                            <input
                                type="text"
                                name="city"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter City...."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">State</label>
                            <input
                                type="text"
                                name="state"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter State...."
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="block mb-2 text-gray-600 font-semibold text-sm">Zip Code</label>
                            <input
                                type="text"
                                name="zip"
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter Zip...."
                            />
                        </div>
                    </div>
                    <div className='w-3/4 mx-auto pb-3 lg:pb-0 lg:mt-5'>
                        <input className='w-full bg-[#723EEB] text-white p-1 rounded-[5px] text-sm' type="submit" value="Update" />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UserUpdateForm;