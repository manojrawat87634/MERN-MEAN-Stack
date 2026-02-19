import jwt from "jsonwebtoken";

const createToken = ()=>{
    const token = jwt.sign({
        user : "manoj",
        email : "manoj@gmail.com"
    }, 'manoj_secret');
    return token;
}

export const decodeToken = (token)=>{
    const data = jwt.decode(token, 'manoj_secret');
    return data;
}

export default createToken;