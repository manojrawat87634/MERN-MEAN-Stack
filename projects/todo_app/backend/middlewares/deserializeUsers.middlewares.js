import { decodeUser } from "../utils/utils";

const deserializeUser = async(req, res, next)=>{
    const token = req.headers.authorization;
    if (!token) return next();
    const {decode, status } = decodeUser(token);
    if (status && decode){
        req.user = decode;
        next();
    }
    next();
}
export default deserializeUser;