import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async(req, res, next) => {
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

    const user = await User.findById(decoded.id);

    if(!user){
        throw new ApiError(401, "Not authorized, user no longer exists");
    }

    req.user = user;

    next();
})