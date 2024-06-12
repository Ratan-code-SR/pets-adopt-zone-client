
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { GoCheck } from "react-icons/go";
import { IoMdRemoveCircle } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const AdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['adopt'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adopt/request`)
            return res.data
        }

    })
    const handleIsReject = async (id,petId) => {
        const petsData = data.find(pet => pet.requestPetId === id);
        const petUpdateInfo = {
            petImage: petsData.petImage,
            name: petsData.name,
            location: petsData.location,
            age: petsData.age,
            description: petsData.description,
            longDescription: petsData.longDescription,
            category: petsData.category,
            adopted: 'false'
        }
     await axiosSecure.patch(`/pets/${id}`, petUpdateInfo)
     await axiosPublic.patch(`/adopt/${petId}`, {adopted:'false'})

        refetch();
    }
    // console.log(data);
    const handleIsAccepted = async (id,petId) => {
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
      await axiosSecure.patch(`/pets/${id}`, petUpdateInfo)
      await axiosPublic.patch(`/adopt/${petId}`, {adopted:'true'})
        refetch();
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Title heading="Manage All Pets" />
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <div className="w-full px-4">
                        <Skeleton height={40} count={1} />
                        <Skeleton height={20} count={10} className="mt-4" />
                    </div>
                </SkeletonTheme>
            </div>
        );
    }

    if (!data) {
        return <h1 className="text-center text-xl my-20">There are no requests.</h1>;
    }
    const owner = data.filter(p => p.ownerEmail == user?.email);
    return (
        <div>
            <Title  heading={'Manage All Request'} />
            {
                owner && owner.length > 0 ?
                    (<div className="overflow-x-auto border p-5 my-5 shadow-lg">
                        <div>
                            <p className="text-3xl font-bold my-3 text-blue-500">Total Request:{owner.length} </p>
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
                                {owner.map((pet, index) =>
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
                                                disabled={owner.adopted == 'false'}
                                                onClick={() => handleIsAccepted(pet.requestPetId, pet._id)}
                                                className="text-sm ">
                                                {
                                                    pet?.adopted == 'true' ?
                                                    <span
                                                    className="text-green-600 text-2xl"
                                                ><GoCheck /></span>  : 'accept'      
                                                }
                                            </button>
                                        </td>
                                        <td >
                                            <button
                                            onClick={() => handleIsReject(pet.requestPetId,pet._id)}
                                                className="text-sm ">
                                                {
                                                    pet?.adopted == 'false' ?
                                                    <span
                                                    className="text-red-600 text-2xl"
                                                ><IoMdRemoveCircle /></span>
                                                        : 'reject'     
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