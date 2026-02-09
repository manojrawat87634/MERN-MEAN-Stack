import StudentModel from "../../models/user.model.js";
import { encodeUser } from "../../utils/utils.js";

const loginUser = (req, res)=>{
    const email = req.body.email;
    const user = StudentModel.findOne({email});
    if (!user){
        return res.json({"error" : "User not found"}).status(400);
    }
    const isValid = user.comparePassword(req.body.password);
    if (isValid){
        const token = encodeUser({_id : user._id, email : user.email});
        return res.json({accessToken});
    }
    res.json({ "error" : "Invalid Info"}).status(400);
}


export const registerUser =  async (req, res) => {
    try {
        const res = await StudentModel.create(req.body);
        return res.json({ message: "User registered Successfully!!" });
    } catch (error) {
        return res.json({ error: 'Internal Server Error' }).status(400);
    }
};


export default loginUser;