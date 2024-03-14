import { registerUser } from "../../../src/services/auth/registerUser";

jest.mock("../../../src/services/tenant/connectionManager", () => ({
	getConnection: jest.fn().mockImplementation((dbName) => {
		if (dbName === "Catalog") {
			return {
				model: jest.fn().mockReturnValue({
					create: jest.fn().mockResolvedValue({
						_id: "userId",
						email: "test@example.com",
						password: "hashedPassword",
						tenantName: "tenantName",
					}),
				}),
			};
		} else {
			return {
				model: jest.fn().mockReturnValue({
					create: jest.fn().mockResolvedValue({ _id: "userId" }),
				}),
			};
		}
	}),
}));

describe("registerUser", () => {
	it("Successfully registers a user and creates metadata in the catalog and tenant db", async () => {
		const user = await registerUser({
			email: "test@example.com",
			password: "password",
			tenantName: "tenantName",
		});

		expect(user).toBeDefined();
		expect(user).toHaveProperty("_id", "userId");
		expect(user).toHaveProperty("email", "test@example.com");
		expect(user).toHaveProperty("tenantName", "tenantName");
	});

	it("Throws an error if catalog connection is not established", async () => {
		require("../../../src/services/tenant/connectionManager").getConnection.mockImplementationOnce(
			() => null
		);

		await expect(
			registerUser({
				email: "test@example.com",
				password: "password",
				tenantName: "tenantName",
			})
		).rejects.toThrow("Catalog connection not established.");
	});

	it("Throws an error if user is not created in the catalog", async () => {
		require("../../../src/services/tenant/connectionManager").getConnection.mockReturnValueOnce(
			{
				model: jest.fn().mockReturnValue({
					create: jest.fn().mockResolvedValue(null),
				}),
			}
		);

		await expect(
			registerUser({
				email: "test@example.com",
				password: "password",
				tenantName: "tenantName",
			})
		).rejects.toThrow("User not created.");
	});
});
