import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import {notFound, errorHandler} from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
const app = express();


if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
    res.json({ success: true, status:"ok", services: "API is running" });
});


app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();

export default app;