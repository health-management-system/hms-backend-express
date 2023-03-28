import mongoose from "mongoose";

async function configureMongoose(mongoUri:string) {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri).catch((err) => {
        console.error(
            "Something went wrong while trying to connect to mongodb server: ",
            err
        );
    });
    return mongoose
}

export default configureMongoose;
