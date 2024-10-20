import React, { useEffect, useState } from 'react';
import BellIcon from './icons/Icon';
import Image from 'next/image';
import SearchField from './common/searchField/SearchField';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useNavigationContext from './NavigationContext/useNavigationContext';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


const Topbar = ({ children }: { children: string }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { toggleNavigation }: any = useNavigationContext();
  const pathName = usePathname();
  const router = useRouter();

  const selectOptions = ['English', 'Hindi', 'Spanish'];

  const [dropdown, setDropdown] = useState(false);
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState(selectOptions[0]);


  useEffect(() => {
    const close = () => {
      setDropdown(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close)
  }, [dropdown]);

  const handleLogout = () => {
    setProfileDropdown(false);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logged out!"
    }).then((result) => {
      if (result.isConfirmed) {

        router.push('/auth/login');
        typeof window !== "undefined" ? localStorage.clear() : null;
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });

        Swal.fire({
          title: "Done",
          text: "You have successfully logged out.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="flex justify-between items-center py-4 ">
      <div className="flex flex-row items-center gap-[6px]"><h3 className='flex items-center gap-2 text-sm font-semibold'>
        <div className='cursor-pointer' onClick={toggleNavigation}>
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.59088 3.90822H11.6786C11.8561 3.90822 12 3.78622 12 3.63576V2.36427C12 2.2138 11.8561 2.0918 11.6786 2.0918H3.59088V1.04602C3.59088 0.560542 2.89844 0.317415 2.49344 0.660695L0.188297 2.61468C-0.0627655 2.8275 -0.0627655 3.17253 0.188297 3.38532L2.49344 5.33931C2.89842 5.68259 3.59088 5.43946 3.59088 4.95398V3.90822Z" fill="black" />
            <path d="M8.40912 7.09178L0.321428 7.09178C0.14392 7.09178 -2.87291e-07 7.21378 -2.74137e-07 7.36424L-1.62979e-07 8.63574C-1.49825e-07 8.7862 0.14392 8.9082 0.321428 8.9082L8.40912 8.9082L8.40912 9.95398C8.40912 10.4395 9.10156 10.6826 9.50656 10.3393L11.8117 8.38532C12.0628 8.1725 12.0628 7.82747 11.8117 7.61468L9.50656 5.66069C9.10158 5.31742 8.40912 5.56054 8.40912 6.04602L8.40912 7.09178Z" fill="black" />
          </svg>
        </div>
        <span className='text-[10px] lg:text-xs'>Dashboard</span>  </h3><span className='mb-[2px]'>{'>'}</span>
        <span className='text-[9px] lg:text-[11px]'>{children}</span>
      </div>
      <div className='flex items-center justify-end gap-1 lg:gap-4'>
        <div className=''>
          {
            pathName === '/user/transaction' ? <SearchField /> : ''
          }
          {/* <SearchField />  */}
        </div>
        <div className="relative w-24 text-xs">
          <div onClick={() => setDropdown(!dropdown)} className="mx-auto flex w-full items-center justify-between rounded px-3 py-0.5 border-[1.5px] border-gray-300 cursor-pointer">
            <h1 className="font-medium text-sm">{dropdownSelectedValue}</h1>

            <svg className={`${dropdown ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
          </div>

          {/* dropdown - options  */}
          <div className={`${dropdown ? 'visible top-5 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded border duration-300 cursor-pointer`}>
            {selectOptions?.map((option, idx) => (
              <div key={idx} onClick={(e) => { setDropdownSelectedValue(option); setDropdown(false); }} className=" text-black hover:bg-gray-100 text-sm px-4 py-1 ">
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className='border-[2px] rounded-[10px] border-gray-300 p-1.5 lg:p-2'>
          <BellIcon />
        </div>
        {/* <Link href={`${'/user/user-profile'}`}>
          <Image
            src="/user-avater.png"
            alt="Profile"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-2xl "
            height={100}
            width={100}
          />
        </Link> */}
        <div>
          <div onClick={() => setProfileDropdown(!profileDropdown)} className='border-[2px] border-gray-300 rounded lg:px-2 cursor-pointer flex justify-center items-center'>
            <Image
              src="/user-avater.png"
              alt="Profile"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-2xl "
              height={100}
              width={100}
            />
            <svg className={`${profileDropdown ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
          </div>
          {/* profile dropdown options  */}
          <div className={`${profileDropdown ? 'visible top-16 p-2 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto right-2 w-[76px] z-50 rounded border duration-300 cursor-pointer`}>

            <Link href={'/user/user-profile'} >
              <div onClick={() => setProfileDropdown(!profileDropdown)} className="text-black hover:scale-110 duration-500">Profile</div>
            </Link>

            <h3 onClick={handleLogout} className="text-black hover:scale-110 duration-500">Logout</h3>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;