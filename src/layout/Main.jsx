import { Outlet } from "react-router-dom";
import Navbar from "../shared/Header/Navbar";
import Footer from "../shared/Footer/Footer";


const Main = () => {

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Main;