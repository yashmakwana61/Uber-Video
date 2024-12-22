import React, { useState } from "react";
import { Link } from "react-router-dom"



const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
    const submitHandler = (e) =>{
        e.preventDefault();
        setCaptainData({
            email: email,
            password
        });
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