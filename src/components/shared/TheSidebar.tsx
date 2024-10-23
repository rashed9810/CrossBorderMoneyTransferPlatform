import useNavigationContext from '../NavigationContext/useNavigationContext';
import SideMenuList from '../sidebar/SideMenuList';
import SideLogo from './SideLogo';

const TheSidebar = () => {
    const { isNavOpen, toggleNavigation }: any = useNavigationContext();


    // md:w-40 w-[2.85rem],w-[2.85rem]
    // w-44 xl:w-60, w-[3.5rem]
    return (
        <div>
            {/* responsive */}
            <div className={`duration-300 ease-in-out overflow-y-auto scr w-full ${isNavOpen ? "translate-x-0 " : "-translate-x-full"} h-full lg:hidden [&::-webkit-scrollbar]:w-0 `} >
                <div className='w-full'>
                    <div className='flex justify-center items-center w-full pt-3'>
                        {
                            isNavOpen ? <SideLogo /> : null
                        }
                    </div>
                    <div className={`${isNavOpen ? 'mt-3 mb-3' : ''} h-full flex flex-col justify-center items-center gap-3  overflow-y-auto [&::-webkit-scrollbar]:w-0 duration-300`}>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
            {/* desktop */}
            <div className={` duration-300  ease-in-out overflow-y-auto ${isNavOpen ? "translate-x-0" : ""} hidden lg:block`}>
                <div className=''>
                    <div className={`p-2 flex flex-row justify-center items-center`}>
                        {
                            isNavOpen ? <SideLogo /> : null
                        }
                    </div>
                    <div className={`${isNavOpen ? 'mt-7' : 'mt-[90px]'} h-[80vh] overflow-y-auto duration-300`}>
                        <SideMenuList isNavOpen={isNavOpen}
                            toggleNavigation={toggleNavigation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheSidebar;