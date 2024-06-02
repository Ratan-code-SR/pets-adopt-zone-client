

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

export default PrivateRoute;