import { getConnection } from "../tenant/connectionManager";
import { userMetadataSchema } from "../../models/userMetadataSchema";
import { tenantUserSchema } from "../../models/tenantUserSchema";

type registerInput = {
	email: string;
	password: string;
	tenantName: string;
};

const registerUser = async ({ email, password, tenantName }: registerInput) => {
	// Get connection from cache.
	const catalog = getConnection("Catalog");
	if (!catalog) {
		throw new Error("Catalog connection not established.");
	}

	// Create user metadata in catalog.
	const user = await catalog.model("User", userMetadataSchema).create({ email, password, tenantName });
	if (!user) {
		throw new Error("User not created.");
	}
	const userId = user._id;

	// Store userId in tenant db.
	const tenantDb = getConnection(tenantName);
	await tenantDb.model("User", tenantUserSchema).create({ _id: userId });

	return user;
};

export { registerUser };
