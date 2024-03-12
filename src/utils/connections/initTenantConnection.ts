import mongoose, { Connection } from "mongoose";
import { MONGO_URI } from "../../config/constants.config";
import { TENANT_CONFIG } from "../../config/database.config";

export const initTenantConnection = async (TENANT_DB_NAME: string): Promise<Connection> => {
    console.log(`Attempting to establish tenant ${TENANT_DB_NAME} connection...`);
    try {
        const db = mongoose.createConnection(`${MONGO_URI}`, {
            ...TENANT_CONFIG,
            dbName: TENANT_DB_NAME,
        });

        db.on("error", console.error.bind(console, "[utils/connections/initTenantConnection] Failed to establish tenant connection: "));

        await new Promise((resolve, reject) => {
            db.once("open", () => {
                console.log("Successfully connected to tenant.");
                resolve(true);
            });
            db.on("error", (error) => {
                console.error("Connection error: ", error);
                reject(error);
            });
        });

        return db;
    } catch (error) {
        console.error("Error in initTenantConnection: ", error);
        throw error;
    }
};