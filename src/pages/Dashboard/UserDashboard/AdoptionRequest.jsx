
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { GoCheck } from "react-icons/go";
import { IoMdRemoveCircle } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
const AdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const [isAccepted, setIsAccepted] = useState('')
    const [isReject, setIsReject] = useState('')
    const { user } = useAuth()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['adopt'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adopt/adoptEmail/${user?.email}`)
            return res.data
        }

    })
    const handleIsReject = async (id) => {

    }

    const handleIsAccepted = async (id) => {
        const petsData = data.find(pet => pet.requestPetId === id);
        const petUpdateInfo = {
            petImage: petsData.petImage,
            name: petsData.name,
            location: petsData.location,
            age: petsData.age,
            description: petsData.description,
            longDescription: petsData.longDescription,
            category: petsData.category,
            adopted: 'true'
        }
        const res = await axiosSecure.patch(`/pets/${id}`, petUpdateInfo)
        setIsAccepted(petUpdateInfo.adopted)
        if (res.data.modifiedCount) {
            setIsAccepted(petsData.adopted)
            console.log(petsData.adopted);
        }
        refetch();
    }
    if (isLoading) {
        return <div>
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    }
    return (
        <div>
            <Title subHeading={'Your Request'} heading={'manage all Request'} />
            {
                data && data.length > 0 ?
                    (<div className="overflow-x-auto border p-5 my-5 shadow-lg">
                        <div>
                            <p className="text-3xl font-bold my-3 text-blue-500">Total Request:{data.length} </p>
                        </div>
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#96875d] text-white">
                                <tr>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>Accept</th>
                                    <th>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {data.map((pet, index) =>
                                    <tr key={pet._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img className="w-10 h-10 rounded-md" src={pet?.petImage} alt="" />
                                        </td>
                                        <td>{pet?.name}</td>
                                        <td>{pet?.userEmail}</td>
                                        <td>{pet?.phone}</td>
                                        <td>{pet?.address}</td>
                                        <td className="">
                                            <button
                                                disabled={isReject}
                                                onClick={() => handleIsAccepted(pet.requestPetId)}
                                                className="text-sm ">
                                                {
                                                    isAccepted ? <span
                                                        className="text-green-600 text-2xl"
                                                    ><GoCheck /></span> : <p className="bg-green-600 text-white rounded-full p-1 px-2">accept</p>
                                                }
                                            </button>
                                        </td>
                                        <td >
                                            <button onClick={() => handleIsReject(pet.requestPetId)}
                                                className="text-sm ">
                                                {
                                                    isReject ? <span
                                                        className="text-red-600 text-2xl"
                                                    ><IoMdRemoveCircle /></span> : <p className="bg-red-600 text-white rounded-full p-1 px-2">reject</p>
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>)
                    :
                    (<h1 className="text-center text-xl my-20">There are no requests.</h1>)

            }

        </div>
    );
};

export default AdoptionRequest;