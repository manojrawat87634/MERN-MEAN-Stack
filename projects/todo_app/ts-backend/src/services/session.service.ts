import _ from "lodash";
const { get } = _;
import {  UpdateQuery, QueryFilter } from "mongoose";
import { NextFunction } from "express";
import SessionModel, { SessionInterface } from "../models/session.models.js";
import { InterfaceUser } from "../models/user.models.js";
import { userDecodeByJwt, userSignByJwt } from "../utils/utils.jwt.js";
import { findUser } from "./user.services.js";

const createSession = async (userId : string) =>{
    const session = await SessionModel.create({ user : userId });
    return session.toJSON();
}

const createAccessToken = ({user, 
    session} : {
        user : | Omit <InterfaceUser , "password"> ,
        session : | Omit <SessionInterface, "password">
    })=>{
    const accessToken = userSignByJwt({...user, session : session._id });
    return accessToken;
}

const reIssueAccessTokenFunc = async ({refreshToken} : {refreshToken : string})=>{
    const decode =  userDecodeByJwt(refreshToken);
    if(!decode || get(!decode, "_id")) return false;
    const session = await SessionModel.findById(get(decode, "_id"));
    if(!session || !session.valid) return false;
    const user = await findUser({"_id" : session.user});
    if (!user) return false;
    const accessToken = userSignByJwt({user, session})
    return accessToken;
}

const updateSession = async (
    query : QueryFilter<SessionInterface>,
    update : UpdateQuery<SessionInterface>
)=>{
    return SessionModel.updateOne(query, update);
}

const findSession = (query: QueryFilter<SessionInterface>)=>{
    return SessionModel.find(query).lean();
}

export { reIssueAccessTokenFunc, updateSession, createAccessToken, createSession, findSession };