import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // ES6
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
export const AuthContext = createContext()
const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = useAxiosPublic()
    // email password register 
    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // email password login an user 
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login 
    const provider = new GoogleAuthProvider();
    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // logout user 
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    // update user profile 
    const userProfileUpdated = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            const userInfo = { email: currentUser.email }
            if (currentUser) {
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })
            } else {
                // hello
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => {
            return unsubscribed()
        }
    }, [axiosPublic])

    const info = {
        loading,
        user,
        setUser,
        setLoading,
        signInGoogle,
        signUpUser,
        userProfileUpdated,
        loginUser,
        logOut
    }
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


