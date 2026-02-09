import jwt from "jsonwebtoken";

export const decodeUser = async () => {
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
    const token = jwt.sign(object);
    return token;
}
