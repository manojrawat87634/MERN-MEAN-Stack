import express from "express";

const app = express();

app.get('/', (req, res)=>{
    return res.json({
        message : "my first APi"
    });
});

app.listen(3000, ()=>{
    console.log("running");
});