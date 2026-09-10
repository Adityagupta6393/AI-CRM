import {ApiError} from "../utils/ApiError.js";

//404 handler for unmatched routes
export const notFound = (req, res, next) => {
    next(new ApiError(404, `Route not found : ${req.method} ${req.originalUrl}`));
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    //Mongoose: bad ObjectId
    if(err.name === "CastError"){
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    //Mongoose: duplicate key (e.q. email already registered)
    if(err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue ||{})[0] || "field";
        message = `A record with that ${field} already exists.`;
    }

    if(err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }

    if(process.env.NODE_ENV === "production" && statusCode === 500) {
        console.error("💥", err);
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== "production" && statusCode === 500 ? {stack: err.stack} : {}),

    })
}
