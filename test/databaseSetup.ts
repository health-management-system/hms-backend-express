import dotenv from "dotenv";
import configureMongoose from "../mongo/mongoConfig";
dotenv.config();
let mongoConnection: typeof import("mongoose");

beforeAll(async () => {
    const MONGOTESTURI = process.env.MONGO_URI_TEST || "";
    mongoConnection = await configureMongoose(MONGOTESTURI);
});

afterEach(async () => {
    const collections = await mongoConnection.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    const collections = await mongoConnection.connection.db.collections();
    for (const collection of collections) {
        await collection.drop();
    }
    await mongoConnection.disconnect();
});
