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
            //
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
export const canEditSpace = async ({
    adminSpaces,
    editorSpaces,
    viewerSpaces,
    workspaceID,
}: {
    adminSpaces: any[];
    editorSpaces: any[];
    viewerSpaces: any[];
    workspaceID: string;
}) => {
    //

    // console.log(adminSpaces, editorSpaces, viewerSpaces);

    let admin = adminSpaces.find((r) => `${r._id}` === workspaceID);
    let editor = editorSpaces.find((r) => `${r._id}` === workspaceID);
    let viewer = viewerSpaces.find((r) => `${r._id}` === workspaceID);

    if (admin) {
        return true;
    }
    if (editor) {
        return true;
    }

    return false;

    //
    //
};

export const canReadSpace = async ({
    adminSpaces,
    editorSpaces,
    viewerSpaces,
    workspaceID,
}: {
    adminSpaces: any[];
    editorSpaces: any[];
    viewerSpaces: any[];
    workspaceID: string;
}) => {
    //

    let admin = adminSpaces.find((r) => `${r._id}` === workspaceID);
    let editor = editorSpaces.find((r) => `${r._id}` === workspaceID);
    let viewer = viewerSpaces.find((r) => `${r._id}` === workspaceID);

    if (admin) {
        return true;
    }
    if (editor) {
        return true;
    }
    if (viewer) {
        return true;
    }

    console.log(admin, editor, viewer, workspaceID);

    return false;

    //
    //
};

export const canAdminSpace = async ({
    adminSpaces,
    editorSpaces,
    viewerSpaces,
    workspaceID,
}: {
    adminSpaces: any[];
    editorSpaces: any[];
    viewerSpaces: any[];
    workspaceID: string;
}) => {
    //

    let admin = adminSpaces.find((r) => `${r._id}` === workspaceID);
    let editor = editorSpaces.find((r) => `${r._id}` === workspaceID);
    let viewer = viewerSpaces.find((r) => `${r._id}` === workspaceID);

    if (admin) {
        return true;
    }
    if (editor) {
        return false;
    }
    if (viewer) {
        return false;
    }

    return false;

    //
    //
};
