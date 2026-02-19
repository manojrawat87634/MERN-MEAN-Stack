import { get  }from "lodash"
import { decodeTokenByJwt } from "../utils/utils";
const deserializeUser  = async()=>{
    const token = get('req.headers.authorization');
        const {decode } =decodeTokenByJwt(token)
        if (!decode) return res.json().status(401);
        next();
}

export default deserializeUser;