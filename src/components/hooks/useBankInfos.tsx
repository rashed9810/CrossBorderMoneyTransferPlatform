import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useMainWallet from "./useMainWallet";


const useBankInfos = () => {
    const [mainWallet] = useMainWallet();
    const axiosInstance = useAxiosSecure();
    const currencyCode = mainWallet?.currency?.code;

    const { data: bankInfos = {}, refetch : bankRefetch, isPending } = useQuery({
        queryKey: ['bankInfos'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/wallet/bank-details/${currencyCode}`);
            return res?.data?.data;
        },
    });
    return { bankInfos, bankRefetch, isPending };
};

export default useBankInfos;