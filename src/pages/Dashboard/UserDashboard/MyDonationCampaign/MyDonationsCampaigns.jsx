
import { FaRegCirclePause } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import { useEffect, useState } from "react";
import Title from "../../../Title/Title";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdEditSquare } from "react-icons/md";
import { BiSolidDonateBlood, BiDollar } from "react-icons/bi";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

const MyDonationsCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [pausedCampaigns, setPausedCampaigns] = useState({});
    const [donators, setDonators] = useState([]);
    const [selectedDonators, setSelectedDonators] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/donationsEmail/${user?.email}`);
            return res.data;
        },
    });

    useEffect(() => {
        axiosSecure.get('/payments')
            .then(res => {
                setDonators(res.data);
            });
    }, [axiosSecure]);

    const togglePauseDonationCampaign = async (id, isPaused) => {
        await axiosSecure.patch(`/donations/pause/${id}`, { isPaused });
        setPausedCampaigns((prev) => ({
            ...prev,
            [id]: isPaused,
        }));
    };

    const handleDonator = (id) => {
        const filteredDonators = donators.filter(donate => donate.petId === id);
        setSelectedDonators(filteredDonators);
        document.getElementById('my_modal_1').showModal();
    };

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
            <Title heading={"Manage Campaigns"} />
            {data && data.length > 0 ? (
                <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                    <table className="table">
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
                            {data.map((pet, index) => {
                                const totalDonations = donators
                                    .filter(donate => donate.petId === pet._id)
                                    .reduce((sum, donate) => sum + parseInt(donate.amount), 0);
                                const percentage = (totalDonations / pet.maximumDonationAmount) * 100;

                                return <tr key={pet._id}>
                                    <td className="text-xl">{index + 1}</td>
                                    <td className="text-xl">{pet.petName}</td>
                                    <td className="flex items-center gap-1 text-xl">
                                        {pet.maximumDonationAmount}
                                        <span className="font-bold">
                                            <BiDollar />
                                        </span>
                                    </td>
                                    <td>
                                        <Progress percentage={percentage.toFixed()} />
                                    </td>
                                    <td className="flex gap-5 items-center text-xl">
                                        <Link to={`/dashboard/editDonationCampaign/${pet._id}`}>
                                            <button title="edit" className="bg-[#ff9505] p-2 rounded-full text-white">
                                                <MdEditSquare />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                togglePauseDonationCampaign(pet._id, !pausedCampaigns[pet._id])}
                                            className={`bg-[#ff9505] p-2 rounded-full text-white ${pausedCampaigns[pet._id] ? "opacity-50" : ""}`}
                                        >
                                            {pausedCampaigns[pet._id] ? <span><IoPlay /></span> : <span><FaRegCirclePause /></span>}
                                        </button>

                                        <button
                                            onClick={() => handleDonator(pet._id)}
                                            title="view donators"
                                            className="bg-[#ff9505] p-2 rounded-full text-white"
                                        >
                                            <BiSolidDonateBlood />
                                        </button>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box relative">
                                                {selectedDonators.length > 0 ? (
                                                    <div className="overflow-x-auto">
                                                        <table className="table">
                                                            {/* head */}
                                                            <thead>
                                                                <tr>
                                                                    <th>SL</th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                    <th>Donate Amount</th>
                                                                </tr>
                                                            </thead>
                                                            {selectedDonators.map((donator, index) => (
                                                                <tbody key={donator._id}>
                                                                    <tr>
                                                                        <th>{index + 1}</th>
                                                                        <td>{donator.name}</td>
                                                                        <td>{donator.email}</td>
                                                                        <td>{donator.amount} $</td>
                                                                    </tr>
                                                                </tbody>
                                                            ))}
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <p className="text-center">No donations for this pet.</p>
                                                )}
                                                <div className="modal-action">
                                                    <button
                                                        className="text-xl w-10 h-10 text-white bg-red-500 absolute top-0 right-1 rounded-full p-2"
                                                        onClick={() => document.getElementById('my_modal_1').close()}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            })}
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
// import { FaRegCirclePause } from "react-icons/fa6";
// import { IoPlay } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import Title from "../../../Title/Title";
// import useAuth from "../../../../Hooks/useAuth";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { MdEditSquare } from "react-icons/md";
// import { BiSolidDonateBlood, BiDollar } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import 'react-circular-progressbar/dist/styles.css';
// import Progress from "./Progress";


// const MyDonationsCampaigns = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
//     const [pausedCampaigns, setPausedCampaigns] = useState({});
//     const [donators, setDonators] = useState([]);
//     const [selectedDonators, setSelectedDonators] = useState([]);

//     const { data, isLoading } = useQuery({
//         queryKey: ['donations'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/donations/donationsEmail/${user?.email}`);
//             return res.data;
//         },
//     });

//     useEffect(() => {
//         axiosSecure.get('/payments')
//             .then(res => {
//                 setDonators(res.data);
//             });
//     }, [axiosSecure]);

//     const togglePauseDonationCampaign = async (id, isPaused) => {
//         await axiosSecure.patch(`/donations/pause/${id}`, { isPaused });
//         setPausedCampaigns((prev) => ({
//             ...prev,
//             [id]: isPaused,
//         }));
//     };

//     const handleDonator = (id) => {
//         const filteredDonators = donators.filter(donate => donate.petId === id);
//         setSelectedDonators(filteredDonators);
//         document.getElementById('my_modal_1').showModal();
//     };

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen">
//                 <Title heading={"Manage Donation Campaigns"} />
//                 <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
//                     <div className="w-full px-4">
//                         <Skeleton height={40} count={1} />
//                         <Skeleton height={20} count={10} className="mt-4" />
//                     </div>
//                 </SkeletonTheme>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Title heading={"Manage Donation Campaigns"} />
//             {data && data.length > 0 ? (
//                 <div className="overflow-x-auto border p-5 my-5 shadow-lg">
//                     <table className="table">
//                         <thead className="bg-[#96875d] text-white">
//                             <tr>
//                                 <th>SL</th>
//                                 <th>Pet Name</th>
//                                 <th>Maximum donation amount</th>
//                                 <th>Progress</th>
//                                 <th>Actions your campaign</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((pet, index) => {
//                                 const totalDonations = donators
//                                     .filter(donate => donate.petId === pet._id)
//                                     .reduce((sum, donate) => sum + donate.amount, 0);
//                                 const percentage = (totalDonations / pet.maximumDonationAmount) * 100;

//                                 return (
//                                     <tr key={pet._id}>
//                                         <td className="text-xl">{index + 1}</td>
//                                         <td className="text-xl">{pet.petName}</td>
//                                         <td className="flex items-center gap-1 text-xl">
//                                             {pet.maximumDonationAmount}
//                                             <span className="font-bold">
//                                                 <BiDollar />
//                                             </span>
//                                         </td>
//                                         <td>
//                                             <Progress percentage={Math.ceil(percentage)} />
//                                         </td>
//                                         <td className="flex gap-5 items-center text-xl">
//                                             <Link to={`/dashboard/editDonationCampaign/${pet._id}`}>
//                                                 <button title="edit" className="bg-[#ff9505] p-2 rounded-full text-white">
//                                                     <MdEditSquare />
//                                                 </button>
//                                             </Link>
//                                             <button
//                                                 onClick={() =>
//                                                     togglePauseDonationCampaign(pet._id, !pausedCampaigns[pet._id])}
//                                                 className={`bg-[#ff9505] p-2 rounded-full text-white ${pausedCampaigns[pet._id] ? "opacity-50" : ""}`}
//                                             >
//                                                 {pausedCampaigns[pet._id] ? <span><IoPlay /></span> : <span><FaRegCirclePause /></span>}
//                                             </button>

//                                             <button
//                                                 onClick={() => handleDonator(pet._id)}
//                                                 title="view donators"
//                                                 className="bg-[#ff9505] p-2 rounded-full text-white"
//                                             >
//                                                 <BiSolidDonateBlood />
//                                             </button>

//                                             <dialog id="my_modal_1" className="modal">
//                                                 <div className="modal-box relative">
//                                                     {selectedDonators.length > 0 ? (
//                                                         selectedDonators.map((donator, idx) => (
//                                                             <h1 key={idx}>{donator.email}</h1>
//                                                         ))
//                                                     ) : (
//                                                         <p>No donations for this pet.</p>
//                                                     )}
//                                                     <div className="modal-action">
//                                                         <button
//                                                             className="text-xl w-10 h-10 text-white bg-red-500 absolute top-0 right-1 rounded-full p-2"
//                                                             onClick={() => document.getElementById('my_modal_1').close()}
//                                                         >
//                                                             X
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </dialog>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <h1 className="text-center text-xl my-20">You have not added a pet.</h1>
//             )}
//         </div>
//     );
// };

// export default MyDonationsCampaigns;

