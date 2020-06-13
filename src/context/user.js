// user context
import React, { createContext, useState } from 'react';

const UserContex = createContext();

function getUserFromLocalStorage()
{
    return localStorage.getItem("user")
     ? JSON.parse(localStorage.getItem("user"))
     : {username: null, token: null};
}

function UserProvider({children}){
    const [user, setUser] = useState(getUserFromLocalStorage);
    const userLogin = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const userLogout = () => {
        setUser({username: null, token: null});
        localStorage.removeItem("user"); 
    }
    const [alert, setAlert] = useState({
        show: false,
        msg: "",
        type: "success"
    });
    const showAlert = ({msg, type = "success"}) => {
        setAlert({show: true, msg, type})
    }
    const hideAlert = () => {
        setAlert({...alert, show: false});
    }

    return <UserContex.Provider value={{
        user, userLogin, userLogout, alert ,showAlert, hideAlert
        }}>
        {children}
    </UserContex.Provider>
}

export {UserContex, UserProvider};

