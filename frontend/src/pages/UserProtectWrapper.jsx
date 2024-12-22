import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";


const UserProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    if(!token) {
        navigate('/login');
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;