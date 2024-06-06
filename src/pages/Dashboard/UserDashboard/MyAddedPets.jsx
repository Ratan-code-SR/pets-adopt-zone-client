import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Title from '../../../pages/Title/Title';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useAuth from "../../../Hooks/useAuth";
const MyAddedPets = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/email/${user?.email}`)
            return res.data;
        }
    })
    console.log(data);
    if (isLoading) {
        return <div>
            <Title subHeading={'Your Pets'} heading={'manage all Pets'} />
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    }
    // handle delete your owen pet
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
                        refetch()
                    })
            }
        });
    }
    return (
        <div>
            <Title subHeading={'Your Pets'} heading={'manage all Pets'} />
            {
               data && data.length > 0 ?
                  (  <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                    <div>
                        <p className="text-3xl font-bold my-3">Total Pets:{data.length} </p>
                    </div>
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#96875d] text-white">
                            <tr>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Adoption</th>
                                <th>Delete</th>
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
                                    <td>{pet?.category}</td>
                                    <td>{pet?.adopted}</td>
                                    <td>
                                        <Link to={`/dashboard/updatePet/${pet._id}`}><button className="text-xl text-white p-2 rounded-md bg-red-700"><MdEditSquare /></button></Link>
                                    </td>
                                    <td>
                                        <button className="text-xl text-white p-2 rounded-md bg-red-700"><FaDonate /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(pet._id)} className="text-xl text-white p-2 rounded-md bg-red-700"><MdDelete /></button>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>)
                 :
                ( <h1 className="text-center text-xl my-20">You have not added a pet.</h1>)
               
            }

        </div>
    );
};

export default MyAddedPets;