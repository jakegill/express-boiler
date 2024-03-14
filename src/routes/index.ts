import { Router } from "express";
import { createTenantController } from "../controllers/createTenant.controller";
import { loginUserController } from "../controllers/loginUser.controller";
import { registerUserController } from "../controllers/registerUser.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { resolveTenancy } from "../middleware/resolveTenancy.middleware";
import { resolveRole } from "../middleware/resolveRole.middleware";

const router = Router();

/* ---------- Tenant Management ---------- */

router.post("/api/v1/tenants", authMiddleware, resolveRole, createTenantController)

router.get("/api/v1/tenants/:id")
router.put("/api/v1/tenants/:id")
router.delete("/api/v1/tenants/:id")

/* ---------- Login & Registration ---------- */

router.post("/api/v1/auth/login", loginUserController)
router.post("/api/v1/auth/register", authMiddleware, resolveTenancy, resolveRole, registerUserController)


export { router }
