import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../Hooks/useAuth'
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { signUpUser, userProfileUpdated, setUser, user } = useAuth()
    const imageBB_hosting_key = import.meta.env.VITE_imgBB_add_api_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_hosting_key}`;

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        const image = data.file[0]
        imageFile.append("image", image);

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        if (res.data.success) {
            console.log(data);
            const name = data.name;
            const email = data.email;
            const password = data.password;
            const photo = res.data.data.display_url
            // const userInfo = { name, email, password, photo }
            // console.log(userInfo);
            signUpUser(email, password)
                .then(result => {
                    console.log(result);
                    userProfileUpdated(name, photo)
                        .then(() => {
                            const userInfo = { name,email}
                            axiosPublic.post("/users", userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        setUser({ ...user, photoURL: photo, displayName: name })
                                        toast.success("user account create successfully!!")
                                    }
                                })

                            navigate(location?.state ? location.state : "/")
                        })


                })
                .catch(error => {
                    toast.error(error.message)
                })
            reset()
        }
    }
    return (
        <div className="font-[sans-serif] bg-white text-[#333] ">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-md:order-1 p-4 bg-gray-50 h-full">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className=" w-full h-full object-contain block mx-auto"
                        alt="login-image"
                    />
                </div>
                <div className="flex items-center p-6 h-full w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">
                        <div className="mb-12">
                            <h3 className="text-[#ff9505] md:text-3xl text-2xl font-extrabold max-md:text-center">
                                Create an account
                            </h3>
                        </div>
                        <div>
                            <label className="text-xs block mb-2">Full Name</label>
                            <div className="relative flex items-center">
                                <input
                                    {...register("name", { required: true })}
                                    name="name"
                                    type="text"
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter name"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="10" cy="7" r="6" />
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                            {errors.name && <small className="text-red-400">This field is required</small>}
                        </div>
                        <div className="mt-5">
                            <label className="text-xs block mb-2">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    {...register("email", { required: true })}
                                    name="email"
                                    type="text"
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter email"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2"
                                    viewBox="0 0 682.667 682.667"
                                >

                                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path
                                            fill="none"
                                            strokeMiterlimit="10"
                                            strokeWidth="40"
                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        />
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                                    </g>
                                </svg>
                            </div>
                            {errors.email && <small className="text-red-400">This field is required</small>}
                        </div>
                        <div className="mt-5">
                            <label className="text-xs block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    {...register("password", { required: true })}
                                    name="password"
                                    type={`${showPassword ? "text" : "password"}`}
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter password"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2'>{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                            </div>
                            {errors.password && <small className="text-red-400">This field is required</small>}
                        </div>
                        <div className="mt-3">
                            <input
                                {...register("file", { required: true })}
                                type="file" className="" />
                        </div>
                        {errors.file && <small className="text-red-400">This field is required</small>}
                        <div className="mt-5">
                            <button
                                type="submit"
                                className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-[#ff9505] text-white"
                            >
                                Create an account
                            </button>
                        </div>
                        <p className="text-sm mt-8">
                            Already have an account?
                            <Link to='/login' className="text-blue-500 font-semibold hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;