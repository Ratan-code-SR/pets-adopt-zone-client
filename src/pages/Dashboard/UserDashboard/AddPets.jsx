import { useState } from "react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
const AddPets = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {user} = useAuth()
    const options = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
        { value: 'rabbit', label: 'Rabbit' },
    ];
    const axiosSecure = useAxiosSecure()
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

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
            const name = data.name;
            const location = data.location;
            const age = data.age;
            const date = `${day}-${month}-${year}`;
            const time = `${hours}:${minutes}:${seconds}`;
            const adopted = 'false';
            const description = data.description;
            const longDescription = data.longDescription;
            const category = selectedOption.value;
            const email = user.email;
            const petInfo = { petImage, date, time, email, adopted, name, location, age, description, longDescription, category }
            const petsData = await axiosSecure.post("/pets", petInfo)
            if (petsData.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `Your ${data.name} has been saved`,
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
                    <h4 className="sm:text-3xl text-2xl font-bold text-white">Add your Pet</h4>
                </div>
                <div className="mx-4 mb-4 -mt-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl border-2 border-t-0 mx-auto bg-white shadow-0_2px_18px_-3px_rgba(6,81,237,0.4) sm:p-8 p-4 rounded-md">
                        <div
                            className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        </div>
                        <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
                            <div>
                                <label className="text-sm mb-2 block">Pet Name</label>
                                <input
                                    {...register("name", { required: true })}
                                    name="name"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter Pet name" />
                                {errors.name && <small className="text-red-500">This field is required</small>}
                            </div>

                            <div>
                                <label className="text-sm mb-2 block">Pet Age</label>
                                <input
                                    {...register("age", { required: true })}
                                    name="age"
                                    type="number"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter pet age" />
                                {errors.age && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block">Category</label>
                                <div className="App">
                                    <Select
                                        // name="category"
                                        // {...register("selectedOption", { required: true })}
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />
                                    {/* {errors.selectedOption && <small className="text-red-500">This field is required</small>} */}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm mb-2 block">Pet Location</label>
                                <input
                                    {...register("location", { required: true })}
                                    name="location"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter pet location" />
                                {errors.location && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block">Short Description</label>
                                <textarea
                                    {...register("description", { required: true, maxLength: 20 })}
                                    name="description"
                                    type="text"
                                    className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                    placeholder="Enter short description" />
                                {errors.description && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div>
                                <label className="text-sm mb-2 block">Long Description</label>
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
                            <button type="submit" className="bg-orange-400 text-white font-bold px-5 rounded-md p-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddPets;

