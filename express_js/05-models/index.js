import express from "express";
import StudentModel from "./src/models/student.model.js";
import connectionToDatabase from "./src/db/connection.js";
import cors from "cors";

const app = express();
app.use(cors({origin : "*"}));
app.get('/user', async(req, res)=> {
    const data = await StudentModel.find();
    return res.json(data);
});

app.listen(3000, ()=>{
    connectionToDatabase();
    console.log('Running');
})