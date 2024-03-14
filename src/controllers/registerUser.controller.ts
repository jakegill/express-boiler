import type { Request, Response } from "express";
import { registerUser } from "../services/auth/registerUser";

const registerUserController = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const tenantName = req.tenantName;
	const userRole = req.role;

	//@ts-ignore
	if (userRole !== "superAdmin" || userRole !== "admin") {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		const user = await registerUser({ email, password, tenantName });
		if (!user) {
			throw new Error("registerUser returned null.");
		}
		res.status(201).send("User registered successfully");
	} catch (error) {
		res.status(500).send(`Error registering user: ${error}`);
	}
};

export { registerUserController };
