import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin : "*"
}));

app.use(express.json());
app.get('/', (req, res)=>{
    return res.json({
        message : "my first APi"
    });
});

app.post("/contact", (req, res)=>{
    console.log(req.body);
    return res.json({message : "Data Posted Successfully!!"});
})

app.listen(3000, ()=>{
    console.log("running");
});