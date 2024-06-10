import { Link } from "react-router-dom";

const PromotionBanner = () => {
    return (
            <div className="p-2">
                <div className="grid my-5 rounded-md md:grid-cols-3 gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-r from-[#1e4272] to-[#f3ebdfea] font-sans overflow-hidden">
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold text-white">Welcome to PetAdoptZone!</h1>
                        <p className="text-xl text-gray-200 mt-2">Best Pets Adopted Platform</p>
                        <Link to={'/petsListing'}>
                            <button className="p-2 lg:mt-10 lg:my-5 mt-2 text-white rounded-md bg-[#ff9505]">Get Started</button>
                        </Link>
                    </div>

                    <div className="relative max-md:hidden pb-5 ">
                        <img src="https://i.ibb.co/DR9Q4MS/istockphoto-1497909628-170667a.webp" alt="Banner Image"
                            className="w-full right-4 top-[-13px] md:absolute skew-x-[-16deg] rotate-2 object-cover" />
                    </div>
                </div>
            </div>
    );
};

export default PromotionBanner;