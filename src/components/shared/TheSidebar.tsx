import React, { useState } from 'react';
import SideMenuList from '../sidebar/SideMenuList';
import SideLogo from './SideLogo';
import useNavigationContext from '../NavigationContext/useNavigationContext';

const TheSidebar = () => {
    const { isNavOpen, toggleNavigation }: any = useNavigationContext();


    return (
        <div>
            {/* responsive */}
            <div className={` duration-300 ease-in-out overflow-y-auto ${isNavOpen ? "translate-x-0" : "-translate-x-20"} lg:hidden`}>
                <div className=''>
                    <div className=' flex flex-row justify-center items-center'>
                        <SideLogo />
                    </div>
                    <div className='mt-12 mb-3'>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
            {/* desktop */}
            <div className={` duration-300 ease-in-out overflow-y-auto ${isNavOpen ? "translate-x-0 " : ""} hidden lg:block`}>
                <div className=''>
                    <div className='p-4 flex flex-row justify-center items-center'>
                        <SideLogo />
                    </div>
                    <div className={`${isNavOpen ? 'mt-3 mb-3 duration-300' : 'xl:mt-12 lg:pb-12 xl:pb-0 mb-3 duration-300'} h-[81vh] overflow-y-auto`}>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheSidebar;