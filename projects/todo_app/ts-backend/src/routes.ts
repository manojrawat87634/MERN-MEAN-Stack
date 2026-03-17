import { Express, Request, Response } from "express";
import validateUser from "./middlewares/validateUser.js";
import { userLoginSchema, userRegisterSchema } from "./schemas/user.schema.js";
import { registerUserHandler } from "./controlers/user.controlers.js";
import { logoutHandler, userLoginHandler } from "./controlers/session.controlers.js";
import requireUser from "./middlewares/requireUser.js";
import { todoCreateSchema, todoGetOneTodo, todoUpdateSchema } from "./schemas/todo.schema.js";
import { createTodoHadler, deleteTodoHandler, getTodoByIdHandler, getUserTodoHandler, updateTodoHandler } from "./controlers/todo.controlers.js";

const routeFunction = (app: Express) => {
    app.get("", (req : Request, res : Response)=>{res.status(200).json({"message" : "This is testing routes"})}),
    app.post("/api/register", validateUser(userRegisterSchema), registerUserHandler),
        app.post("/api/login", validateUser(userLoginSchema), userLoginHandler),
        app.post("/api/logout", requireUser, logoutHandler),
        app.post("/api/todo", [requireUser, validateUser(todoCreateSchema)], createTodoHadler),
        app.put("/api/todo/:_id", [requireUser, validateUser(todoUpdateSchema)], updateTodoHandler),
        app.get("/api/todoget", [requireUser], getUserTodoHandler),
        app.get("/api/todoget/:_id", [requireUser, validateUser(todoGetOneTodo)], getTodoByIdHandler),
        app.delete("/api/tododelete/:_id", [requireUser], deleteTodoHandler)
}

export default routeFunction;