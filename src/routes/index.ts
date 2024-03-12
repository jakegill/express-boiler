import { Router } from "express";
import { createTenantController } from "../controllers/createTenant.controller";

const router = Router();

/* ---------- Tenant Management ---------- */

router.post("/api/v1/tenants", createTenantController)

router.get("/api/v1/tenants/:id")
router.put("/api/v1/tenants/:id")
router.delete("/api/v1/tenants/:id")

/* ----------  ---------- */

export { router }
