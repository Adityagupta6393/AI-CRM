import { ApiError } from "../utils/ApiError";
import { asynchandler } from "../utils/asyncHandler";
import User from "../models/User.js"

export const protech = asynchandler(async(req, res, next) => {
    let token;
    const header = req.headers.authorization;

    if(header && header.startsWith("Bearer ")){
        token = header.split(" ")[1];
    }

    if(!token){
        throw new ApiError(401, "Not authorized, no token provided");
    }

    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch{
        throw new ApiError(401, "Not authorized, token expired or invalid");
    }

    const user = User.findById(decoded.id);

    if(!user){
        throw new ApiError(401, "Not authorized, user no longer exists");
    }

    req.user = user;

    next();
})