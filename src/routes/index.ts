import { Router } from "express";
import { connectAllDb } from "../utils/connections/connectionManager";

const router = Router();

/* ---------- Tenant Management ---------- */

router.get("/api/v1/tenants", connectAllDb)
router.post("/api/v1/tenants")

router.get("/api/v1/tenants/:id")
router.put("/api/v1/tenants/:id")
router.delete("/api/v1/tenants/:id")

/* ----------  ---------- */

export { router }
