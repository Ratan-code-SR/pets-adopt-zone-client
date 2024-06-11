import { Link, useLoaderData } from "react-router-dom";
import Title from '../../Title/Title';
import Payment from "./Payment/Payment";
import { useState } from "react";
import useDonations from "../../../Hooks/useDonations";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaRegFaceGrinStars } from "react-icons/fa6";
const DonationsDetails = () => {
    const donateDetailsData = useLoaderData();
    const [donations] = useDonations()
    const [donateAmount, setDonateAmount] = useState('')
    const { petImage, petName, _id, maximumDonationAmount, shortDescription, longDescription, isPaused } = donateDetailsData;
    const handleAmount = (e) => {
        e.preventDefault()
        const form = e.target;
        const donate = form.amount.value;
        setDonateAmount(donate)
        form.reset()
    }
    const recommendDonations = donations.filter(donation => donation._id !== _id)
    console.log(recommendDonations);
    const paymentInfo = { petImage, petName, donateAmount, _id }
    return (
        <div className="my-10 px-2">
            <Title heading={'View Donations Details'}></Title>
            <p className="text-center text-xl lg:w-3/4 mb-4 mx-auto -mt-5">
                Click the Donate <span className="text-orange-500">Donate Now</span> to enter your donation amount and credit card information and after submission, all your donation information will be recorded and displayed on the <span className="text-orange-500">Dashboard</span> - My Donation page.
                will appear </p>
            <div className="lg:grid grid-cols-2 border-2 gap-10 p-2 justify-center mx-auto flex flex-col items-center">
                <div className=" lg:1/2 w-full">
                    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
                </div>
                <div>
                    <p className="font-bold flex gap-3 text-2xl"><span><MdOutlinePets /></span> <span className="font-normal">{petName}</span></p>
                    <p className="font-bold text-2xl flex gap-3 items-center my-1"><span className="text-3xl "><BiSolidDonateBlood /></span><span className="font-normal">{maximumDonationAmount}</span> $</p>
                    <p className="font-bold text-2xl flex gap-3 items-center my-1"><span className="text-2xl "><FaRegFaceGrinStars /></span><span className="font-normal">{shortDescription}</span></p>
                    <p className="font-bold my-3 text-xl">{longDescription}</p>
                    <div>
                        <button
                            title={isPaused === true && `Can't donate now`}
                            disabled={isPaused === true}
                            className="bg-[#ff9505] text-white p-3 mt-5 rounded-md w-full"
                            onClick={() => document.getElementById('my_modal_1').showModal()}
                        >
                            Donate Now
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box relative">
                                <form onSubmit={handleAmount} className="my-10">
                                    <input type="number" name="amount" placeholder="Enter amount" className="input input-bordered w-[30%]" />
                                    <input className="btn ml-3 btn-primary" type="submit" />
                                </form>
                                <Payment paymentInfo={paymentInfo} />
                                <div className="modal-action">
                                    <button
                                        className="text-xl w-10 h-10 text-white bg-red-500 absolute top-0 right-1 rounded-full p-2"
                                        onClick={() => document.getElementById('my_modal_1').close()}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-center my-10">
                    <h3 className=" text-2xl text-orange-400">My Recommendations
                    </h3>
                    <p className="text-xl">I would recommend donating to this pet support fund. So that they can enjoy a good life.</p>
                </div>
                <div className="grid lg:grid-cols-3  sm:grid-cols-2 items-center justify-center gap-5 ">
                    {
                        recommendDonations.reverse().slice(0, 3).map(donate => (<div className="card card-compact w-full h-[400px] bg-base-100 shadow-xl" key={donate._id}>
                            <figure>
                                <img className='w-full h-[400px]' src={donate.petImage} alt={donate.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="flex items-center gap-2 text-xl"> <span><MdOutlinePets /></span>{donate.petName}    </h2>
                                <div className='flex gap-2 justify-between items-center'>
                                    <span className="text-2xl"><BiSolidDonateBlood /></span>
                                    <p className="text-xl">{donate.maximumDonationAmount} $</p>
                                </div>
                                <Link to={`/donationsDetails/${donate._id}`} >
                                    <div className="card-actions w-full ">
                                        <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button>
                                    </div>
                                </Link>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </div>
    );
};

export default DonationsDetails;
