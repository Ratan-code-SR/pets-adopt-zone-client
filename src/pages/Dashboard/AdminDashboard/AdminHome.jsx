import { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
const AdminHome = () => {
    const [users, setUser] = useState([])
    const [pets, setPets] = useState([])
    const [donation, setDonation] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        const usersData = async () => {
            const res = await axiosSecure.get('/users')
            setUser(res.data)
        }
        usersData()
    }, [axiosSecure])
    useEffect(() => {
        const petsData = async () => {
            const res = await axiosSecure.get('/pets')
            setPets(res.data)
        }
        petsData()
    }, [axiosSecure])
    useEffect(() => {
        const donationData = async () => {
            const res = await axiosSecure.get('/donations')
            setDonation(res.data)
        }
        donationData()
    },[axiosSecure])
    return (
        <div className='my-5 px-2'>
            <div className='lg:grid grid-cols-3 flex flex-col gap-5 items-center justify-center '>
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
        </div>
    );
};

export default AdminHome;