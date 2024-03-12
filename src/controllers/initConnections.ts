import { connectAllDb } from "../utils/connections/connectionManager";

export const initConnections = async () => {
    await connectAllDb();
};