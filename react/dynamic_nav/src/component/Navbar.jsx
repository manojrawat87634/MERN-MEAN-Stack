import React, { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('guest');
    const navArr = [
        {
            label: <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fiverr_Logo_09.2020.svg/500px-Fiverr_Logo_09.2020.svg.png" alt="" />
            , type: "guest", cl: "mr-auto"
        },
        {
            label: <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fiverr_Logo_09.2020.svg/500px-Fiverr_Logo_09.2020.svg.png" alt="" />
            , type: "user", cl: "mr-auto"
        },
        { label: "Fiverr Pro", type: "guest" },
        { label: "Explore", type: "guest" },
        { label: "En", type: "guest" },
        { label: "Become a Seller", type: "guest" },
        { label: "Sign in", type: "guest" },
        { label: <FaRegMessage size={19} />, type: "user" },
        { label: <IoIosNotificationsOutline size={29} />, type: "user" },
        {
            label: <button onClick={() => {
                setCurrentUser("user");
            }} className="px-4 py-2 rounded border font-bolds">Join</button>, type: "guest", cl: ""
        },
    ];

    return <>
        <div className="p-4 flex font-bold gap-5 items-center text-gray-800 text-md shadow">
            {navArr.filter((e) => e.type == currentUser).map((e) => (
                <div className={e.cl ? e.cl : ""}>
                    {e.label}
                </div>
            ))}
        </div>
    </>
}

export default Navbar;