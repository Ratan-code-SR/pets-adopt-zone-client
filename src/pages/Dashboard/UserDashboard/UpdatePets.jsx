import { useEffect, useState } from "react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Title from "../../Title/Title";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const UpdatePets = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const axiosSecure = useAxiosSecure();
    const petsData = useLoaderData();
    const { _id, category } = petsData;
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/${_id}`)
            return res.data;
        }
    })
    const options = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
        { value: 'rabbit', label: 'Rabbit' },
    ];
    useEffect(() => {
        const defaultOption = options.find(option => option.value === category);
        setSelectedOption(defaultOption);
    }, [category]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const imageBB_hosting_key = import.meta.env.VITE_imgBB_add_api_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_hosting_key}`;

    const onSubmit = async (data) => {
        let petImageUrl = data.petImage;
        if (data.file && data.file[0]) {
            const imageFile = new FormData();
            const image = data.file[0];
            imageFile.append("image", image);
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            if (res.data.success) {
                petImageUrl = res.data.data.display_url;
            }
        }
        const petInfo = {
            petImage: petImageUrl,
            name: data.name,
            location: data.location,
            age: data.age,
            description: data.description,
            longDescription: data.longDescription,
            category: selectedOption.value,
            adopted: 'false'
        };

        const petsData = await axiosSecure.patch(`/pets/${_id}`, petInfo);
        if (petsData.data.modifiedCount) {
            Swal.fire({
                icon: "success",
                title: `Your data has been updated`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
    };
    if (isLoading) {
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <Title heading="Update information" />
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <div className="w-full px-4">
                    <Skeleton height={40} count={1} />
                    <Skeleton height={20} count={10} className="mt-4" />
                </div>
            </SkeletonTheme>
        </div>
    }
    return (
        <div>
            <Title heading={"Update information"} />
            <div className="flex flex-col justify-center items-center font-[sans-serif] text-[#333] lg:h-screen p-6 ">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[70%] w-full mx-auto bg-white p-4 rounded-md border-2 py-4">
                    <div className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
                    <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
                        <div>
                            <label className="text-sm mb-2 block">Pet Name</label>
                            <input
                                defaultValue={data.name}
                                {...register("name", { required: true })}
                                name="name"
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter Pet name"
                            />
                            {errors.name && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Pet Age</label>
                            <input
                                defaultValue={data.age}
                                {...register("age", { required: true })}
                                name="age"
                                type="number"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter pet age"
                            />
                            {errors.age && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Category</label>
                            <div className="App">
                                <Select
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Pet Location</label>
                            <input
                                defaultValue={data.location}
                                {...register("location", { required: true })}
                                name="location"
                                type="text"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter pet location"
                            />
                            {errors.location && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Short Description</label>
                            <textarea
                                defaultValue={data.description}
                                {...register("description", { required: true })}
                                name="description"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter short description"
                            />
                            {errors.description && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div>
                            <label className="text-sm mb-2 block">Long Description</label>
                            <textarea
                                defaultValue={data.longDescription}
                                {...register("longDescription", { required: true })}
                                name="longDescription"
                                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter long description"
                            />
                            {errors.longDescription && <small className="text-red-500">This field is required</small>}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm mb-2 block">Upload Image</label>
                        <img src={data.petImage} alt="Pet Preview" className="mb-4 max-h-48" />
                        <input
                            className="mt-2"
                            {...register("file")}
                            type="file"
                            name="file"
                        />
                        {errors.file && <small className="text-red-500">This field is required</small>}
                    </div>
                    <div className="!mt-10">
                        <button type="submit" className="bg-orange-400 text-white w-full font-bold px-5 rounded-md p-2">Update Information</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePets;

