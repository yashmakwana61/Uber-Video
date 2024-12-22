import React, { useState } from "react";
import { Link } from "react-router-dom"



const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const submitHandler = (e) =>{
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        });
        setEmail('')
        setPassword('')

    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
                <form onSubmit={(e)=>{submitHandler(e)}} action="">
                    <h3 className="text-lg font-medium mb-2">Enter your email</h3>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="email" placeholder="email@example.com" />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="password" placeholder="Enter Password" />
                    <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Login</button>
                </form>
                <p className="text-center">New here?<Link to='/signup' className="text-blue-600">Register Now</Link></p>
            </div>
            <div>
                <Link to='/captain-login' className="bg-[#10b461] text-[#fff] flex items-center justify-center font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin