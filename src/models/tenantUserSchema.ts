import mongoose from "mongoose";

export const tenantUserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {strict: false});

