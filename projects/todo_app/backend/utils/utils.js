import jwt from "jsonwebtoken";

export const decodeUser = async (token) => {
    try {
        const decode = jwt.decode(token);
        return {
            decode,
            valid: true,
            success: true
        }
    } catch (error) {
        return {
            decode,
            valid: false,
            success: false
        }
    }
}

export const encodeUser = async (object) => {
    const token = jwt.sign(object, "my_private_key");
    return token;
}
