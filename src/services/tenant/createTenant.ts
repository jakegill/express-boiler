import { getConnection, setConnection } from "./connectionManager";
import { initTenantConnection } from "../../utils/connections/initTenantConnection";
import { tenantMetadataSchema } from "../../models/tenantMetadataSchema";
import { userMetadataSchema } from "../../models/userMetadataSchema";
import { tenantUserSchema } from "../../models/tenantUserSchema";  

type createTenantInput = {
    companyName: string;
    dbName: string;
    adminEmail: string;
    adminPassword: string;
};

/*
Use connection from cache to the access catalog database.
Create a new tenant document in the catalog.tenants collection using dbName, & companyName.
Create a new connection using dbName for the new database.
Create a new user document in the users collection of the new tenant db using adminEmail, & adminPassword.
Set the new tenant connection in the connection cache.
*/

const createTenant = async ({companyName, dbName, adminEmail, adminPassword} : createTenantInput) => {
    const catalogDb = getConnection("Catalog");
    await catalogDb.model("Tenant", tenantMetadataSchema, "tenants").create({ companyName, dbName: companyName });
    const owner = await catalogDb.model("User", userMetadataSchema, "users").create({ companyName, email: adminEmail, password: adminPassword, role: "owner"});
    const ownerId = owner._id;
    
    const tenantDb = await initTenantConnection(companyName);
    try {
        await tenantDb.model("TenantUser", tenantUserSchema, "users").create({ _id: ownerId });
    } catch (error) {
        console.error("Error creating new database: ", error);
        throw error;
    }
    finally {
        console.log("Database created... setting connection in cache.")
        setConnection(companyName, tenantDb);
    }
};

export { createTenant };