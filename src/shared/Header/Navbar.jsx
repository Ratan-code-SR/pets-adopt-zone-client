import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png'
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import defaultProfile from '../../assets/defaultProfile/defaultProfile.jpg'
import { useEffect, useState } from 'react';
import useAdmin from '../../Hooks/useAdmin';
import { IoMdHome } from 'react-icons/io';
import { BiDonateHeart } from 'react-icons/bi';
import { FaListCheck } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
    const handleOnChangeTheme = (e) => {
        const newTheme = e.target.checked ? 'light' : 'dark';
        setTheme(newTheme)
    }
    const [isAdmin] = useAdmin()
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const setLocalTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', setLocalTheme)
    }, [theme])

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
                toast.success("user logout successfully")
            })
    }

    const navLinks = <>
        <li className="text-md font-bold uppercase">
            <NavLink to='/'><span className="text-2xl"><IoMdHome/></span>Home</NavLink>
        </li>
        <li className="text-md font-bold uppercase">
            <NavLink to='/petsListing'><span className="text-2xl"><FaListCheck /></span>Pet Listing</NavLink>
        </li>
        <li className="text-md font-bold uppercase">
            <NavLink to='/donationCampaign'><span className="text-2xl"><BiDonateHeart /></span>Donation Campaigns</NavLink>
        </li>
        <li className="text-md font-bold uppercase">
            <NavLink to='/contact'><span className="text-2xl"><SiMinutemailer /></span>Contact Us</NavLink>
        </li>
    </>
    return (

        <nav className=''>
            <section className="bg-[#1e4272]  min-h-[40px] px-4 py-2 sm:px-10 flex items-center max-sm:flex-col">
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
            <div className="navbar border-b-2 border-orange-400 mb-1">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn text-xl mr-2 btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu rounded-none menu-sm dropdown-content mt-3 z-10  p-2 shadow bg-base-100 w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                        <p className='text-2xl font-bold'><span className='text-[#ff9505] '>Pet</span>Adopt<span className='text-[#a9af57]'>Zone</span></p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal z-10 px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end z-10">
                    <label className="swap swap-rotate">
                        {theme === 'synthwave' ? <input type="checkbox" onChange={handleOnChangeTheme} checked /> :
                            <input type="checkbox" onChange={handleOnChangeTheme} />}

                        <svg className="swap-off fill-current  md:w-8 md:h-8 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        {/* moon icon */}
                        <svg className="swap-on fill-current md:w-8 md:h-8 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                    <div className="dropdown dropdown-end font-bold">

                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || defaultProfile} />
                            </div>
                        </div>
                        {user && <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a >
                                    {user?.displayName}

                                </a>
                            </li>
                            <li>
                                <a >
                                    {user?.email}

                                </a>
                            </li>
                            <li >
                                {isAdmin ?
                                    <Link to={'/dashboard/adminHome'}>
                                        Dashboard
                                    </Link> :
                                    <Link to={'/dashboard/userHome'}> Dashboard</Link>
                                }
                            </li>
                            <li><a onClick={handleLogOut} className='text-blue-500'>Logout</a></li>
                        </ul>}
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </nav>


    );
};

export default Navbar;



