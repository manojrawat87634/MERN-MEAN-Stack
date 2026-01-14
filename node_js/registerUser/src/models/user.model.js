import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    email : {
        type : String, 
        unique : true,
        required : true
    },
    password : {
        type : String, 
        required : true
    }
}, {
    timestamps : true,
    collection : "student"
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;