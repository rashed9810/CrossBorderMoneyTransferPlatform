import { useSearchTransaction } from "@/context/TransactionSearchContext";


const RecipientSearchField = () => {
    const { setRecipientSearchTerm } = useSearchTransaction();
    return (
        <div>
            <form className="w-28 sm:w-40 md:w-52 lg:w-72">
                <label
                    htmlFor="default-search"
                    className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setRecipientSearchTerm(e.target.value)}
                        type="search"
                        id="default-search"
                        className="block w-full py-1.5 pl-9 text-sm text-gray-900 border border-gray-400 rounded-[10px] bg-transparent focus:ring-0 focus:outline-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500"
                        placeholder="Enter Recipient Id..."
                    />
                </div>
            </form>
        </div>
    );
};

export default RecipientSearchField;
