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
                element: <AdminHome />
            },
            {
                path: 'allDonations',
            },
            {
                path: "addPet",
                element: <AddPets />
            },
            {
                path: 'myAddPets',
                element: <MyAddedPets />
            },
            {
                path: 'myDonated',
                element: <MyDonations />
            },
            {
                path: 'updatePet/:id',
                element: <UpdatePets />
            }

        ]
    }
]);

export default router;