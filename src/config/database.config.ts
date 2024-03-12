import mongoose from "mongoose";
import { MONGO_URI } from "./constants.config";

export const setupDatabase = async (): Promise<void> => {
        console.log("Attempting to connect to MongoDB...")
        await mongoose.connect(MONGO_URI, {
            autoIndex: true,
            socketTimeoutMS: 15000,
        }).then(() => {
            console.log("MongoDB connection established.");
        }).catch((error) => {
            console.error("MongoDB connection error in setupDatabase:", error);
        });
}