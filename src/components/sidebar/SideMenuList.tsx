'use client'

import { sideMenu } from '@/static';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StateProps {
    toggleNavigation?: () => void;
    isNavOpen: boolean;
}

const SideMenuList: React.FC<StateProps> = ({ toggleNavigation, isNavOpen }) => {
    const pathName = usePathname();


    return (
        <>
            <nav>
                <ul>
                    {/* for responsive*/}
                    {
                        sideMenu.map((item) => (
                            <Link href={`/${item?.link}`}
                            onClick={toggleNavigation}
                                key={item?.id}
                                className={`flex items-center h-full py-1 px-[3px] my-3 rounded-[10px] mx-1 overflow-x-hidden ${isNavOpen ? ' w-fit md:w-auto' : ''} ${pathName === `/${item.link}` && `${isNavOpen && 'bg-gray-200'}`} cursor-pointer lg:hidden`}
                            >
                                <div className='flex items-center gap-2 duration-300 hover:scale-y-110 hover:scale-x-105 w-full'>

                                    <div className={`flex justify-center items-center ${pathName === `/${item.link}` ? 'bg-[#723EEB] w-6 h-6 stroke-white rounded-[30%]' : 'w-6 h-6 bg-[#ebe6fa] rounded-[30%]'}`}>
                                        {item.icon}
                                    </div>
                                    <div
                                        className={` text-sm font-semibold capitalize transition-transform transform ${pathName === `/${item.link}` && 'font-bold'} ${isNavOpen ? 'md:block hidden' : 'hidden'}`}
                                    >
                                        {item?.name}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    {/* for desktop */}
                    {
                        sideMenu.map((item) => (
                            <Link href={`/${item?.link}`}
                                key={item?.id}
                                className={` lg:flex gap-2 items-center h-full py-3 rounded-[10px] duration-300 ${isNavOpen ? ' lg:px-2.5 mx-2' : 'lg:px-2 lg:w-10 mx-auto'} ${pathName === `/${item.link}` && `${isNavOpen ? 'bg-gray-200 xl:w-[93%] ' : 'bg-gray-200'}`} cursor-pointer hidden lg:block text-black`}
                            >
                                <div className='flex items-center gap-2 duration-300 hover:scale-y-110 hover:scale-x-105 w-full'>

                                    <div className={`flex justify-center items-center ${pathName === `/${item.link}` ? 'bg-[#723EEB] w-6 h-6 stroke-white rounded-[30%]' : 'w-6 h-6 bg-[#ebe6fa] rounded-[30%]'}`}>
                                        {item.icon}
                                    </div>
                                    <div
                                        className={` text-sm capitalize transition-transform transform ${pathName === `/${item.link}` && 'font-semibold'} ${isNavOpen ? 'lg:block hidden' : 'hidden'}`}
                                    >
                                        {item?.name}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </ul>
            </nav>
        </>
    );
};

export default SideMenuList;