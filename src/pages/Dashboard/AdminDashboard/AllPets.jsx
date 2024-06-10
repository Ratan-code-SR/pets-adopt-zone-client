
// import Title from "../../Title/Title";
// import { MdDelete } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import Swal from "sweetalert2";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { Link } from "react-router-dom";
// import usePets from "../../../Hooks/usePets";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// const AllPets = () => {
//     const axiosPublic = useAxiosPublic()
//     const [pets,loading ,refetch] = usePets()
//     const handleDelete = id => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosPublic.delete(`/pets/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                         refetch()
//                     })
//             }
//         });
//     }
//     if (loading) {
//         return <div className="flex flex-col items-center justify-center min-h-screen">
//             <Title heading="Manage All Pets" />
//             <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
//                 <div className="w-full px-4">
//                     <Skeleton height={40} count={1} />
//                     <Skeleton height={20} count={10} className="mt-4" />
//                 </div>
//             </SkeletonTheme>
//         </div>
//     }
//     return (
//         <div>
//             <Title  heading={'Manage All Pets'} />
//             <div className="overflow-x-auto border p-5 my-5 shadow-lg">
//                 <div>
//                     <p className="text-3xl font-bold my-3 text-blue-500">Total Pets: {pets.length}</p>
//                 </div>
//                 <table className="table">
//                     {/* head */}
//                     <thead className="bg-[#96875d] text-white">
//                         <tr>
//                             <th>SL</th>
//                             <th>Pet Image</th>
//                             <th>Pet Name</th>
//                             <th>Category</th>
//                             <th>Location</th>
//                             <th>Status</th>
//                             <th>Action</th>

//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {pets?.map((pet, index) =>
//                             <tr key={pet._id}>
//                                 <td>{index + 1}</td>
//                                 <td>
//                                     <img className="w-10 h-10 rounded-md" src={pet.petImage} alt="" />
//                                 </td>
//                                 <td>{pet.name}</td>
//                                 <td>{pet.category}</td>
//                                 <td>{pet?.location}</td>
//                                 <td >
//                                     {/* {pet.role === 'admin' ? <p className="text-green-400 font-bold">Admin</p> : <button onClick={() => handleMakeAdmin(pet?._id)} className="bg-orange-400 p-2 text-xl text-white rounded-md">{pet.adopted}</button>} */}
//                                     <button>{pet.adopted}</button>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     <Link to={`/dashboard/updatePet/${pet._id}`}><button className="text-md text-white  p-1 bg-orange-500 rounded-md"><FaEdit /></button></Link>
//                                     <button onClick={() => handleDelete(pet._id)} className="text-md text-white p-1 bg-red-700 rounded-md"><MdDelete /></button>
//                                 </td>
//                             </tr>
//                         )}

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllPets;

import Title from "../../Title/Title";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import usePets from "../../../Hooks/usePets";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllPets = () => {
    const axiosPublic = useAxiosPublic();
    const [pets, loading, refetch] = usePets();
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
                axiosPublic.delete(`/pets/${id}`)
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

    if (loading) {
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
                                <td>
                                    <button>{pet.adopted}</button>
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

