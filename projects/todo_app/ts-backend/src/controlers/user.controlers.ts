import { NextFunction, Request, Response } from "express";
import _ from "lodash";
const { omit } = _;
import { registerUser } from "../services/user.services.js";

const registerUserHandler = async (req : Request, res : Response, next : NextFunction)=>{
    try {
        const user = await registerUser(req.body);
        return res.send(omit(user.toJSON(),"password"));
    } catch (error) {
        return res.status(409).send({"error" : "some error occured"})
    }
}

export { registerUserHandler };