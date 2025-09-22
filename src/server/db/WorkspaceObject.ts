import { Model, model, Schema } from "mongoose";

import { platformDB, ugcDB } from "./connection";

export interface WorkspaceObjectInterface {
    //
    _doc: WorkspaceObjectInterface;
    _id: string;
    //
    workspaceID: string;
    //
    type: string;
    //
    key: string;
    value: any;
}

const WorkspaceObjectSchema = new Schema<WorkspaceObjectInterface>(
    {
        workspaceID: String,
        type: {
            type: String,
            default() {
                return "default";
            },
        },
        key: String,
        value: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

if (process.env.NODE_ENV === "development") {
    if (platformDB.models["WorkspaceObjectModel"]) {
        platformDB.deleteModel("WorkspaceObjectModel");
    }
}

if (!platformDB.models["WorkspaceObjectModel"]) {
    platformDB.model("WorkspaceObjectModel", WorkspaceObjectSchema);
}

export const WorkspaceObjectModel = platformDB.model(
    "WorkspaceObjectModel",
) as Model<WorkspaceObjectInterface>;

//
//
//
