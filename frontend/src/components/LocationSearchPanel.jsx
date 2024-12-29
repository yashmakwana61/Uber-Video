import React from "react";

const LocationSearchPanel = (props) => {
    console.log(props)
    const location = [
        "24B, Near Kapoor Cafe, Sheriyans Coding School Bhopal",
        "25B, Near Malhotra Cafe, Sheriyans Coding School Bhopal",
        "26B, Near Singhania Cafe, Sheriyans Coding School Bhopal",
        "27B, Near Chauhan Cafe, Sheriyans Coding School Bhopal",
    ]

    return (
        <div>
            {/* This is a sample data */}
            {
                location.map((index, key) => {
                    return (
                        <div key={key} onClick={()=> {
                            props.setVehiclePanelOpen(true)
                            props.setPanelOpen(false)
                        }} className="flex gap-4 border-2 p-3 my-2 border-white active:border-black rounded-xl items-center justify-start">
                            <h2 className="bg-[#eee] h-7 flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill text-xl"></i></h2>
                            <h4 className="font-medium">{index}</h4>
                        </div>
                    )
                    })
            }
        </div>
    )
};

export default LocationSearchPanel;