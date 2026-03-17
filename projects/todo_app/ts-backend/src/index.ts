import express from "express";
import deserializeUser from "./middlewares/deserializeUser.js";
import conncetionToDataBaseFunction from "./db/connections.js";
import routeFunction from "./routes.js";
import cors from "cors";

const app = express();
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors(
    {
        origin : "*"
    }
));

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    conncetionToDataBaseFunction();
    routeFunction(app);
});