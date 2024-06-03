import { useContext } from "react";
import { AuthContext } from "../components/Provider/ContextProvider";

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;