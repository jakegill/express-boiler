import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	tenantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tenant",
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "management", "inspector"],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);

