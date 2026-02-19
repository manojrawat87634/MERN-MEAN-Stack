import express from "express";
import createToken, { decodeToken } from "./util/util.js";

const app = express();
app.get('/', (req, res) =>{
    const token = createToken();
    return res.json({
        token
    });
});

app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const data = decodeToken(id);
    return res.json(data);
})

app.listen(3000, ()=>{
    console.log('hii');
})