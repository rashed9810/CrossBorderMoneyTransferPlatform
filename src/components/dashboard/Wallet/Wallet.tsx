import Link from "next/link";
import { MdOutlineAttachMoney } from "react-icons/md";


const Wallet = () => {
    return (
        <div>
            <div className=" lg:flex items-center justify-center">
                <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-3 font-semibold">
                    <Link href={'/user/wallet'} className="bg-gradient-to-r from-[#CD83FD] to-[#B37AFE]  text-white rounded p-4 shadow-lg lg:w-6/12 md:w-64 grid content-between">
                        <div>
                            <h2 className="text-base ">My Wallet</h2>
                            <p className="mt-2 text-[10px]  ">26 APR 2024</p>
                        </div>
                        <p className=" text-xs  text-end">214 *** *** ***</p>
                        <div>
                            <p className=" text-[10px] ">Wallet Balance</p>
                            <p className="mt-1 text-base ">0.00$</p>
                        </div>
                    </Link>
                    <div className="grid md:grid-cols-2 gap-3 text-black w-full">
                        <div className="bg-white rounded p-4 shadow-lg w-full">
                            <div className="flex justify-between">
                                <h3 className="text-sm ">Total Send Money</h3>
                                <div className="-mt-2"><MdOutlineAttachMoney className="text-5xl bg-[#723EEB] rounded-full p-2 text-white  " /></div>
                            </div>
                            <p className=" text-sm ">0.00</p>
                        </div>
                        <div className="bg-white rounded p-4 shadow-lg w-full grid content-between  ">
                            <div className="flex justify-between">
                                <h3 className="text-sm ">Total Transaction</h3>
                            </div>
                            <p className="mt-2 text-sm ">7</p>
                        </div>
                        <div className="bg-white rounded p-4 shadow-lg w-full grid content-between  ">
                            <div className="flex justify-between">
                                <h3 className="text-sm ">Completed Transaction</h3>
                            </div>
                            <p className="mt-2 text-sm ">3</p>
                        </div>
                        <div className="bg-white rounded p-4 shadow-lg w-full grid content-between  ">
                            <div className="flex justify-between">
                                <h3 className="text-sm ">Ongoing Transaction</h3>
                            </div>
                            <p className="mt-4 text-sm ">2</p>
                        </div>
                        {/* <div className="bg-white rounded p-4 shadow-lg w-full grid content-between  ">
                            <div className="flex justify-between">
                                <h3 className="text-sm ">Canceled Transaction</h3>
                            </div>
                            <p className="mt-2 text-sm ">2</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet
