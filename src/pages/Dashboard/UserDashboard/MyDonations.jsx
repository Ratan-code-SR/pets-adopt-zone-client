
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../Title/Title";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BallTriangle } from "react-loader-spinner";

const MyDonations = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: myDonation, isPending: loading, refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure(`/payments/paymentsEmail/${user?.email}`)
            return res.data;

        }
    })

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
    const totalDonations = myDonation.reduce((total, item) => total + parseInt(item.amount), 0)
    const handleRefund = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be refund this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Refund It !"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/payments/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Success",
                                text: "Your Refund request successful.",
                                icon: "success"
                            });
                        }
                        refetch()
                    })
            }
        });
    }
    return (
        <div className="p-2">
            <Title heading="My Donations"></Title>
            {
                myDonation.length > 0 ? <>
                    <div className="lg:flex justify-between items-center ">
                        <h1 className="text-2xl font-bold text-blue-500">Total Donation : {myDonation.length}</h1>
                        <h1 className="text-2xl font-bold text-blue-500">Total Donate Amount : {totalDonations}</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-[#96875d] text-white">
                                    <th> SL</th>
                                    <th>Pet Image</th>
                                    <th>Pet Name</th>
                                    <th>Donate Amount</th>
                                    <th>Transaction Id</th>
                                    <th>Ask for refund</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myDonation.map((donate, index) => (
                                        <tr key={donate._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img className="w-10 h-10 rounded-md" src={donate.petImage} alt="" />
                                            </td>
                                            <td>
                                                {donate.petName}
                                            </td>
                                            <td>
                                                {donate.amount} $
                                            </td>
                                            <td>
                                                {donate.transactionId}
                                            </td>
                                            <td>
                                                <button className="p-2 rounded-md text-white bg-orange-400" onClick={() => handleRefund(donate._id)}>Refund?</button>
                                            </td>

                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </> : <>
                <h1 className="text-center font-bold text-xl my-10">You have not donations </h1>
                </>
            }
        </div>
    );
};

export default MyDonations;