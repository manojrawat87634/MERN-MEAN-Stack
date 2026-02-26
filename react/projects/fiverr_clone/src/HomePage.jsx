import React from "react";
import logo from "./images/logos/download.svg";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
    return <>

    <div className="relative">
                <video loop muted autoPlay>
                    <source src="https://cdn.pixabay.com/video/2016/02/09/2106-154902020_large.mp4" />
                </video>
            <div className="absolute top-0 flex items-center h-[78vh] text-white p-8  ">
                <div className="flex flex-col gap-6" >
                    {/* Heading Div */}
                    <div>
                        <h1 className="text-6xl">Our freelancers
                            <br />will take it from here</h1>
                    </div>
                    {/* Input Start Div */}
                    <div className="w-[1010px] relative">
                        <input type="text" placeholder="Search for any service..."
                            className="bg-white text-gray-700 w-full outline-none rounded h-10 pl-4" />
                        <span className="absolute top-[3.4px] right-2 bg-black p-2 rounded">
                            <FaSearch className="" />
                        </span>
                    </div>

                    {/* Button Div */}
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 border border-white rounded"
                            style={{ backgroundColor : "rgba(0,0, 0, 0.5)" }}>Website Development</button>
                        <button
                            className="px-4 py-2 border border-white rounded"
                            style={{ backgroundColor : "rgba(0,0, 0, 0.5)" }}>Website Development</button>
                        <button
                            className="px-4 py-2 border border-white rounded"
                            style={{ backgroundColor : "rgba(0,0, 0, 0.5)" }}>Website Development</button>
                        <button
                            className="px-4 py-2 border border-white rounded"
                            style={{ backgroundColor : "rgba(0,0, 0, 0.5)" }}>Website Development</button>
                        <button
                            className="px-4 py-2 border border-white rounded"
                            style={{ backgroundColor : "rgba(0,0, 0, 0.5)" }}>Website Development</button>
                       </div>

                    <div className="flex gap-4 items-center">
                        <div>Trusted By :</div>
                        <div><img src={logo} alt="" /></div>
                        <div><img src={logo} alt="" /></div>
                        <div><img src={logo} alt="" /></div>
                        <div><img src={logo} alt="" /></div>
                        <div><img src={logo} alt="" /></div>
                        <div><img src={logo} alt="" /></div>
                    </div>
                </div>
            </div>
            </div>

    </>
}


export default HomePage;