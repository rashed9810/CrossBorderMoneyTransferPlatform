'use client'
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import useNavigationContext from './NavigationContext/useNavigationContext';
import TransactionSearchField from './common/searchField/TransactionSearchField';
import { BellIcon } from './icons/Icon';
import RecipientSearchField from './common/searchField/RecipientSearchField';
import { signOut } from 'next-auth/react';



const Topbar = ({ children }: { children: string }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { toggleNavigation }: any = useNavigationContext();
  const pathName = usePathname();
  const router = useRouter();
  const selectOptions = ['English', 'Hindi', 'Spanish'];

  const [dropdown, setDropdown] = useState(false);
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState(selectOptions[0]);

  const dropdownRef = useRef<HTMLDivElement | null>(null); 
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  const user = typeof window !== "undefined" ? localStorage.getItem('user') : '';

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

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
        signOut()
        router.push('/auth/login');
        typeof window !== "undefined" ? localStorage.clear() : null;
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        Cookies.remove('name', { path: '/' });
        sessionStorage.removeItem('hasShownWelcomeToast');

        Swal.fire({
          title: "Done",
          text: "You have successfully logged out.",
          icon: "success"
        });
      }
    });
  }



  return (
    <div>
      <div className="flex justify-between items-center py-4 flex-wrap">
        <div className="flex flex-row items-center gap-[6px]"><h3 className='flex items-center gap-2 text-sm font-semibold'>
          <div className='cursor-pointer' onClick={toggleNavigation}>
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.59088 3.90822H11.6786C11.8561 3.90822 12 3.78622 12 3.63576V2.36427C12 2.2138 11.8561 2.0918 11.6786 2.0918H3.59088V1.04602C3.59088 0.560542 2.89844 0.317415 2.49344 0.660695L0.188297 2.61468C-0.0627655 2.8275 -0.0627655 3.17253 0.188297 3.38532L2.49344 5.33931C2.89842 5.68259 3.59088 5.43946 3.59088 4.95398V3.90822Z" fill="black" />
              <path d="M8.40912 7.09178L0.321428 7.09178C0.14392 7.09178 -2.87291e-07 7.21378 -2.74137e-07 7.36424L-1.62979e-07 8.63574C-1.49825e-07 8.7862 0.14392 8.9082 0.321428 8.9082L8.40912 8.9082L8.40912 9.95398C8.40912 10.4395 9.10156 10.6826 9.50656 10.3393L11.8117 8.38532C12.0628 8.1725 12.0628 7.82747 11.8117 7.61468L9.50656 5.66069C9.10158 5.31742 8.40912 5.56054 8.40912 6.04602L8.40912 7.09178Z" fill="black" />
            </svg>
          </div>
          <span className='text-xs lg:text-base'>Dashboard</span>  </h3><span className='mb-[2px]'>{'>'}</span>
          <span className='text-xs lg:text-sm'>{children}</span>
        </div>
        <div className='flex items-center flex-wrap justify-end gap-1 lg:gap-4'>
          {/* SearchField   */}
          <div className=''>
            {
              pathName === '/user/transactions' ? <TransactionSearchField /> : ''
            }
            {
              pathName === '/user/recipients' ? <RecipientSearchField /> : ''
            }
          </div>
          {/* language */}
          <div ref={dropdownRef} className="relative sm:w-24 w-16 text-xs">
            <div onClick={() => {
              // setProfileDropdown(false)
              setDropdown(!dropdown)
            }} className="mx-auto flex w-full items-center justify-between rounded sm:px-3 px-1 py-0.5 border-[1.5px] border-gray-300 cursor-pointer">
              <h1 className="font-medium text-sm">{dropdownSelectedValue}</h1>

              <svg className={`${dropdown ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
            </div>

            {/* dropdown - options  */}
            <div className={`${dropdown ? 'visible top-2 lg:top-5 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded border duration-300 cursor-pointer`}>
              {selectOptions?.map((option, idx) => (
                <div key={idx} onClick={(e) => { setDropdownSelectedValue(option); setDropdown(false); }} className=" text-black hover:bg-gray-100 text-sm px-2 lg:px-4 py-1 ">
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
        {/* profile dropdown */}
          <div className='relative' ref={profileDropdownRef}>
            <div className='rounded-md cursor-pointer flex justify-center items-center'>
              <Image
                onClick={() => setProfileDropdown(!profileDropdown)}
                src="/user-avater.png"
                alt="Profile"
                className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-gray-300 rounded-xl"
                height={100}
                width={100}
              />
              {/* <svg className={`${profileDropdown ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg> */}
            </div>
            {/* profile dropdown options  */}
            <div className={`${profileDropdown ? 'visible top-9 right-0 bg-white opacity-100' : 'invisible top-12 opacity-0 right-0'} absolute transition-all mx-auto max-w-40 z-50 rounded border duration-300 ease-in-out cursor-pointer divide-y pb-3 `}>
              <p className='px-2 py-2 text-sm text-center w-full break-all'>{user && JSON.parse(user)?.name}</p>
              <ul id="dropdownMenu" className='space-y-2 pt-1' >
                <Link href={'/user/user-profile'} >
                  <li className='py-1 px-4 text-nowrap flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
                      <path
                        d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                        data-original="#000000"></path>
                    </svg>
                    View profile
                  </li>
                </Link>

                {/* <li className='py-1 px-4 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
                    <path
                      d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                      data-original="#000000"></path>
                  </svg>
                  Dashboard
                </li> */}
                <li onClick={handleLogout} className='py-1 px-4 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3"
                    viewBox="0 0 6.35 6.35">
                    <path
                      d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                      data-original="#000000"></path>
                  </svg>
                  Logout
                </li>
              </ul>

              {/* <Link href={'/user/user-profile'} >
                <div onClick={() => setProfileDropdown(!profileDropdown)} className="text-black hover:scale-110 duration-500">Profile</div>
              </Link> */}

              {/* <h3 onClick={handleLogout} className="text-black hover:scale-110 duration-500">Logout</h3> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;