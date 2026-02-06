import { createUserSessionHandler } from "../controlers/session.controlers.js";
import userRegisterControler, { getAllUser } from "../controlers/user.controlers.js";

const routeFunc = (app) => {
    app.post('/login', createUserSessionHandler);
    app.post('/register', userRegisterControler);
    app.post('/get-all-user', getAllUser)
}

export default routeFunc;