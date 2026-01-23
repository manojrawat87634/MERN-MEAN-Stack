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
    const data = decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFub2oiLCJlbWFpbCI6Im1hbm9qQGdtYWlsLmNvbSIsImlhdCI6MTc2OTE2NTQ2N30.u0AqzDNwOkOsbY8W-lkSMamsRYrpaPzQkSSYjxGEkfw');
    return res.json(data);
})

app.listen(3000, ()=>{
    console.log('hii');
})