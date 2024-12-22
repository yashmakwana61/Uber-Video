import React, {useState} from "react";
import { Link } from "react-router-dom";


const CaptainSignup = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [userData, setUserData] = useState({});
        const submitHandler = (e) => {
            e.preventDefault();
            setUserData({
                fullName:{
                    firstName:firstName,
                    lastName:lastName
                },
                email:email,
                password:password
            });
            console.log(userData);
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
        }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://w7.pngwing.com/pngs/636/735/png-transparent-logo-uber-brand-design-text-logo-engineering-thumbnail.png" alt="" />
                <form onSubmit={(e) => { submitHandler(e) }} action="">
                    <h3 className="text-lg font-medium mb-2">Enter your name</h3>
                    <div className="flex gap-4 mb-6">
                        <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required type="text" placeholder="Firstname" />
                        <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required type="text" placeholder="Lastname" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Enter your email</h3>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="email" placeholder="email@example.com" />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base" required type="password" placeholder="Enter Password" />
                    <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Sign Up</button>
                    <p className="text-center">Already have a account?<Link to='/captain-login' className="text-blue-600">Login here</Link></p>
                </form>
            </div>
            <div>
                <p className="text-[10px] leading-tight ">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
            </div>
        </div>
    )
};

export default CaptainSignup