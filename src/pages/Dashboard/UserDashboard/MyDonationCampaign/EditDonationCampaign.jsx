
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BallTriangle } from "react-loader-spinner";
const EditDonationCampaign = () => {
    // const [updateDonationData, setUpdateDonationData] = useState([])
    const axiosSecure = useAxiosSecure()
    const updatedData = useLoaderData()
    const { _id } = updatedData;
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${_id}`)
            return res.data;
        }
    })
    const {
        register,
        handleSubmit,
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
            const maximumAmount = data.maximumAmount
            const petName = data.petName
            const donationCampaignInfo = { petImage, shortDescription, longDescription, maximumAmount, petName }
            const petsData = await axiosSecure.patch(`/donations/${_id}`, donationCampaignInfo)
            if (petsData.data.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: `Your data has been updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            }
        }
    }
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
    }
    return (
        <div>
            <div className="font-sans text-#333">
                <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
                    <h4 className="sm:text-3xl text-2xl font-bold text-white">Update Donation Campaign</h4>
                </div>
                <div className="mx-4 mb-4 -mt-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white shadow-0_2px_18px_-3px_rgba(6,81,237,0.4) sm:p-8 p-4 rounded-md border-2 border-t-0 border-[#96875d]">
                        <div
                            className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        </div>
                        <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
                            <div>
                                <label className="text-sm mb-2 block font-bold">Pet Name</label>
                                <input
                                    defaultValue={data.petName}
                                    {...register("petName", { required: true })}
                                    name="petName"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter Pet name" />
                                {errors.petName && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block font-bold">Maximum Donation Amount</label>
                                <input
                                    defaultValue={data.maximumDonationAmount}
                                    {...register("maximumAmount", { required: true })}
                                    name="maximumAmount"
                                    type="number"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Maximum Donation Amount" />
                                {errors.maximumAmount && <small className="text-red-500">This field is required</small>}
                            </div>

                            <div>
                                <label className="text-sm mb-2 block font-bold">Short Description</label>
                                <textarea
                                    defaultValue={data.shortDescription}
                                    {...register("shortDescription", { required: true })}
                                    name="shortDescription"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter short description" />
                                {errors.shortDescription && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block font-bold">Long Description</label>
                                <textarea
                                    defaultValue={data.longDescription}
                                    {...register("longDescription", { required: true })}
                                    name="longDescription"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter long description" />

                                {errors.longDescription && <small className="text-red-500">This field is required</small>}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm mb-2 block font-bold">Pet Image</label>
                            <img src={data.petImage} alt="Pet Preview" className="mb-4 max-h-48" />
                            <input
                                className="mt-2"
                                {...register("file", { required: true })}
                                type="file"
                                name="file"
                            />
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

export default EditDonationCampaign;