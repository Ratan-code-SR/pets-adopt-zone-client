import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // ES6

export const AuthContext = createContext()
const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const info = {loading,setLoading}
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node
};

export default ContextProvider;


