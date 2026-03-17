import { QueryFilter } from "mongoose";
import _ from "lodash";
const { omit } = _;
import UserModel, { InterfaceUser } from "../models/user.models.js";


const registerUser = async (my_user : InterfaceUser) => 
    {
    try { return await UserModel.create(my_user)} catch (error) {
        if (typeof error === 'string') {
            throw new Error(error); // If error is a string, throw it as is
        } else {
            throw new Error(String(error)); // Cast error to string before throwing
        }
    }
}


const findUser = async(query : QueryFilter<InterfaceUser>)=>{
    try {
        return await UserModel.find(query).lean();
    } catch (error) {
        throw new Error(String(error)); // Cast error to string before throwing 
    }
}


const validatePassword = async ({
    email ,
    password
}:{
    email : InterfaceUser["email"],
    password : string
})=>{
    const user = await UserModel.findOne({email : email});
    if(!user){
        return false;
    }
   const is_valid = user.comparePassword(password);
   if(!is_valid){
    return false;
   }
   return omit(user.toJSON(), "password");
}


export { registerUser, findUser, validatePassword };