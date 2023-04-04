import dotenv from "dotenv";
import configureMongoose from "../mongo/mongoConfig";
dotenv.config();
let mongoConnection: typeof import("mongoose");

global.beforeAll(async () => {
    const MONGOTESTURI = process.env.MONGO_URI_TEST || "";
    mongoConnection = await configureMongoose(MONGOTESTURI);
});

global.afterEach(async () => {
    const collections = await mongoConnection.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

global.afterAll(async () => {
    const collections = await mongoConnection.connection.db.collections()
    for (const collection of collections) {
        await collection.drop();
    }
    await mongoConnection.disconnect();
});
