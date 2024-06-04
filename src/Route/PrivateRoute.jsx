import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Provider/ContextProvider";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <>
            <div className="flex justify-center my-52">
                <span className="loading loading-spinner text-neutral"></span>
            </div>
        </>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>

};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};
export default PrivateRoute;