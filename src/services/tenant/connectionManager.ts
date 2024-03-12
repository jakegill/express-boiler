import type { Connection } from "mongoose";
import { tenantSchema } from "../../models/tenantSchema";
import { initCatalogConnection } from "../../utils/connections/initCatalogConnection";
import { initTenantConnection } from "../../utils/connections/initTenantConnection";

/*
Establishes connections to catalog & tenants.
Caches connections for reuse.
Exports functions to retrieve connections.
*/

let connectionCache: Record<string, Connection> = {};

const connectAllDb = async () => {

    // Establish & cache catalog connection.
    const catalog: Connection = await initCatalogConnection();
    connectionCache["Catalog"] = catalog;
    const tenantsMetadata = await catalog.model("Tenant", tenantSchema, "tenants").find({}).exec();

    // Establish & cache tenants connections.
    for (const tenant of tenantsMetadata) {
        const tenantDb: Connection = await initTenantConnection(tenant.dbName);
        connectionCache[tenant.companyName] = tenantDb;
    }
};

const getConnection = (key: string): Connection => {
    return connectionCache[key];
}

const getAllConnections = (): Record<string, Connection> => {
    return { ...connectionCache };
}

const setConnection = (key: string, connection: Connection) => {
    connectionCache[key] = connection;
}

export { connectAllDb, getConnection, setConnection, getAllConnections};