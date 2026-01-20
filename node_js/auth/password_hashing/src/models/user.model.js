import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "student"
});

studentSchema.pre('save', async function () {
    try {
        if (!this.isModified("password")) next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
     console.log(error); 
    }
});

studentSchema.methods.comparePassword = async function (password){
   return bcrypt.compare(this.password, password);
}



const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;