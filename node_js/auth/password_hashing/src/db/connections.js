import mongoose from "mongoose"

const connectionToDatabase = ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/test");
    } catch (error) {
        console.log(error);
    }
}

export default connectionToDatabase;