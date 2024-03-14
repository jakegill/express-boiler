import { getConnection } from "../tenant/connectionManager";
import { userMetadataSchema } from "../../models/userMetadataSchema";
import { tenantUserSchema } from "../../models/tenantUserSchema";


type registerInput = {
    email: string;
    password: string;
    companyName: string;
    role: "owner" | "admin" | "management" | "inspector";
}


const registerUser = async ({ email, password, companyName, role } : registerInput) => {

    // Get connection from cache.
    const catalog = getConnection("Catalog");
    if (!catalog) {
        throw new Error("Catalog connection not established.");
    }

    // Create user metadata in catalog.
    const user = await catalog.model("User", userMetadataSchema).create({ email, password, companyName, role });
    if (!user) {
        throw new Error("User not created.");
    }
    const userId = user._id;

    // Establish connection to tenant db.
    const tenantDb = getConnection(companyName);
    if (!tenantDb) {
        throw new Error("Tenant connection not established.");
    }

    // Store userId in tenant db.
    await tenantDb.model("User", tenantUserSchema).create({ _id: userId});

    return user;
}

export { registerUser }
