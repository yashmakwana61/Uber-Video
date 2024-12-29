import React, { useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destinantion, setDestinantion] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const submitHandler = () => {
        e.preventDefault();
    }

    useGSAP(function(){
        if(panelOpen==true){
            gsap.to(panelRef.current, {
                height: '70%',
                opacity:1
            })
            gsap.to(panelCloseRef.current,{
                opacity: 1
            })
        }else{
            gsap.to(panelRef.current, {
                height: '0%',
                opacity: 0
            })
            gsap.to(panelCloseRef.current,{
                opacity: 0
            })
        }
    }, [panelOpen]);

    useGSAP(function(){
        if(vehiclePanelOpen==true){
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    },[vehiclePanelOpen]);

    useGSAP(function(){
        if(vehiclePanelOpen==true){
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }

    },[vehiclePanelOpen])
    return (
        <div className="h-screen overflow-hidden">
            <img className="w-16 absolute left-5 top-5" src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
            <div className="h-screen w-screen">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5 ref={panelCloseRef} onClick={()=>{
                        setPanelOpen(false)
                    }} className="absolute opacity-0 top-6 text-2xl right-6">
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip!</h4>
                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <div className="line absolute h-16 w-1 top-[34%] left-10 bg-black rounded-full"></div>
                        <input value={pickup} onClick={()=>{setPanelOpen(true)}} onChange={(e) => { setPickup(e.target.value) }} className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3" type="text" placeholder="Add a Pick-up Location" />
                        <input value={destinantion} onClick={()=>{setPanelOpen(true)}} onChange={(e) => { setDestinantion(e.target.value) }} className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3" type="text" placeholder="Add a Drop-off Location" />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    {<LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>}
                </div>
            </div>
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14">
              <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen}/>
            </div>
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14">
              <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen}/>
            </div>
        </div>
    )
}

export default Home;