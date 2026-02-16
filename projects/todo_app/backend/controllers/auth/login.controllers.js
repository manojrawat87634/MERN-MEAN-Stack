import StudentModel from "../../models/user.model.js";
import { encodeUser } from "../../utils/utils.js";

const loginUser = async (req, res) => {
    const email = req.body.email;
    const user = await StudentModel.findOne({ email });
    if (!user) {
        return res.json({ "error": "User not found" }).status(400);
    }
    const isValid = user.comparePassword(req.body.password);
    if (isValid) {
        const token = await encodeUser({ _id: user._id, email: user.email });
        console.log(token);
        return res.json({ accessToken: token });
    }
    res.json({ "error": "Invalid Info" }).status(400);
}


export const registerUser = async (req, res) => {
    try {
        const data = await StudentModel.insertOne(req.body);
        console.log("hii")
        return res.json({ message: "User registered Successfully!!" });
    } catch (error) {
        console.log(error);
        console.log("hii")
        return res.json({ error: 'Internal Server Error' }).status(400);
    }
};


export default loginUser;