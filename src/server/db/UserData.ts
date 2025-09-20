import { Model, model, Schema } from "mongoose";

import { platformDB, ugcDB } from "./connection";

export interface UserDataInterface {
    //
    _doc: UserDataInterface;
    _id: string;
    //
    userID: string;
    name: string;
}

const UserDataSchema = new Schema<UserDataInterface>(
    {
        name: String,
        userID: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

if (process.env.NODE_ENV === "development") {
    if (platformDB.models["UserDataModel"]) {
        platformDB.deleteModel("UserDataModel");
    }
}

if (!platformDB.models["UserDataModel"]) {
    platformDB.model("UserDataModel", UserDataSchema);
}

export const UserDataModel = platformDB.model(
    "UserDataModel",
) as Model<UserDataInterface>;

//
//
