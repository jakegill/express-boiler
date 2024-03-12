import mongoose from "mongoose";

export const tentantSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    dbUri: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});
