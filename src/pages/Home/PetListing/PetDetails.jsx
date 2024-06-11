
import { useLoaderData } from "react-router-dom";
import Title from '../../Title/Title';
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdOutlinePets } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { SiEclipseadoptium } from "react-icons/si";
const PetDetails = () => {
    const axiosSecure = useAxiosSecure()
    const petDetailsData = useLoaderData();
    const { petImage, email, adopted, name, location, age, description, longDescription, category, _id } = petDetailsData;
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const ownerEmail = email;
        const userEmail = user.email;
        const name = user.displayName;
        const address = data.address;
        const phone = data.phone;
        const adopted = 'false';
        const requestPetId = _id;
        const petRequestInfo = { petImage, userEmail, ownerEmail, name, phone, location, age, description, longDescription, adopted, address, category, requestPetId };
        const petsData = await axiosSecure.post("/adopt", petRequestInfo)
        if (petsData.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: `Your request send has been successful`,
                showConfirmButton: false,
                timer: 1500
            });
            reset()
            document.getElementById('my_modal_1').close();
        }
    };

    return (
        <div className="my-10 px-2">
            <Title heading={'View Pet Details'}></Title>
            <p className="text-center text-xl lg:w-3/4 mb-4 mx-auto -mt-5">If you want to adopt this pet, click the <span className="text-orange-400">Adopt Now</span> button and submit the form. Your request will go to the adopter who will then consider whether to adopt you.</p>
            <div className="lg:grid grid-cols-2 border-2 gap-5 p-2  lg:w-9/12 justify-center mx-auto flex flex-col w-full">
                <div>
                    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
                </div>
                <div>
                    <p className="font-bold flex gap-3 text-2xl"><span><MdOutlinePets /></span> <span className="font-normal">{name}</span></p>
                    <p className="font-bold flex gap-3 text-2xl"><span><IoLocation /></span> <span className="font-normal">{location}</span></p>
                    <p className="font-bold flex gap-3 text-2xl"><span><FaCalendarAlt /></span> <span className="font-normal">{age} Year</span></p>
                    <p title="adopted status" className="font-bold flex gap-3 text-2xl"><span><SiEclipseadoptium /></span> <span className="font-normal">{adopted}</span></p>
                    <p className="font-bold text-2xl flex gap-3 items-center my-1"><span className="text-2xl "><FaRegFaceGrinStars /></span><span className="font-normal">{description}</span></p>
                    <p className="font-bold my-3 text-xl">{longDescription}</p>
                    <div>
                        <button
                            className="bg-[#ff9505] text-white p-3 mt-5 rounded-md w-full"
                            onClick={() => document.getElementById('my_modal_1').showModal()}
                        >
                            Adopt Now
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box relative">
                                <div className="font-sans text-#333">
                                    <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                                        <h4 className="sm:text-3xl text-2xl font-bold text-white">Adopt {name}</h4>
                                    </div>
                                    <div className="mx-4 mb-4 -mt-16">
                                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl border-2 border-t-0 mx-auto bg-white shadow-0_2px_18px_-3px_rgba(6,81,237,0.4) sm:p-8 p-4 rounded-md">
                                            <div>
                                                <label className="text-sm mb-2 block">Your Name:</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    defaultValue={user?.displayName}
                                                    disabled
                                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                    placeholder="Enter your name"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm mb-2 block">Your Email:</label>
                                                <input
                                                    defaultValue={user?.email}
                                                    disabled
                                                    type="email"
                                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm mb-2 block">Phone Number:</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                                    name="phone"
                                                    type="tel"
                                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                    placeholder="Enter your phone number"
                                                />
                                                {errors.phone && <small className="text-red-500">This field is required</small>}
                                            </div>

                                            <div>
                                                <label className="text-sm mb-2 block">Address:</label>
                                                <input
                                                    {...register("address", { required: true })}
                                                    name="address"
                                                    type="text"
                                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                    placeholder="Enter your address"
                                                />
                                                {errors.address && <small className="text-red-500">This field is required</small>}
                                            </div>

                                            <div className="!mt-10">
                                                <button type="submit" className="bg-orange-400 text-white font-bold px-5 rounded-md p-2 w-full">Send Adopt Request</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

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

export default PetDetails;
{/* <div className="lg:grid grid-cols-2 border-2 gap-10 p-2 justify-center mx-auto flex flex-col items-center">
<div className=" lg:1/2 w-full">
    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
</div> */}
{/* <div>
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
</div> */}