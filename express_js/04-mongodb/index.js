import express from "express";
import connectionToDatabase from "./src/db/connection.js";

const app = express();

app.get("/", (req, res)=>{
    return res.json({

    });
})

app.listen(3000, ()=>{
    connectionToDatabase();
    console.log('running');
})