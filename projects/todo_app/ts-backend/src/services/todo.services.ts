import todoModel from "../models/todo.models.js";


const createTodo = async (object: object, option : object={lean : true})=>{
    return await todoModel.create(object, option);
}

const updateTodo = async (query: object , update :object, options : object = {lean : true})=>{
    return await todoModel.updateOne(query, update, options);
}

const deleteTodo = async (query : object, options : object = {lean : true})=>{
    return await todoModel.deleteOne(query, options);
}

const findOneTodo = async (query : object, options : object = {lean : false})=>{
    return await todoModel.findOne(query, options);
}

const findTodo = async (query : object, options : object = {lean : false})=>{
    return await todoModel.find(query, options);
}

export { createTodo, updateTodo, deleteTodo, findOneTodo, findTodo };