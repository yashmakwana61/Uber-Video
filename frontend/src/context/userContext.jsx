import React, { createContext } from "react";
import { useState } from "react";

export const userDataContext = createContext();

const UserContext = ({children}) => {
    const [user, userData] = useState({
        email:'',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
    return (
        <div>
            <userDataContext.Provider value={[user, userData]}>
                {children}
            </userDataContext.Provider>
        </div>
    )
};

export default UserContext;