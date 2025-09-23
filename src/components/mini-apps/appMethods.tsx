// import { useMiniApps, type MiniAppType, type WindowType } from "./useMiniApps";
import { vanilla } from "@/trpc/react";
import { useMiniApps } from "./useMiniApps";

export const nameSpace = (v: String) => {
    return `${process.env.APP_NAME}_${v}`;
};
export async function launchCoder({ workspaceID = "", args = {} }) {
    //
    {
        let objects = await vanilla.object.readAll.mutate({
            workspaceID: workspaceID,
        });

        useMiniApps.setState((st) => {
            return {
                ...st,
                objects: objects,
            };
        });

        if (!objects.some((r) => r.key === `${nameSpace("app_coder")}`)) {
            await vanilla.object.write.mutate({
                type: "apps",
                workspaceID: `${workspaceID}`,
                key: `${nameSpace("app_coder")}`,
                value: {
                    ...args,
                    name: `App Coder`,
                },
            });
        }

        if (!objects.some((r) => r.key === `${nameSpace("node_window")}`)) {
            await vanilla.object.write.mutate({
                type: "wins",
                workspaceID: `${workspaceID}`,
                key: `${nameSpace("node_window")}`,
                value: {
                    ...args,
                    appID: `${nameSpace("app_coder")}`,
                    name: `Node Window`,
                    position: [0, 0, 0],
                    quaternion: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                },
            });
        }
        if (!objects.some((r) => r.key === `${nameSpace("preview_window")}`)) {
            await vanilla.object.write.mutate({
                type: "wins",
                workspaceID: `${workspaceID}`,
                key: `${nameSpace("preview_window")}`,
                value: {
                    ...args,
                    appID: `${nameSpace("app_coder")}`,
                    name: `Preview Window`,
                    position: [0, 0, 0],
                    quaternion: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                },
            });
        }
    }

    {
        let objects = await vanilla.object.readAll.mutate({
            workspaceID: workspaceID,
        });

        console.log(objects);

        useMiniApps.setState((st) => {
            return {
                ...st,
                objects: objects,
            };
        });
    }
}
