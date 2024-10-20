'use client'
import React, { ReactNode, useEffect } from 'react';
import TheSidebar from '../shared/TheSidebar';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import { ToastContainer } from 'react-toastify';
import { redirect } from 'next/navigation';
import useAuthContext from '../AuthContext/useAuthContext';

interface LayoutProps {
    children: ReactNode;
}


const MainLayout = ({ children }: LayoutProps) => {
    const { loading }: any = useAuthContext();
    const { isNavOpen }: any = useNavigationContext();
    const user = typeof window !== "undefined" ? localStorage.getItem('user') : null;

    if (loading) {
        console.log('hit');
        return <div className="flex justify-center items-center h-[100vh] z-50 backdrop-brightness-90">
            <h1>Loading .....</h1>
        </div>
    }

    // useEffect(() => {
    //     if (user === null || !user) {
    //         redirect('/auth/login');
    //     }
    // }, [user]);

    return (
        <div>
            <div className='flex lg:flex-row w-full bg-gradient-to-tl from-cyan-200 to-pink-200 h-auto text-black'>
                <div className={`${isNavOpen ? 'w-[11%] xxs:w-[7%] sm:w-[6%] md:w-[16%]' : 'w-0 lg:w-[4%]'} fixed h-full xl:h-[99vh] bg-white custom-scrollbar duration-500 overflow-hidden`}>
                    <TheSidebar />
                </div>
                <div className={`${isNavOpen ? 'ml-[11%] xxs:ml-[7%] sm:ml-[6%] md:ml-[16%] w-full' : 'w-full lg:w-[100%] lg:ml-[4%]'} duration-500 `}>
                    <div className=' py-2 lg:pl-4 pl-2 pr-2'>
                        {children}
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div>
    );
};

export default MainLayout;