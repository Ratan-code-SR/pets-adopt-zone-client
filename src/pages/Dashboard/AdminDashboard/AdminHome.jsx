import { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useAuth from '../../../Hooks/useAuth';
import AdminChart from '../Chart/AminChart';
const AdminHome = () => {
    const [users, setUser] = useState([])
    const [pets, setPets] = useState([])
    const [donation, setDonation] = useState([])
    const axiosSecure = useAxiosSecure()
    const { loading, user } = useAuth()
    useEffect(() => {
        const usersData = async () => {
            const userRes = await axiosSecure.get('/users')
            const petsRes = await axiosSecure.get('/pets')
            const donationRes = await axiosSecure.get('/donations')
            setUser(userRes.data)
            setPets(petsRes.data)
            setDonation(donationRes.data)
        }
        usersData()
    }, [axiosSecure])
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
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
        <div className='my-5 px-2 w-full'>
            <h1 className="lg:text-4xl text-2xl my-5 ml-3 ">Hi! WelCome <span className="text-[#ff9505]">{user?.displayName}</span></h1>
            <div className='grid w-full lg:grid-cols-3 grid-cols-1 gap-5 items-center justify-center '>
                <Link to={'/dashboard/users'}>
                    <div className='bg-[#fcdbee] w-full justify-center flex  items-center gap-10  text-white p-4  border-b-4 rounded-md border-[#dd2374] '>
                        <p className='text-3xl bg-[#dd2374] p-2 rounded-full'><FaUsers /></p>
                        <div className='text-2xl'>
                            <p className='text-[#3e3a41]'>All Users</p>
                            <div className='flex items-center gap-5'>
                                <p className='text-black font-bold'>{users.length}</p>
                                <span className='text-[#dd2374]'>   < FaArrowRightArrowLeft /></span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to={'/dashboard/allPets'}>
                    <div className='bg-[#d1e5fe] w-full flex justify-center items-center gap-10  text-white p-4  border-b-4 rounded-md border-[#5046e5] '>
                        <p className='text-3xl bg-[#5046e5] p-2 rounded-full'><MdOutlinePets /></p>
                        <div className='text-2xl'>
                            <p className='text-[#3e3a41]'>All Pets</p>
                            <div className='flex items-center gap-5'>
                                <p className='text-black font-bold'>{pets.length}</p>
                                <span className='text-[#5046e5]'>   < FaArrowRightArrowLeft /></span>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to={'/dashboard/allDonations'}>
                    <div className='bg-[#bef7dc] w-full flex justify-center items-center gap-10  text-white p-4  border-b-4 rounded-md border-[#06996d] '>
                        <p className='text-3xl bg-[#06996d] p-2 rounded-full'><GiWallet /></p>
                        <div className='text-2xl'>
                            <p className='text-[#3e3a41]'> Donations</p>
                            <div className='flex items-center gap-5'>
                                <p className='text-black font-bold'>{donation.length}</p>
                                <span className='text-[#06996d]'>   < FaArrowRightArrowLeft /></span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex items-center justify-center'>
                <AdminChart users={users.length} pets={pets.length} donation={donation.length} />
            </div>
        </div>
    );
};

export default AdminHome;