import UserModel from "../model/auth/user.model.js";
import { updateSessionService } from "../service/session.service.js";
import { createUserService, findAllUserService, findUserService, updateUserService } from "../service/user.service.js";

const userRegisterControler = async (req, res) => {
    try {
        const email = req?.body?.email;
        const existUser = await findUserService({ email: email });
        if (existUser) {
            res.json({ 'error': "Email Already Exist" }).status(400);
        }
        else {
            const user = await createUserService(req.body);
            return res.json({ "message": "register successfully" }).status(200);
        }
    } catch (error) {
        res.json({ error: `Cannot Register at this time` }).status(500);
    }
}

export const getAllUser = async (req, res) => {
    try {
        const existUser = await findAllUserService({
            active: true, user_type:
                { $in: ['manager', 'technician', 'admin'] }
        });
        return res.json({ 
            user : existUser 
        }).status(200);
    } catch (error) {
        res.json({ error: `Cannot Register at this time` }).status(500);
    }
}

const userManagementController = async (req, res) => {
    try {
        const users = await findAllUserService({});
        users.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const updateProfile = async (req, res)=>{
    try {
        delete req.body.active;
        delete req.body.user_type;
        const data = await updateUserService(req.user._id, req.body);
        if (data){
            return res.json({ 'message' : "Updated Successfully!!" }).status(200);
        }
        return res.json({error : "Some Error Occured"}).status(400);
    }
    catch (error){
        return res.json({ error : "Internal Server Error" }).status(400);
    }
}
export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.user_type != 'admin') { return res.status(403).json({ error: "Forbidden: Admins only" }) };
        if (!id) { return res.status(400).json({ error: "User ID is required" }) };
        if (id === req.user._id) { return res.status(400).json({ error: "You cannot update your own profile" }) };
        const updateData = req.body;
        const updatedUser = await updateUserService(id, updateData);
        const session = await updateSessionService({ user: id }, { valid: false });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};






export { userManagementController };
export default userRegisterControler;