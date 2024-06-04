import { NavLink, Outlet } from "react-router-dom";
import { IoMdHome,IoIosAddCircle } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { BiDonateHeart,BiDonateBlood} from "react-icons/bi";
import { PiUsersThreeBold,PiUsersFourFill } from "react-icons/pi";
import { MdDashboard,MdOutlineCreateNewFolder,MdOutlinePets} from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import useAdmin from "../Hooks/useAdmin";
const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin()
    if (isAdminLoading) {
        return <p>loading --------------</p>
    }
    // const isAdmin = false;
    return (
        <div className="p-2">
            {/* side bar */}
            <div className="drawer z-40">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="drawer-button text-4xl"><span className="text-[#ff9505]"><MdDashboard /></span></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="min-h-full bg-base-200 text-base-content">
                        <div className="w-64 min-h-screen bg-[#ff9505]">
                            <ul className="menu p-4 text-[#1e4272]">
                                {
                                    isAdmin ?
                                     <>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/userHome'><span className="text-2xl"><IoMdHome /></span>Admin Home</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/users'><span className="text-2xl"><PiUsersThreeBold /></span>All Users</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/pets'><span className="text-2xl"><MdOutlinePets /></span>All Pets</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/pets'><span className="text-2xl"><BiDonateHeart /></span>All Donates</NavLink>
                                        </li>
                                    </> : 
                                    <>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/userHome'><span className="text-2xl"><IoMdHome /></span>User Home</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/reservation'><span className="text-2xl"><IoIosAddCircle /></span>Add Pet</NavLink>
                                        </li>

                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/payment-history '><span className="text-2xl"><VscGitPullRequestGoToChanges/></span>My added pets </NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/cart'><span className="text-2xl"><FaShoppingCart /></span>Adoption Request</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/add_review '><span className="text-2xl"><MdOutlineCreateNewFolder /></span>Create Donation Campaign</NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/my_booking  '><span className="text-2xl"><PiUsersFourFill /></span>My Donation Campaigns </NavLink>
                                        </li>
                                        <li className="text-md font-bold uppercase">
                                            <NavLink to='/dashboard/my_booking  '><span className="text-2xl"><BiDonateBlood /></span>My Donations </NavLink>
                                        </li>
                                    </>
                                }
                                <div className="divider"></div>

                                <li className="text-md font-bold uppercase">
                                    <NavLink to='/'><span className="text-2xl"><IoMdHome /></span>Home </NavLink>
                                </li>
                                <li className="text-md font-bold uppercase">
                                    <NavLink to='/menu'><span className="text-2xl"><IoMenuSharp /></span>Menu </NavLink>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="z-10" >
                <Outlet />
            </div>
        </div>
       
    );
};

export default Dashboard;