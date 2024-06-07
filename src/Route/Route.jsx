import Main from '../layout/Main.jsx';
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home/Home.jsx';
import Register from '../pages/Register/Register.jsx';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../layout/Dashboard.jsx';
import AdminRoute from './AdminRoute.jsx';
import Users from '../pages/Dashboard/AdminDashboard/Users.jsx';
import AdminHome from '../pages/Dashboard/AdminDashboard/AdminHome.jsx'
import AddPets from '../pages/Dashboard/UserDashboard/AddPets.jsx';
import MyAddedPets from '../pages/Dashboard/UserDashboard/MyAddedPets.jsx';
import MyDonations from '../pages/Dashboard/UserDashboard/MyDonations.jsx';
import UpdatePets from '../pages/Dashboard/UserDashboard/UpdatePets.jsx';
import CreateDonationCampaigns from '../pages/Dashboard/UserDashboard/CreateDonationCampaigns.jsx';
import AllPets from '../pages/Dashboard/AdminDashboard/AllPets.jsx';
import UserHome from '../pages/Dashboard/UserDashboard/UserHome.jsx';
import PrivateRoute from '../Route/PrivateRoute.jsx'
import MyDonationsCampaigns from '../pages/Dashboard/UserDashboard/MyDonationCampaign/MyDonationsCampaigns.jsx';
import EditDonationCampaign from '../pages/Dashboard/UserDashboard/MyDonationCampaign/EditDonationCampaign.jsx';
import AllDonations from '../pages/Dashboard/AdminDashboard/AllDonations.jsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // element: <ErrorElement />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }

        ],
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                path: "users",
                element: <AdminRoute> <Users />  </AdminRoute>
            },
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: "allPets",
                element: <AdminRoute><AllPets /></AdminRoute>
            },
            {
                path: "userHome",
                element:<PrivateRoute><UserHome /></PrivateRoute>
            },
            {
                path: 'allDonations',
                element:<AdminRoute><AllDonations/></AdminRoute>
            },
            {
                path: "addPet",
                element:<PrivateRoute><AddPets /></PrivateRoute>
            },
            {
                path: 'myAddPets',
                element:<PrivateRoute> <MyAddedPets /></PrivateRoute>
            },
            {
                path: 'myDonated',
                element:<PrivateRoute><MyDonations /></PrivateRoute>
            },
            {
                path: 'updatePet/:id',
                element: <PrivateRoute><UpdatePets /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/pets/${params.id}`)

            },
            {
                path: 'crateDonationCampaign',
                element:<PrivateRoute><CreateDonationCampaigns /></PrivateRoute>
            },
            {
                path:'myDonationCampaign',
                element:<PrivateRoute><MyDonationsCampaigns/></PrivateRoute>
            },
            {
                path:"editDonationCampaign/:id",
                element:<PrivateRoute><EditDonationCampaign/></PrivateRoute>,
                loader:({params}) => fetch(`http://localhost:5000/donations/${params.id}`)

            }

        ]
    }
]);

export default router;