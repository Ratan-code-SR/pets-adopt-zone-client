
import { FaUsers } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useEffect, useState } from "react";
const UserHome = () => {
    const [pets, setPets] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const usersData = async () => {
            const res = await axiosPublic.get('/pets')
            setPets(res.data)
        }
        usersData()
    }, [axiosPublic])
    return (
        <div>
            <h1>Hi WelCome Back</h1>
            <div className='flex gap-5 items-center justify-center'>
                <div className='bg-gradient-to-r from-teal-400 to-yellow-200 flex justify-center items-center gap-5 text-white p-4 rounded-md '>
                    <p className='text-5xl'><FaUsers /></p>
                    <div className='text-3xl'>
                        <p>Users</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-fuchsia-500 to-cyan-500  flex justify-center items-center gap-5 text-white p-4 rounded-md '>
                    <p className='text-5xl'><MdOutlinePets /></p>
                    <div className='text-3xl'>
                        <p>{pets.length}</p>
                        <p>All Pets</p>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-pink-500 to-rose-500 flex justify-center items-center gap-5 text-white p-4 rounded-md '>
                    <p className='text-5xl'><GiWallet /></p>
                    <div className='text-3xl'>
                        <p>{pets.length}</p>
                        <p>Donation</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;