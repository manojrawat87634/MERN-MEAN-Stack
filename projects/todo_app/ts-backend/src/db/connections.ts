import mongoose from "mongoose";
import configraution from "../config/config.env.js";

const conncetionToDataBaseFunction = async() =>{
    const dbUri = configraution.dbUri as string
    try{
        mongoose.connect(dbUri);
        console.log("Connected to Database")
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

export default conncetionToDataBaseFunction;