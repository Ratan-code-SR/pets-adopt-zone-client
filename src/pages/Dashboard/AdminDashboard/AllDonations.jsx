
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdEditSquare } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import { BiDollar } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Title from "../../Title/Title";
import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import { BallTriangle } from "react-loader-spinner";
const AllDonations = () => {
    const axiosSecure = useAxiosSecure();
    const [pausedCampaigns, setPausedCampaigns] = useState({});
    const { data, isLoading ,refetch} = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations`);
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
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your data has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                    })
            }
        });
    }
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

    return (
        <div>
            <Title heading="Manage All Donations" />
            {
                data && data.length > 0 ?
                    (<div className="overflow-x-auto border p-5 my-5 shadow-lg">
                        <div>
                            <p className="text-3xl font-bold my-3 text-blue-500">All Donations:{data.length} </p>
                        </div>
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#96875d] text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Pet Name</th>
                                    <th>Maximum donation amount</th>
                                    <th>Actions your campaign</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {data.map((donation, index) =>
                                    <tr key={donation._id}>
                                        <td className="text-xl">{index + 1}</td>
                                        <td className="text-xl">{donation.petName}</td>
                                        <td>
                                            <p className="flex items-center gap-1"> {donation.maximumDonationAmount}  <span className="font-bold"><BiDollar /></span></p>

                                        </td>
                                        <td className="flex gap-5 items-center text-xl">
                                            <Link to={`/dashboard/editDonationCampaign/${donation._id}`}>
                                                <button title="edit" className="bg-[#ff9505] p-2 rounded-full text-white"><MdEditSquare /></button>
                                            </Link>
                                            <button
                                                onClick={() => togglePauseDonationCampaign(donation._id, !pausedCampaigns[donation._id])}
                                                className={`bg-[#ff9505] p-2 rounded-full text-white ${pausedCampaigns[donation._id] ? "opacity-50" : ""}`}
                                            >
                                                {pausedCampaigns[donation._id] ? <span><IoPlay /></span> : <span><FaRegCirclePause /></span>}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(donation._id)}
                                                title="view donators"
                                                className="bg-red-500 p-2 rounded-full text-white"><MdDelete /></button>
                                        </td>

                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>)
                    :
                    (<h1 className="text-center text-xl my-20"> Not create donation campaign.</h1>)

            }

        </div>
    );
};

export default AllDonations;