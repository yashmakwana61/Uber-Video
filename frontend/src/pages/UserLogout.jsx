import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserLogout = () =>{

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{
        headers:{
            'Authorization': `Bearer ${token}`
            }
    }).then((response) => {
        console.log(response.data);
        localStorage.removeItem('token');
        navigate('/login');
    })
    return (
        <div>User Logout</div>
    )
}

export default UserLogout;