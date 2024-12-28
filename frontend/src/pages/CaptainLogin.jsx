import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from "../context/captainContext";



const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const {captain ,setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();


    const submitHandler = async (e) =>{
        e.preventDefault();
        const captainData = {
            email:email,
            password:password
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
        if(response.status === 200){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        setEmail('')
        setPassword('')

    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://w7.pngwing.com/pngs/636/735/png-transparent-logo-uber-brand-design-text-logo-engineering-thumbnail.png" alt="" />
                <form onSubmit={(e)=>{submitHandler(e)}} action="">
                    <h3 className="text-lg font-medium mb-2">Enter your email</h3>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="email" placeholder="email@example.com" />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="password" placeholder="Enter Password" />
                    <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Login</button>
                    <p className="text-center">Join a Fleet?<Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link></p>
                </form>
            </div>
            <div>
                <Link to='/login' className="bg-[#d5622d] text-[#fff] flex items-center justify-center font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin