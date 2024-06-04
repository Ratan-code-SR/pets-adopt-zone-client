import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png'
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import defaultProfile from '../../assets/defaultProfile/defaultProfile.jpg'
const Navbar = () => {
    const { user, logOut } = useAuth()
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
                toast.success("user logout successfully")
            })
    }
    const navLinks = <>
        <NavLink to='/'><li className='ml-5 text-[15px] font-bold'>Home</li></NavLink>
        <li className='ml-5 text-[15px] font-bold'>Pet Listing</li>
        <li className='ml-5 text-[15px] font-bold'>Donation Campaigns</li>
    </>
    return (

        <nav>
            <section className="bg-[#1e4272] min-h-[40px] px-4 py-2 sm:px-10 flex items-center max-sm:flex-col">
                <button type="button" className="text-white text-sm">
                    <span className="mr-3 inline-block"><FaPhone /></span>
                    +180-548-2588
                </button>
                <span className="border-l h-3 mx-6 max-sm:hidden"></span>
                <button type="button" className="text-white text-sm max-sm:my-2">
                    <span className="mr-3 inline-block"><MdEmail /></span>
                    info@petadoptzone.com
                </button>
                <div className="sm:ml-auto text-white">
                    <Link to='/login' className="text-white text-sm mr-1">Login</Link>
                    /
                    <Link to='/register' className="text-white text-sm ml-1">Register</Link>
                </div>
            </section>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <img className='w-10 h-10' src={logo} alt="" />
                        <p className='text-xl font-bold'>PetAdoptZone</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || defaultProfile} />
                            </div>
                        </div>
                        {user && <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><Link to='dashboard'>Dashboard</Link></li>
                            <li><a onClick={handleLogOut}>Logout</a></li>
                        </ul>}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </nav>


    );
};

export default Navbar;