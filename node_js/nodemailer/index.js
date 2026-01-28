import express from "express";
import sendMailService from "./src/services/sendMailServices.js";

const app = express();

app.get("/", async(req, res)=>{
    await sendMailService('positive.mind.123456789@gmail.com');
    res.json({

    })
})


app.listen(3000, ()=>{
    console.log('hii');
})