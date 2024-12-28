import React from "react";
import { useNavigate } from "react-router-dom";


const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    console.log(token);

    if(!token) {
        navigate('/captain-login');
    }

    return (
        <>
            {children}
        </>
    );
};


export default CaptainProtectWrapper;