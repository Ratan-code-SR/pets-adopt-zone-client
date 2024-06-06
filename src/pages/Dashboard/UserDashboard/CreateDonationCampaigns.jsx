
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
const CreateDonationCampaigns = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const imageBB_hosting_key = import.meta.env.VITE_imgBB_add_api_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_hosting_key}`;
    const onSubmit = async (data) => {
        const imageFile = new FormData();
        const image = data.file[0]
        imageFile.append("image", image);
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        if ((res.data.success)) {
            const petImage = res.data.data.display_url
            const shortDescription = data.shortDescription;
            const longDescription = data.longDescription;
            const date = data.date;
            const email = user.email;
            const maximumDonationAmount = data.maximumAmount
            const donationCampaignInfo = { petImage,email, shortDescription, longDescription, maximumDonationAmount, date }
            const petsData = await axiosSecure.post("/donations", donationCampaignInfo)
            if (petsData.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `Your ${data.name} has been added`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
        }

    }
    return (
        <div>
            <div className="font-sans text-#333">
                <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                    <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your Donation Campaign</h4>
                </div>
                <div className="mx-4 mb-4 -mt-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white shadow-0_2px_18px_-3px_rgba(6,81,237,0.4) sm:p-8 p-4 rounded-md border-2 border-t-0 border-[#96875d]">
                        <div
                            className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        </div>
                        <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
                            <div>
                                <label className="text-sm mb-2 block font-bold">Maximum Donation Amount</label>
                                <input
                                    {...register("maximumAmount", { required: true })}
                                    name="maximumAmount"
                                    type="number"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter Pet name" />
                                {errors.maximumAmount && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block font-bold">Last Date</label>
                                <input
                                    {...register("date", { required: true })}
                                    name="date"
                                    type="date"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter pet location" />
                                {errors.date && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block font-bold">Short Description</label>
                                <textarea
                                    {...register("shortDescription", { required: true, maxLength: 20 })}
                                    name="shortDescription"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter short description" />
                                {errors.shortDescription && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block font-bold">Long Description</label>
                                <textarea
                                    {...register("longDescription", { required: true })}
                                    name="longDescription"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter long description" />

                                {errors.longDescription && <small className="text-red-500">This field is required</small>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input className="mt-2"
                                {...register("file", { required: true })}
                                type="file"
                                name="file" />
                            {errors.file && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div className="!mt-10">
                            <button type="submit" className="bg-orange-400 text-white font-bold px-5  w-full rounded-md p-2">Create Campaign</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default CreateDonationCampaigns;