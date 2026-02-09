export const reqireUser = async (req, res, next)=>{
    try {
        if (!req.user){
            return res.json({error : "Unauthorize User"});
        }
        next();
    } catch (error) {
        return res.json({
            error : "Bad Request"
        });
    }
}