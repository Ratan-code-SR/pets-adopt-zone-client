import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Title from "../../../Title/Title";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import { MdEditSquare } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import { BiSolidDonateBlood, BiDollar } from "react-icons/bi";
import Progress from "./Progress";
import { Link } from "react-router-dom";
const MyDonationsCampaigns = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/donationsEmail/${user?.email}`)
            return res.data;
        }
    })
    // console.log(data);
    if (isLoading) {
        return <div>
            <Title subHeading={'My donation Campaign'} heading={'manage donation campaign'} />
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    }
    // handle delete your owen pet

    return (
        <div>
            <Title subHeading={'My donation Campaign'} heading={'manage donation campaign'} />
            {
                data && data.length > 0 ?
                    (<div className="overflow-x-auto border p-5 my-5 shadow-lg">
                        {/* <div>
                            <p className="text-3xl font-bold my-3">Total Pets:{data.length} </p>
                        </div> */}
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
                                {/* row 1 */}
                                {data.map((pet, index) =>
                                    <tr key={pet._id}>
                                        <td className="text-xl">{index + 1}</td>
                                        <td className="text-xl">{pet.petName}</td>
                                        <td className="flex items-center gap-1 text-xl">
                                            {pet.maximumDonationAmount}
                                            <span className="font-bold"><BiDollar /></span>
                                        </td>
                                        <td>
                                            <Progress />
                                        </td>
                                        <td className="flex gap-5 items-center text-xl">
                                            <Link to={`/dashboard/editDonationCampaign/${pet._id}`}>
                                                <button title="edit" className="bg-[#ff9505] p-2 rounded-full text-white"><MdEditSquare /></button>
                                            </Link>

                                            <button
                                                title="pause"
                                                className="bg-[#ff9505] p-2 rounded-full text-white"><FaRegCirclePause /></button>
                                            <button
                                                title="view donators"
                                                className="bg-[#ff9505] p-2 rounded-full text-white"><BiSolidDonateBlood /></button>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>)
                    :
                    (<h1 className="text-center text-xl my-20">You have not added a pet.</h1>)

            }

        </div>
    );
};

export default MyDonationsCampaigns;