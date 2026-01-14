import React from "react";

const Navbar = () => {
    const navArr = [
        {
            label: <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fiverr_Logo_09.2020.svg/500px-Fiverr_Logo_09.2020.svg.png" alt="" />
            , type: "all", cl: "mr-auto"
        },
        { label: "Fiverr Pro", type: "all" },
        { label: "Explore", type: "all" },
        { label: "En", type: "all" },
        { label: "Become a Seller", type: "all" },
        { label: "Sign in", type: "all" },
        { label: "Join", type: "all", cl: "px-4 py-2 rounded border font-bolds" },
    ];
    return <>
        <div className="p-4 flex font-bold gap-5 items-center text-gray-800 text-md shadow">
            {navArr.map((e) => (
                <div className={e.cl ? e.cl : ""}>
                    {e.label}
                </div>
            ))}
        </div>
    </>
}

export default Navbar;