import { getConnection, setConnection } from "./connectionManager";
import { initTenantConnection } from "../../utils/connections/initTenantConnection";
import { tenantSchema } from "../../models/tenantSchema";
import { userSchema } from "../../models/userSchema";

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
    await catalogDb.model("Tenant", tenantSchema, "tenants").create({ companyName, dbName: companyName });
    
    const tenantDb = await initTenantConnection(companyName);
    await tenantDb.model("User", userSchema, "users").create({ email: adminEmail, password: adminPassword, role: "owner" });
    setConnection(companyName, tenantDb);
};

export { createTenant };