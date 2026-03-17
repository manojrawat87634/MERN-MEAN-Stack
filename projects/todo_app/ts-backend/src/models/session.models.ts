import mongoose, { Document } from "mongoose";
import { InterfaceUser } from "./user.models.js";

interface SessionInterface extends Document{
    user : InterfaceUser["_id"],
    valid : boolean,
    createdAt : Date,
    updatedAt : Date
}

const sessionSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    valid: { type: Boolean, default: true },
},{
    timestamps : true
});

const SessionModel = mongoose.model<SessionInterface>("session", sessionSchema);

export default SessionModel;

export { SessionInterface };