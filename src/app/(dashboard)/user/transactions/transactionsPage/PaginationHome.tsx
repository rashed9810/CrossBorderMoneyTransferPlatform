
const PaginationHome = () => {
    return (
        <nav aria-label="" className="w-full">
            <ul className="flex flex-wrap w-full overflow-hidden items-center lg:-space-x-px h-8 text-sm font-medium ">
                <li>
                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 border border-[#723EEB] bg-[#723EEB] text-white">1</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">2</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">3</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">4</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">5</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">6</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">7</a>
                </li>
                <li>
                    <a href="#" className="hidden lg:flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">8</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">...</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 border-2 border-[#723EEB]">20</a>
                </li>
                <li className='flex items-center justify-center px-3 h-8 border-2 border-[#723EEB] cursor-pointer'>
                    <span className="sr-only">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                        <path d="M1.21656 0.783203L0.5 1.51569L5.48408 6.49976L0.5 11.4838L1.21656 12.2163L6.93312 6.49976L1.21656 0.783203ZM4.78344 0.783203L4.06688 1.51569L9.05096 6.49976L4.06688 11.4838L4.78344 12.2163L10.5 6.49976L4.78344 0.783203Z" fill="#4B4B4B" />
                    </svg>
                </li>


            </ul>
        </nav>
    )
}

export default PaginationHome
