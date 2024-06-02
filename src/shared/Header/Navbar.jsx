import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png'
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
const Navbar = () => {
    const navLinks = <>
        <Link to='/'><li className='ml-5 text-[15px] font-bold'>Home</li></Link>
        <li className='ml-5 text-[15px] font-bold'>Pet Listing</li>
        <li className='ml-5 text-[15px] font-bold'>Donation Campaigns</li>
    </>
    return (
        <nav>
            {/* top nav bar */}
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
            {/* bottom nav bar */}
            <div className="navbar ">
                <div className="flex-1 gap-1">
                    <img className='w-10 h-10' src={logo} alt="" />
                    <p className='text-xl font-bold'>PetAdoptZone</p>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navLinks}
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Profile</a></li>
                            <li><a>Dashboard</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;