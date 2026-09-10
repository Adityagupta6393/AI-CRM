import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import {notFound, errorHandler} from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";
//Routes
import authRoutes from "./routes/auth.route.js";

const app = express();

if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({ success: true, status:"ok", services: "API is running" });
});

app.use("/api/auth", authRoutes);

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