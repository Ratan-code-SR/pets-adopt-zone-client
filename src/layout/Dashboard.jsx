import { NavLink, Outlet } from "react-router-dom";
import { IoMdHome, IoIosAddCircle } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { BiDonateHeart, BiDonateBlood } from "react-icons/bi";
import { PiUsersThreeBold, PiUsersFourFill } from "react-icons/pi";
import { MdOutlineCreateNewFolder, MdOutlinePets } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import useAdmin from "../Hooks/useAdmin";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure this is imported for additional styles
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo/logo.png"
import useAuth from "../Hooks/useAuth";
const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const  {user} = useAuth()
    if (isAdminLoading) {
        return <div>
            <div className="p-4">
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                </SkeletonTheme>
            </div>
        </div>
    }
    return (
        <div>
            <div className="navbar ">
                <div className="flex-1">
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex  items-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="text-black font-bold text-4xl mr-2 drawer-button">
                                <GiHamburgerMenu />
                            </label>
                            <img className='w-10 h-10' src={logo} alt="" />
                            <p className='text-xl font-bold'>PetAdoptZone</p>

                        </div>
                        <div className="drawer-side z-10 ">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full text-base-content bg-base-200 z-10">
                             
                                <ul className="menu p-4 text-[#1e4272] z-10 ">
                                    {
                                        isAdmin ?
                                            <>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/adminHome'><span className="text-2xl"><IoMdHome /></span>Admin Home</NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/users'><span className="text-2xl"><PiUsersThreeBold /></span>All Users</NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/allPets'><span className="text-2xl"><MdOutlinePets /></span>All Pets</NavLink>
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
                                                    <NavLink to='/dashboard/addPet'><span className="text-2xl"><IoIosAddCircle /></span>Add Pet</NavLink>
                                                </li>

                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/myAddPets'><span className="text-2xl"><VscGitPullRequestGoToChanges /></span>My added pets </NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/cart'><span className="text-2xl"><FaShoppingCart /></span>Adoption Request</NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/crateDonationCampaign'><span className="text-2xl"><MdOutlineCreateNewFolder /></span>Create Donation Campaign</NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/dkfdj'><span className="text-2xl"><PiUsersFourFill /></span>My Donation Campaigns </NavLink>
                                                </li>
                                                <li className="text-md font-bold uppercase">
                                                    <NavLink to='/dashboard/myDonated'><span className="text-2xl"><BiDonateBlood /></span>My Donations </NavLink>
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

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div className="z-10 w-full" >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;