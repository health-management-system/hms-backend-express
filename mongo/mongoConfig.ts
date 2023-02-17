import mongoose from "mongoose";

async function configureMongoose() {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI || "").catch((err) => {
        console.error(
            "Something went wrong while trying to connect to mongodb server: ",
            err
        );
    });
}

export default configureMongoose;
