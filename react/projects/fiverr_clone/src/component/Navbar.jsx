import React, { useContext, useState } from 'react'
import { BiHeart } from 'react-icons/bi';
import { BsInboxes } from 'react-icons/bs';
import { CgNotifications, CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context';

const Navbar = () => {
    const { users, setUsers } = useContext(DataContext);
    const navArr = [
        { label: "Fiverr Pro", user: "guest",  },
        { label: "Explore", user: "guest" },
        { label: "En", user: "guest" },
        { label: "Become a Seller", user: "guest" },
        { label: "Sign In", user: "guest", link : "/register" },
        { label: "Join", user: "guest" , onChange : ()=>{setUsers('user');  }},
        { label: <CgNotifications />, user: "user" },
        { label: <BsInboxes />, user: "user" },
        { label: <BiHeart />, user: "user" },
        { label: "Orders", user: "user" },
        { label: <CgProfile />, user: "user", onChange : ()=>{
            setUsers('guest');

        } },
    ];
    
    return (
        <>
            <div
                style={{ fontSize: "17px" }}
                className='flex  font-semibold text-gray-700 gap-6 p-6 shadow'>
                <div className='mr-auto'><img
                    className='h-8'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fiverr_Logo_09.2020.svg/2560px-Fiverr_Logo_09.2020.svg.png" alt="" /></div>
            {navArr.map((e, i)=>{
                if (e.user == users){
                    return <NavLink onClick={()=>{
                        if (e.onChange){
                            e.onChange();
                        }
                    }} to={e.link ? e.link : "#"} className={'cursor-pointer'}>{e.label}</NavLink>
                }
                return null
                
            })}
                   
            </div>
        </>
    )
}

export default Navbar