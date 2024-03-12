import { server } from "./config/server.config";
import { setupDatabase } from "./config/database.config";
import { PORT } from "./config/constants.config";

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await setupDatabase();
});