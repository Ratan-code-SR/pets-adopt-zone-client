
import { useLoaderData } from "react-router-dom";
import Title from '../../Title/Title';
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
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
        const requestPetId = _id;
        const petRequestInfo = { petImage, userEmail, ownerEmail, name, phone, location, age, description, longDescription,address, category, requestPetId };
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
        <div className="my-10">
            <Title heading={'View Pet Details'}></Title>
            <div className="lg:grid grid-cols-2 border-2 gap-5 p-2 w-10/12 lg:w-9/12 justify-center mx-auto flex flex-col">
                <div>
                    <img className="h-[350px] w-full" src={petImage} alt="Pet" />
                </div>
                <div>
                    <p>Pet Name: {name}</p>
                    <p>Pet Age: {age}</p>
                    <p>Pet Category: {category}</p>
                    <p>Adopted: {adopted}</p>
                    <p>Pet Location: {location}</p>
                    <p>Pet Description: {description}</p>
                    <p>Long Description: {longDescription}</p>
                    <div>
                        <button
                            className="bg-[#ff9505] text-white p-3 rounded-md w-full"
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
