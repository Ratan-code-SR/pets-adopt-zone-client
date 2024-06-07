
import { useQuery } from "@tanstack/react-query";
import Title from "../../Title/Title";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
const AllPets = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pets')
            return res.data;
        }
    })
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
                        refetch()
                    })
            }
        });
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
            <Title subHeading={'All Pets'} heading={'manage all Pets'} />
            <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                <div>
                    <p className="text-3xl font-bold my-3 text-blue-500">Total Pets: {data.length}</p>
                </div>
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#96875d] text-white">
                        <tr>
                            <th>SL</th>
                            <th>Pet Image</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.map((pet, index) =>
                            <tr key={pet._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img className="w-10 h-10 rounded-md" src={pet?.petImage} alt="" />
                                </td>
                                <td>{pet.name}</td>
                                <td>{pet?.location}</td>
                                <td >
                                    {/* {pet.role === 'admin' ? <p className="text-green-400 font-bold">Admin</p> : <button onClick={() => handleMakeAdmin(pet?._id)} className="bg-orange-400 p-2 text-xl text-white rounded-md">{pet.adopted}</button>} */}
                                    <button>{pet.adopted}</button>
                                </td>
                                <td className="flex gap-2">
                                  <Link to={`/dashboard/updatePet/${pet._id}`}><button className="text-md text-white  p-1 bg-orange-500 rounded-md"><FaEdit /></button></Link>
                                    <button onClick={() => handleDelete(pet?._id)} className="text-md text-white p-1 bg-red-700 rounded-md"><MdDelete /></button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;