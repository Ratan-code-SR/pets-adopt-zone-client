
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";

import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import UserChart from "../Chart/UserChart";
const UserHome = () => {
    const [pets, setPets] = useState([])
    const [donation, setDonation] = useState([])
    const [donationCampaign, setDonationCampaign] = useState([])
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    useEffect(() => {
        const usersData = async () => {
            const petRes = await axiosSecure.get(`/pets/email/${user?.email}`)
            const paymentRes = await axiosSecure.get(`/payments/paymentsEmail/${user?.email}`)
            const donationRes = await axiosSecure.get(`/donations/donationsEmail/${user?.email}`)

            setPets(petRes.data.pets)
            setDonation(paymentRes.data)
            setDonationCampaign(donationRes.data)
        }
        usersData()
    }, [axiosSecure, user?.email])
    const totalDonationAmount = donation.reduce((total, donation) => total + parseInt(donation.amount), 0)


    if (loading) {
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <div className="w-full px-4">
                    <Skeleton height={40} count={1} />
                    <Skeleton height={20} count={10} className="mt-4" />
                </div>
            </SkeletonTheme>
        </div>
    }
    return (
        <div className="px-2">
            <h1 className="lg:text-4xl text-2xl my-5 ml-3 ">Hi! WelCome <span className="text-[#ff9505]">{user?.displayName}</span></h1>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 items-center ml-3  '>
                <div className='bg-gradient-to-r from-fuchsia-500 to-cyan-500  flex justify-center items-center w-full gap-5 text-white p-4 rounded-md '>
                    <p className='text-5xl'><MdOutlinePets /></p>
                    <div className='text-3xl'>
                        <p>{pets.length}</p>
                        <p>My Add Pets</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r w-full from-pink-500 to-rose-500 flex justify-center items-center gap-5 text-white p-4 rounded-md '>
                    <p className='text-5xl'><GiWallet /></p>
                    <div className='text-3xl'>
                        <p>{totalDonationAmount} $</p>
                        <p>Donations</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-pink-500 to-rose-500 flex justify-center items-center gap-5 text-white p-4 rounded-md w-full '>
                    <p className='text-5xl'><MdOutlineCreateNewFolder /></p>
                    <div className='text-3xl'>
                        <p>{donationCampaign.length}</p>
                        <p>Campaign</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <UserChart pets={pets.length} donation={totalDonationAmount} campaign={donationCampaign.length} />
            </div>
        </div>
    );
};

export default UserHome;