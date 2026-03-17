import { NextFunction, Request, Response } from "express";
import _ from "lodash";
const { get } = _;
import { validatePassword } from "../services/user.services.js";
import { createAccessToken, createSession, findSession, updateSession } from "../services/session.service.js";
import { userSignByJwt } from "../utils/utils.jwt.js";


const userLoginHandler = async (req: Request, res: Response)=>{
    const user = await validatePassword(req.body);
    if(!user){
        return res.status(401).send("Invalid username or password");
    }
    const session = await createSession(user._id.toString());
    const accessToken = createAccessToken({user, session});
    const refreshToken = userSignByJwt(session);
    return res.send({accessToken, refreshToken, user});
}

const logoutHandler = async (req : Request, res : Response, next : NextFunction)=>{
    const sessionId = get(req, "user.session");
    await updateSession({_id : sessionId}, {valid : false});
    return res.sendStatus(200);
}


const getUserSessionHandler = async(req : Request, res : Response, next : NextFunction)=>{
    const userId = get(req, "user._id");
    const session = await findSession({user: userId,
        valid : true
    });
    return res.send(session);
}

export { userLoginHandler,logoutHandler,getUserSessionHandler }
