
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const DonationCampaign = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations`)
            return res.data;
        }
    })
    if (isLoading) {
        return <div>
            <Title subHeading={'donate '} heading={'Donations Campaign'} />
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    }
    const sortedData = [...data].reverse();
    return (
        <div>
            <Title subHeading={'donate '} heading={'Donations Campaign'} />
            <div className="lg:grid grid-cols-3 gap-5 items-center justify-center flex flex-col">
                {
                    sortedData.map(donate => (<div key={donate._id}>
                        <div className="card card-compact w-96 h-[400px] bg-base-100 shadow-xl">
                            <figure><img className='w-full' src={donate.petImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{donate.petName}</h2>
                                <div className='flex justify-between items-center'>
                                    <p>{donate.maximumDonationAmount}</p>
                                </div>
                                <Link to={`/donationsDetails/${donate._id}`} >
                                    <div className="card-actions w-full ">
                                        <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>))
                }
            </div>

        </div>
    );
};

export default DonationCampaign;