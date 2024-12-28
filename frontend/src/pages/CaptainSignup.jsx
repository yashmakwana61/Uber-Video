import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if(response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        
        console.log(response);
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
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

                    <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
                    <div className="flex gap-4 mb-6">
                        <input value={vehicleColor} onChange={(e) => { setVehicleColor(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required type="text" placeholder="Vehicle Color" />
                        <input value={vehiclePlate} onChange={(e) => { setVehiclePlate(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required type="text" placeholder="Vehicle Plate" />
                    </div>
                    <div className="flex gap-4 mb-6">
                        <input value={vehicleCapacity} onChange={(e) => { setVehicleCapacity(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required type="number" placeholder="Vehicle Capacity" />
                        <select value={vehicleType} onChange={(e) => { setVehicleType(e.target.value) }} className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" required>
                            <option value="">Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>
                    <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Create Captain Account</button>
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