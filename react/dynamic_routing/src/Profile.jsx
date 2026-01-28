import { NavLink } from "react-router-dom";
import { users } from "./data";

const Profile = () => {
    return <>
        {users.map((e, i)=>{
            return <div >
            <NavLink to={`/profile/${e.id}/`} className={'flex gap-4 p-4 border-2 border-gray-300 rounded border-soild w-96 m-3'}>
            <img className="h-8 w-8 rounded-full" src={e.image} alt="" />
            <h1>{e.name}</h1>
            </NavLink>
            </div>
        })}
    </>
}

export default Profile;