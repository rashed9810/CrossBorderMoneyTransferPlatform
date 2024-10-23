import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCurrency = () => {
    const axiosInstance = useAxiosSecure();
    const { data: currency = [], refetch, isPending} = useQuery({
        queryKey: ['currency'],
        queryFn: async () => {
            const res = await axiosInstance.get('/currency');
            return res?.data?.data;
        },
    })
    return [currency, refetch, isPending];
};

export default useCurrency;