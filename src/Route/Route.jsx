import Main from '../layout/Main.jsx';
import {createBrowserRouter} from "react-router-dom";
import Home from '../pages/Home/Home/Home.jsx';
import Register from '../pages/Register/Register.jsx';
import Login from '../pages/Login/Login.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // element: <ErrorElement />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            }
           
        ],
    },
]);

export default router;