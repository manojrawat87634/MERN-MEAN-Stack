import express from "express";
import sendMailService from "./src/services/sendMailServices.js";

const app = express();

app.get("/", async(req, res)=>{
    await sendMailService();
    res.json({

    })
})


app.listen(3000, ()=>{
    console.log('hii');
})