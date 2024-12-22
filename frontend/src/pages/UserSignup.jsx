import React, { useState, useContext } from "react"; // Import React and useState hook
import { Link } from "react-router-dom"; // Import Link for navigation
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import axios from 'axios'; // Import axios for making HTTP requests
import { UserDataContext } from "../context/userContext"; // Import UserDataContext for user state management

const UserSignup = () => {
    // State variables for user input
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [firstName, setFirstName] = useState(''); // State for first name
    const [lastName, setLastName] = useState(''); // State for last name
    
    const navigate = useNavigate(); // Initialize navigate function for routing
    const { user, setUser } = useContext(UserDataContext); // Access user context

    // Function to handle form submission
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Create a new user object with the input data
        const newUser  = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };

        // Send a POST request to register the new user
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser );
        
        // Check if the registration was successful
        if (response.status === 201) {
            const data = response.data; // Get the response data
            setUser (data.user); // Update user context with the new user data
            localStorage.setItem('token', data.token);
            navigate('/login'); // Redirect to the home page
        }

        // Clear the input fields after submission
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                {/* Logo image */}
                <img className="w-16 mb-10" src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="Logo" />
                
                {/* Signup form */}
                <form onSubmit={submitHandler} action="">
                    <h3 className="text-lg font-medium mb-2">Enter your name</h3>
                    <div className="flex gap-4 mb-6">
                        {/* Input for first name */}
                        <input 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" 
                            required 
                            type="text" 
                            placeholder="Firstname" 
                        />
                        {/* Input for last name */}
                        <input 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base" 
                            required 
                            type="text" 
                            placeholder="Lastname" 
                        />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Enter your email</h3>
                    {/* Input for email */}
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                        required 
                        type="email" 
                        placeholder="email@example.com" 
                    />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    {/* Input for password */}
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                        required 
                        type="password" 
                        placeholder="Enter Password" 
                    />
                    {/* Submit button */}
                    <button className="bg-[#111] text-[#fff] font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Sign Up
                    </button>
                    {/* Link to login page if user already has an account */}
                    <p className=" text-center">Already have an account?<Link to='/login' className="text-blue-600">Login here</Link></p>
                </form>
            </div>
            <div>
                {/* Disclaimer about consent for communication */}
                <p className="text-[10px] leading-tight">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
            </div>
        </div>
    );
};

export default UserSignup;