'use client'
import { ReactNode } from 'react';
import useAuthContext from '../AuthContext/useAuthContext';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import TheSidebar from '../shared/TheSidebar';

interface LayoutProps {
    children: ReactNode;
}


const MainLayout = ({ children }: LayoutProps) => {
    const { loading }: any = useAuthContext();
    const { isNavOpen }: any = useNavigationContext();
    const user = typeof window !== "undefined" ? localStorage.getItem('user') : null;


    // if (loading) {
    //     return <div className="flex justify-center items-center h-[100vh]">
    //         <Image src={'/loader.gif'} width={40} height={40} alt='Loader' />
    //     </div>
    // };

    // if (loading) {
    //     return <div className='h-screen w-screen bg-gradient-to-tl from-cyan-200 to-pink-200 flex justify-center items-center'>
    //         <LoaderWithLottie width={300} height={300} />
    //     </div>
    // };



    return (
        <div>
            <div className='flex w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
                {/* Sidebar */}
                <div
                    className={`h-screen bg-white transition-all duration-500 ease-in-out overflow-auto ${isNavOpen
                        ? 'w-[12%] md:w-[20%] lg:w-[18%] xl:w-[15%] 5xl:w-[10%] translate-x-0'
                        : 'w-[0] lg:w-[5%] 5xl:w-[3%] translate-x-[-100%] md:translate-x-0'
                        }`}
                >
                    <TheSidebar />
                </div>

                {/* Main content */}
                <div
                    className={`h-screen transition-all duration-500 ease-in-out ${isNavOpen
                        ? 'w-[88%] md:w-[80%] lg:w-[82%] xl:w-[85%] 5xl:w-[90%]'
                        : 'w-[100%] lg:w-[95%] 5xl:w-[97%]'
                        }`}
                >
                    <div className='h-full custom-scrollbar overflow-y-auto overflow-x-hidden py-2 lg:pl-4 pl-2 pr-2'>
                        {children}
                    </div>
                </div>

                {/* <Toaster /> */}
            </div>
        </div>
    );
};

export default MainLayout;

