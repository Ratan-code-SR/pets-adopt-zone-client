import { useLoaderData } from "react-router-dom";
import Title from '../../Title/Title';
import Payment from "./Payment/Payment";
import { useState } from "react";

const DonationsDetails = () => {
    const donateDetailsData = useLoaderData();
    console.log(donateDetailsData);
    const [donateAmount, setDonateAmount] = useState('')
    const { petImage, petName, _id, maximumDonationAmount, shortDescription, longDescription, } = donateDetailsData;
    const handleAmount = (e) => {
        e.preventDefault()
        const form = e.target;
        const donate = form.amount.value;
        setDonateAmount(donate)
        form.reset()
    }
    const paymentInfo = { petImage, petName, donateAmount, _id }
    return (
        <div className="my-10">
            <Title heading={'View Pet Details'}></Title>
            <div className="lg:grid grid-cols-2 border-2 gap-5 p-2 w-10/12 lg:w-9/12 justify-center mx-auto flex flex-col">
                <div>
                    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
                </div>
                <div>
                    <p>Pet Name: {petName}</p>
                    <p>Maximum Donation Amount: {maximumDonationAmount}</p>
                    <p>Short Description: {shortDescription}</p>
                    <p>Long Description: {longDescription}</p>
                    <div>
                        <button
                            className="bg-[#ff9505] text-white p-3 rounded-md w-full"
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
        </div>
    );
};

export default DonationsDetails;
