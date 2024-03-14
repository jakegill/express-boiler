import type { Request, Response } from "express";
import { createTenant } from "../services/tenant/createTenant";

const createTenantController = async (req: Request, res: Response) => {
	const { tenantName, adminEmail, adminPassword } = req.body;
	const role = req.role;

	if (role !== "superAdmin") {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		await createTenant({ tenantName, adminEmail, adminPassword });
		res.status(201).send("Tenant created successfully");
	} catch (error) {
		res.status(500).send("Error creating tenant");
	}
};

export { createTenantController };
