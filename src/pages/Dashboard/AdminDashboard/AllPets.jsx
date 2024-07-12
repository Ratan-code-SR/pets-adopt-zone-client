
import Title from "../../Title/Title";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePets from "../../../Hooks/usePets";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BallTriangle } from "react-loader-spinner";


const AllPets = () => {
    const [pets, loading, refetch] = usePets();
    const axiosSecure = useAxiosSecure()

    const handleDelete = id => {
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


    const handleIsReject = async (id) => {
        const pet = pets.find(pet => pet._id === id);
        const petUpdateInfo = {
            petImage: pet.petImage,
            name: pet.name,
            location: pet.location,
            age: pet.age,
            description: pet.description,
            longDescription: pet.longDescription,
            category: pet.category,
            adopted: 'false'
        }
        await axiosSecure.patch(`/pets/${id}`, petUpdateInfo)

        refetch();
    }
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


    if (loading) {
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

    if (!Array.isArray(pets)) {
        return;
    }
    return (
        <div>
            <Title heading={'Manage All Pets'} />
            <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                <div>
                    <p className="text-3xl font-bold my-3 text-blue-500">Total Pets: {pets.length}</p>
                </div>
                <table className="table">
                    <thead className="bg-[#96875d] text-white">
                        <tr>
                            <th>SL</th>
                            <th>Pet Image</th>
                            <th>Pet Name</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={pet._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img className="w-10 h-10 rounded-md" src={pet.petImage} alt={pet.name} />
                                </td>
                                <td>{pet.name}</td>
                                <td>{pet.category}</td>
                                <td>{pet.location}</td>
                                <td >
                                    {
                                        pet.adopted == 'true' ?
                                        <button
                                                onClick={() => handleIsReject(pet._id)}
                                                className="text-sm ml-3 ">
                                                Adopted
                                            </button> :
                                            <button
                                                onClick={() => handleIsAccepted(pet._id)}
                                                className="text-sm mr-3">
                                                Not Adopted
                                            </button> 
                                    }
                                </td>
                                <td className="flex gap-2">
                                    <Link to={`/dashboard/updatePet/${pet._id}`}>
                                        <button className="text-md text-white p-1 bg-orange-500 rounded-md"><FaEdit /></button>
                                    </Link>
                                    <button onClick={() => handleDelete(pet._id)} className="text-md text-white p-1 bg-red-700 rounded-md"><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;

