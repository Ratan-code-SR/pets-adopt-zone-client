import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading ]= useAdmin()
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <>
            <p>loading............</p>
        </>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>

};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default AdminRoute;
