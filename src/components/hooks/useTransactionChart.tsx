
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTransactionChart = () => {
    const axiosInstance = useAxiosSecure();
    const { data: transactionChart = [], refetch : transactionRefetch, isPending } = useQuery({
        queryKey: ['transactionChart'],
        queryFn: async () => {
            const res = await axiosInstance.get('/dashboard/user/graph');
            return res?.data?.data;
        },
    })
    return [transactionChart, transactionRefetch, isPending];
};

export default useTransactionChart;