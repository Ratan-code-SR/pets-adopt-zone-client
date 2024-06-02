import Main from '../layout/Main.jsx';
import Home from '../pages/Home/Home/Home.jsx';
import {createBrowserRouter} from "react-router-dom";

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
           
        ],
    },
]);

export default router;