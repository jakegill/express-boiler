import mongoose from "mongoose";

export const tenantMetadataSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    dbName: {
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
