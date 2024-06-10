
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useAuth from "../../../Hooks/useAuth";

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pets', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/email/${user?.email}?page=${currentPage}&limit=${petsPerPage}`);
            return res.data;
        }
    });

    const totalPages = data ? Math.ceil(data.totalCount / petsPerPage) : 1;

    if (isLoading) {
        return (
            <div>
                <Title heading={'Manage All Pets'} />
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <p>
                        <Skeleton count={3} />
                    </p>
                </SkeletonTheme>
            </div>
        );
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/pets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch();
                    });
            }
        });
    };
    const pets = data.pets;
console.log(data);
    const handleIsAccepted = async (id) => {
        const pet = pets.find(pet => pet._id === id);
        const petUpdateInfo = {
            petImage: pet.petImage,
            name: pet.name,
            location: pet.location,
            age: pet.age,
            description: pet.description,
            longDescription: pet.longDescription,
            category: pet.category,
            adopted: 'true'
        }
        await axiosSecure.patch(`/pets/${id}`, petUpdateInfo)
        refetch();
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Title heading={'Manage All Pets'} />
            {
                data && data.pets.length > 0 ?
                    (
                        <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                            <div>
                                <p className="text-3xl font-bold my-3">Total Pets: {data.totalCount} </p>
                            </div>
                            <table className="table">
                                <thead className="bg-[#96875d] text-white">
                                    <tr>
                                        <th>SL</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Update</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.pets.map((pet, index) => (
                                        <tr key={pet._id}>
                                            <td>{index + 1 + (currentPage - 1) * petsPerPage}</td>
                                            <td>
                                                <img className="w-10 h-10 rounded-md" src={pet?.petImage} alt="" />
                                            </td>
                                            <td>{pet?.name}</td>
                                            <td>{pet?.category}</td>
                                            <td>
                                                <Link to={`/dashboard/updatePet/${pet._id}`}>
                                                    <button className="text-xl text-white p-2 rounded-md bg-red-700"><MdEditSquare /></button>
                                                </Link>
                                            </td>
                                            <td>
                                                {
                                                    pet.adopted == 'true'? <p className='text-green-600 font-bold'>true</p> :
                                                    <button
                                                    onClick={() => handleIsAccepted(pet._id)}
                                                    className="text-sm text-red-500 font-bold ">
                                                    false
                                                </button>
                                                }
                                               
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(pet._id)} className="text-xl text-white p-2 rounded-md bg-red-700 "><MdDelete /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center my-5">
                                {[...Array(totalPages).keys()].map(number => (
                                    <button
                                        key={number + 1}
                                        className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-[#96875d] text-white' : 'bg-gray-300'}`}
                                        onClick={() => handlePageChange(number + 1)}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) :
                    (<h1 className="text-center text-xl my-20">You have not added a pet.</h1>)
            }
        </div>
    );
};

export default MyAddedPets;
