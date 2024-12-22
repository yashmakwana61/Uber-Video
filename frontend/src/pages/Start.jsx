import React from "react";
import { Link } from 'react-router-dom';

const Start = () =>{``
    return (
        <div>
            <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1596467289669-3a86bc54a360?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
                <img className="w-16 ml-8" src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
                <div className="bg-white py-4 px-4">
                    <h2 className="text-2xl font-bold">Get Started with Uber Clone</h2>
                    <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4">Continue</Link>
                </div>
            </div>
        </div>
    )
};

export default Start