import mongoose from "mongoose";

const connectionToDatabase = async ()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/test');
        console.log("contected to db");
    } catch (error) {
        console.log(error);
    }
}

export default connectionToDatabase;