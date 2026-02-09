import express, { json } from "express";
import cors from "cors";
import StudentModel from "./models/user.model.js";
import connectionToDatabase from "./db/connections.js";
import { routeFunc } from "./routes/routes.js";

const app = express();
app.use(cors({
    origin: "*"
}));

app.use(express.json());


app.listen(3000, () => {
    connectionToDatabase();
    routeFunc(app);
});