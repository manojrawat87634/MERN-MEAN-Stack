import mongoose, { Document, Schema } from "mongoose";
import { InterfaceUser } from "./user.models.js";


interface TodoInterface extends Document {
    user : InterfaceUser["_id"],
    todo_title : string,
    todo_desc : string,
    createdAt : Date,
    updatedAt : Date
}

const todoSchema : Schema <TodoInterface> = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
    todo_title : {type : String},
    todo_desc : {type : String},   
},
{timestamps : true}
);

const todoModel = mongoose.model<TodoInterface>("todo", todoSchema);

export default todoModel;

export { TodoInterface };