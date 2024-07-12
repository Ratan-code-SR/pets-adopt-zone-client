
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { BallTriangle } from "react-loader-spinner";
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
        return <div className="flex justify-center items-center h-screen">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
    const sortedData = Array.isArray(data) ? [...data].reverse() : [];
    return (
        <div className="px-2 my-5">
            <Title subHeading={'donate '} heading={'Donations Campaign'} />
            <div className="grid lg:grid-cols-3  sm:grid-cols-2 items-center justify-center gap-5">
                {
                    sortedData.map(donate => (<div key={donate._id}>
                        <div className="card card-compact w-full h-[400px] bg-base-100 shadow-xl">
                            <figure><img className='w-full h-[400px]' src={donate.petImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="flex items-center gap-2 text-xl"> <span><MdOutlinePets /></span>{donate.petName}    </h2>
                                <div className='flex gap-2 justify-between items-center'>
                               <span className="text-2xl"><BiSolidDonateBlood/></span>
                                    <p className="text-xl">{donate.maximumDonationAmount} $</p>
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