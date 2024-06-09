
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../Hooks/useAxiosSecure';

const useDonations = () => {
    const axiosSecure = useAxiosSecure()
    const { data: donations = [], isPending: loading ,refetch} = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure('/donations')
            return res.data;

        }

    })

    return [donations, loading,refetch];
};

export default useDonations;