import express, { json } from "express";
import StudentModel from "./src/models/user.model.js";
import connectionToDatabase from "./src/db/connections.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin : "*"
}));

app.use(express.json());

app.get("", async (req, res)=>{
    const data = await StudentModel.find();
    return res.json({data});
});

app.post('/register', async (req, res)=>{
    try {
        const res = await StudentModel.create(req.body);
        return res.json({message : "User registered Successfully!!"});
    } catch (error) {
        return res.json({error : 'Internal Server Error'}).status(400);
    }
})
app.listen(3000, ()=>{
    connectionToDatabase();
    console.log('running');
})