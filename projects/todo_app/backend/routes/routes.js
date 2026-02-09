import loginUser, { registerUser } from "../controllers/auth/login.controllers.js"

export const routeFunc = (app)=>{
    app.post('/login', loginUser);
    app.post('/register', registerUser);
}

