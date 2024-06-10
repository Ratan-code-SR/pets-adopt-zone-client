import { Link, useLoaderData } from "react-router-dom";
import Title from '../../Title/Title';
import Payment from "./Payment/Payment";
import { useState } from "react";
import useDonations from "../../../Hooks/useDonations";

const DonationsDetails = () => {
    const donateDetailsData = useLoaderData();
    const [donations] = useDonations()
    const [donateAmount, setDonateAmount] = useState('')
    const { petImage, petName, _id, maximumDonationAmount, shortDescription, longDescription, } = donateDetailsData;
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
        <div className="my-10">
            <Title heading={'View Donations Details'}></Title>
            <div className="lg:grid grid-cols-2 border-2 gap-5 p-2 justify-center mx-auto flex flex-col">
                <div className=" lg:1/2 w-full">
                    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
                </div>
                <div>
                    <p className="font-bold">Pet Name: <span className="font-normal">{petName}</span></p>
                    <p className="font-bold">Maximum Donation Amount: <span className="font-normal">{maximumDonationAmount}</span> $</p>
                    <p className="font-bold">Short Description: <span className="font-normal">{shortDescription}</span></p>
                    <p className="font-bold">Long Description: <span className="font-normal"> {longDescription}</span></p>
                    <div>
                        <button
                            className="bg-[#ff9505] text-white p-3 mt-2 rounded-md w-full"
                            onClick={() => document.getElementById('my_modal_1').showModal()}
                        >
                            Donate Now
                        </button>
                        <h3 className="my-5 text-xl">Recommend Donations :</h3>
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table ">
                                    {/* head */}
                                    <thead className="bg-[#96875d] text-white">
                                        <tr>
                                            <th>Pet Name</th>
                                            <th>Pet Image</th>
                                            <th>Mx Amount</th>
                                            <th>View Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {recommendDonations.reverse().slice(0, 3).map(donation => (
                                            <tr key={donation._id} >
                                                <td>
                                                    {donation.petName}
                                                </td>
                                                <td>
                                                    <img className="w-10 h-10 rounded-md" src={donation.petImage} alt="" />
                                                </td>
                                                <td>{donation.maximumDonationAmount}</td>
                                                <td className="underline text-green-400">
                                                    <Link to={`/donationsDetails/${donation._id}`}>
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
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
        </div>
    );
};

export default DonationsDetails;
