import mongoose from "mongoose";

let globalWithMongo = global as typeof globalThis & {
    _mongoClientPlatform?: any;
    _mongoClientUGC?: any;
};

globalWithMongo._mongoClientPlatform =
    globalWithMongo._mongoClientPlatform ||
    mongoose
        .createConnection(process.env.MONGO_SYSTEM as string, {
            //
            appName: "platform",
            retryWrites: true,
            writeConcern: {
                w: "majority",
            },
        })
        .useDb(`${process.env.APP_NAME}_${process.env.NODE_ENV}_platform_DB`);

globalWithMongo._mongoClientUGC =
    globalWithMongo._mongoClientUGC ||
    mongoose
        .createConnection(process.env.MONGO_UGC as string, {
            //
            appName: "platform",
            retryWrites: true,
            writeConcern: {
                w: "majority",
            },
        })
        .useDb(`${process.env.APP_NAME}_${process.env.NODE_ENV}_ugc_DB`);

export const platformDB = globalWithMongo._mongoClientPlatform;
export const ugcDB = globalWithMongo._mongoClientUGC;
