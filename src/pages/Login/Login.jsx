import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <div className="bg-white font-[sans-serif] text-[#333] min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full border p-8 rounded-md bg-gray-200">
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" className="inline-block" viewBox="0 0 53 53">
                            <path fill="#e7eced" d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z" />
                            <path fill="#556080" d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z" />
                        </svg>
                    </div>
                    <form className="mt-10 space-y-4">
                        <div className="relative flex items-center">
                            <input name="email" type="email" required className="w-full text-sm bg-white border-2 border-transparent focus:border-[#1E2772] px-4 py-3 rounded-md outline-none" placeholder="Enter email" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                                <circle cx="10" cy="7" r="6"></circle>
                                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                            </svg>
                        </div>
                        <div className="relative flex items-center">
                            <input name="password" type={`${showPassword ? "text" : "password"}`} required className="w-full text-sm bg-white border-2 border-transparent focus:border-[#1E2772] px-4 py-3 rounded-md outline-none" placeholder="Enter password" />
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute right-2'>{showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                        </div>
                        <div>
                            <div>
                                <a className="text-sm text-[#1E2772] hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="w-full py-2.5 px-4 text-base font-semibold rounded-md text-white bg-[#ff9505]">
                                Log in
                            </button>
                        </div>
                    </form>
                    <p className="my-2 text-sm text-gray-400 text-center">or continue with</p>
                    <div className="space-x-8 flex justify-center">
                        <button type="button"
                            className="border-none outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                                <path fill="#fbbd00"
                                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                    data-original="#fbbd00" />
                                <path fill="#0f9d58"
                                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                    data-original="#0f9d58" />
                                <path fill="#31aa52"
                                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                    data-original="#31aa52" />
                                <path fill="#3c79e6"
                                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                    data-original="#3c79e6" />
                                <path fill="#cf2d48"
                                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                    data-original="#cf2d48" />
                                <path fill="#eb4132"
                                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                    data-original="#eb4132" />
                            </svg>
                        </button>
                        <button type="button"
                            className="border-none outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
                                <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm mt-3 text-center">Do not have an account <a href="" className="text-[#1E2772] hover:underline ml-1 whitespace-nowrap">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;