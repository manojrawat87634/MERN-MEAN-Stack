import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";


interface InterfaceUser extends Document{
    name : string, 
    email  : string, 
    password : string, 
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string) : Promise<boolean>;
}

const userSchema : Schema <InterfaceUser> = new mongoose.Schema({
    
    name : {
        type : String, 
        required : true
    }, 
    email :  {
        type : String, 
        unique : true,
        required : true
    },
    password : 
    {
        type : String, 
        required : true
    }
},
{timestamps : true}
);


userSchema.pre("save", async function(this: InterfaceUser) {
    try{
        if(!this.isModified("password")){
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    }
    catch(error) {
            throw new Error(String(error)); // Cast error to string before throwing
    }
});

userSchema.methods.comparePassword = async function (password : string){
    const user = this as InterfaceUser;
    return bcrypt.compare(password, user.password).catch((error)=>false);
}

const UserModel = mongoose.model<InterfaceUser>("User", userSchema);

export default UserModel;
export { InterfaceUser }


