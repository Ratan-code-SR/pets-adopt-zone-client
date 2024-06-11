import { useQuery } from "@tanstack/react-query";
import Title from "../../Title/Title";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                    })
            }
        });
    }
    const handleMakeAdmin = id => {
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
                axiosSecure.patch(`/users/admin/${id}`)
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
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <Title heading="Manage All Users" />
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
            <Title  heading={'Manage All Users'} />
            <div className="overflow-x-auto border p-5 my-5 shadow-lg">
                <div>
                    <p className="text-3xl font-bold my-3 text-blue-600">Total User: {data.length}</p>
                </div>
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#96875d] text-white">
                        <tr>
                            <th></th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data.map((user, index) =>
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img className="w-10 h-10 rounded-md" src={user?.photo} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td>{user?.email}</td>
                                <td >
                                    {user.role === 'admin' ? <p className="text-green-400 font-bold">Admin</p> : <button onClick={() => handleMakeAdmin(user?._id)} className="bg-orange-400 p-2 text-xl text-white rounded-md"><FaUser /></button>}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user?._id)} className="text-xl text-white p-2 rounded-md bg-red-700"><MdDelete /></button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;