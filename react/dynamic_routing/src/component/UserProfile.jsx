import React from 'react'
import { useParams } from 'react-router-dom'
import { users } from '../data';

const UserProfile = () => {
    const {id} = useParams(); 
    const user = users.find((e)=> e.id  == id);
  return (
    <div>
        <img src={user.image} alt="" />
        <h1>{user.email}</h1>
        <h1>{user.name}</h1>
        <h1>{user.desc.map((e)=> e)}</h1>
        </div>

    
  )
}

export default UserProfile