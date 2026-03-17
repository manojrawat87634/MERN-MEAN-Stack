import { Request, Response } from "express";
import _ from "lodash";
const { get } = _;
import { createTodo, deleteTodo, findOneTodo, findTodo, updateTodo } from "../services/todo.services.js";

const createTodoHadler = async (req: Request, res: Response)=>{
    const todo = await createTodo(req.body);
    return res.status(200).json({"message" : "Todo Updated Successfully!!"});
}

const updateTodoHandler = async (req : Request, res: Response)=>{
    const todo_id = get(req, "params._id");
    const body = get(req, "body");
    const user_id = get(req ,"user._id");
    const todo = await findOneTodo({"_id" : todo_id});
    if (!todo) return res.status(400).json({"error": "Not Found!"});
    // @ts-ignore
    if(todo.user != user_id) return res.status(401).json({"error" : "Not Found"});
    const upTodo = await updateTodo({_id : todo_id}, body);
    return res.status(200).json({"message" : "Todo Updated Successfully!!"});
}

const getUserTodoHandler = async (req : Request, res: Response)=>{
    const user_id = get(req, "user._id");
    const user_todo = await findTodo({user : user_id});
    console.log(user_todo);
    return res.status(200).json(user_todo);
}

const getTodoByIdHandler = async (req: Request , res : Response)=>{
    const user_id = get(req, "user._id");
    const user_todo = await findOneTodo({user : user_id});
    if(!user_todo) return res.status(404).json({"error" : "Todo not Found"});
    // @ts-ignore
    if(req.user._id != user_todo.user) return res.status(401).json({"error" : "Unauthorize User"});
    return res.status(200).json(user_todo);
}


const deleteTodoHandler = async (req: Request , res : Response)=>{
    const user_id = get(req, "user._id");
    const todo_id = get(req, "params._id");
    const todo = await findOneTodo({"_id" : todo_id });
    if(!todo) return  res.status(400).json({"error": "Not Found!"});
    console.log(todo);
    // @ts-ignore
    if(todo.user != user_id) return res.status(401).json({"error" : "Not Found"});
    const delTodo = await deleteTodo({_id : todo_id});
    return res.status(200).json({"message" : "Todo Deleted Successfully!!"});
}

export { updateTodoHandler, getUserTodoHandler, deleteTodoHandler, getTodoByIdHandler,createTodoHadler };