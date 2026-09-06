import mongoose from "mongoose";
import {databaseName} from "./constants.js";

const connectDB = async () => {
    const url = `${process.env.MONGO_URI}/${databaseName}`;

    if(!url) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(url, {
        serverSelectionTimeoutMS: 1000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    return conn;
}

export default connectDB;