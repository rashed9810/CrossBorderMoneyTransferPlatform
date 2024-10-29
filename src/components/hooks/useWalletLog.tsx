import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useWalletLog = () => {
    const axiosInstance = useAxiosSecure();
    const { data: walletLog = [], refetch, isPending} = useQuery({
        queryKey: ['walletLog'],
        queryFn: async () => {
            const res = await axiosInstance.get('/wallet/log');
            return res?.data?.data;
        },
    })
    return [walletLog, refetch, isPending];
};

export default useWalletLog;