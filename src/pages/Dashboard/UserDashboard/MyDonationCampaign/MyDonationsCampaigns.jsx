import { FaRegCirclePause } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import {  useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Title from "../../../Title/Title";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdEditSquare } from "react-icons/md";
import { BiSolidDonateBlood, BiDollar } from "react-icons/bi";
import Progress from "./Progress";
import { Link } from "react-router-dom";
const MyDonationsCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [pausedCampaigns, setPausedCampaigns] = useState({});
    // const [donators, setDonators] = useState([]);
    const { data, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/donationsEmail/${user?.email}`);
            return res.data;
        },
    });

    const togglePauseDonationCampaign = async (id, isPaused) => {
        await axiosSecure.patch(`/donations/pause/${id}`, { isPaused });
        setPausedCampaigns((prev) => ({
            ...prev,
            [id]: isPaused,
        }));
    };

    // const handleDonator = async (id) => {
    //     const res = await axiosSecure.get(`/payments/donators/${id}`);
    //     setDonators(res.data);
    // }
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Title heading={"Manage Donation Campaigns"} />
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <div className="w-full px-4">
                        <Skeleton height={40} count={1} />
                        <Skeleton height={20} count={10} className="mt-4" />
                    </div>
                </SkeletonTheme>
            </div>
        );
    }

    return (
        <div>
            <Title heading={"Manage Donation Campaigns"} />
            {data && data.length > 0 ? (
                <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#96875d] text-white">
                            <tr>
                                <th>SL</th>
                                <th>Pet Name</th>
                                <th>Maximum donation amount</th>
                                <th>Progress</th>
                                <th>Actions your campaign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((pet, index) => (
                                <tr key={pet._id}>
                                    <td className="text-xl">{index + 1}</td>
                                    <td className="text-xl">{pet.petName}</td>
                                    <td className="flex items-center gap-1 text-xl">
                                        {pet.maximumDonationAmount}
                                        <span className="font-bold">
                                            <BiDollar />
                                        </span>
                                    </td>
                                    <td>
                                        <Progress />
                                    </td>
                                    <td className="flex gap-5 items-center text-xl">
                                        <Link to={`/dashboard/editDonationCampaign/${pet._id}`}>
                                            <button title="edit" className="bg-[#ff9505] p-2 rounded-full text-white">
                                                <MdEditSquare />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => togglePauseDonationCampaign(pet._id, !pausedCampaigns[pet._id])}
                                            className={`bg-[#ff9505] p-2 rounded-full text-white ${pausedCampaigns[pet._id] ? "opacity-50" : ""}`}
                                        >
                                            {pausedCampaigns[pet._id] ? <span><IoPlay /></span> : <span><FaRegCirclePause /></span>}
                                        </button>
                                        <button
                                            // onClick={() => handleDonator(pet._id)}
                                            title="view donators"
                                            className="bg-[#ff9505] p-2 rounded-full text-white"
                                        >
                                            <BiSolidDonateBlood />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1 className="text-center text-xl my-20">You have not added a pet.</h1>
            )}
        </div>
    );
};

export default MyDonationsCampaigns;
