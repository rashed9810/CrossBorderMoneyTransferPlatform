import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTransactions = (page?: number, limit?: number, searchValue?: string) => {
    const axiosInstance = useAxiosSecure();
    const { data: transactions = [], refetch, isPending, isLoading } = useQuery({
        queryKey: ['transactions', page, limit, searchValue],
        queryFn: async () => {
            const res = await axiosInstance.get('/transaction/transaction-history', {
                params: {
                    limit,
                    page,
                    searchTerm: searchValue
                }
            });
            return res?.data;
        },
        // enabled: !!page,
        placeholderData: keepPreviousData
    })
    return [transactions, refetch, isPending, isLoading];
};

export default useTransactions;