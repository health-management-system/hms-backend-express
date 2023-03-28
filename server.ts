import dotenv from "dotenv";
import { app } from "./app";
import configureMongoose from "./mongo/mongoConfig";


dotenv.config();

async function startServer() {
    // environment variables
    const PORT = process.env.PORT;
    const MONGO_URI = process.env.MONGO_URI;

    // mongoose configuration
    await configureMongoose(MONGO_URI || "");

    app.listen(PORT, () => {
        console.log(
            `⚡️[server]: Server is running at http://localhost:${PORT}`
        );
    });
}

startServer();
