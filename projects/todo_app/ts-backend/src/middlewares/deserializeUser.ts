import { NextFunction, Request, Response } from "express";
import _ from "lodash";
const { get } = _;
import { userDecodeByJwt } from "../utils/utils.jwt.js";
import { reIssueAccessTokenFunc } from "../services/session.service.js";


const deserializeUser = async (req : Request, res : Response, next : NextFunction)=>{
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/ ,""
    );
    const refreshToken = get(req, "headers.x-refresh");
    if(!accessToken) return next();
    const { decode , expired } = userDecodeByJwt(accessToken);
    if(decode) {
        // @ts-ignore
        req.user = decode
        return next();
    }
    if(expired && refreshToken){
        if(typeof(refreshToken) == "string"){
            const newAccessToken = await reIssueAccessTokenFunc({ refreshToken  });
            if (newAccessToken){
                res.setHeader("x-access-token", newAccessToken);
                const { decode } = userDecodeByJwt(newAccessToken);
                // @ts-ignore
                req.user = decode;
            }
            return next();
        }
    }
    return next();
}

export default deserializeUser;