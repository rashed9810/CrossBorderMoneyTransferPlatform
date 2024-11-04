import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useDashboardCards = () => {
    const axiosInstance = useAxiosSecure();
    const { data: dashboardCards = {}, refetch : dashboardCardsRefetch, isPending } = useQuery({
        queryKey: ['dashboardCards'],
        queryFn: async () => {
            const res = await axiosInstance.get('/dashboard/user/meta');
            return res?.data?.data;
        },
    })
    return [dashboardCards, dashboardCardsRefetch, isPending];
};

export default useDashboardCards;