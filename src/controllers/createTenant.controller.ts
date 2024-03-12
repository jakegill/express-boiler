import type { Request, Response } from "express";
import { createTenant } from "../services/tenant/createTenant";

const createTenantController = async (req: Request, res: Response) => {

    const { companyName, dbName, adminEmail, adminPassword } = req.body;
    
    try {
        await createTenant({ companyName, dbName, adminEmail, adminPassword });
        res.status(201).send("Tenant created successfully");
    } catch (error) {
        res.status(500).send("Error creating tenant");
    }

}  

export { createTenantController }