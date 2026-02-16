import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "student"
});

// Hash password before saving
studentSchema.pre("save", async function () {
    if (!this.isModified("password")) return; // only hash if password is new/modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return;
    } catch (err) {
    }
});

// Method to compare passwords during login
studentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
