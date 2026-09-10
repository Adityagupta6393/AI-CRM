import mongoose from "mongoose";

const connectDB = async () => {
    const url = `${process.env.MONGO_URI}`;

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