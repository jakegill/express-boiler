import { initCatalogConnection } from "./initCatalogConnection";
import { initTenantConnection } from "./initTenantConnection";
import type { Connection } from "mongoose";
import { tenantSchema } from "../../models/tenantSchema";

const connectAllDb = async () => {

    // Connect to catalog
    const catalog: Connection = await initCatalogConnection();
    const tenantsMetadata = await catalog.model("Tenant", tenantSchema, "tenants").find({}).exec();

    // Connect to tenants
    tenantsMetadata.forEach(async (tenant: any) => {
        const tenantDb: Connection = await initTenantConnection(tenant.dbUri);
        console.log(`Connected to tenant: ${tenant.dbUri}`);
    });

    //Consider lazy loading connections?
};

export { connectAllDb };