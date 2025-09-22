import { Model, model, Schema } from "mongoose";

import { platformDB, ugcDB } from "./connection";

export interface WorkspaceACLInterface {
    //
    _doc: WorkspaceACLInterface;
    _id: string;
    //
    name: string;
    members: {
        name: string;
        userID: string;
        email: string;
        role: string;
    }[];
}

const WorkspaceACLSchema = new Schema<WorkspaceACLInterface>(
    {
        name: String,
        members: [
            {
                name: String,
                userID: String,
                email: String,
                role: String, // admin / editor / viewer
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

if (process.env.NODE_ENV === "development") {
    if (platformDB.models["WorkspaceACLModel"]) {
        platformDB.deleteModel("WorkspaceACLModel");
    }
}

if (!platformDB.models["WorkspaceACLModel"]) {
    platformDB.model("WorkspaceACLModel", WorkspaceACLSchema);
}

export const WorkspaceACLModel = platformDB.model(
    "WorkspaceACLModel",
) as Model<WorkspaceACLInterface>;

//
//
//
