import type { WorkspaceObjectInterface } from "@/server/db/WorkspaceObject";
import { create } from "zustand";

export type IconType = { _id: string; name: string; url: string };

// export type WorkspaceObjectInterface = { _id: string; name: string; args: any };

// export type WindowType = {
//     _id: string;
//     args: any;
//     appID: string;
//     name: string;
//     quaternion: [number, number, number, number];
//     position: [number, number, number];
//     scale: [number, number, number];
// };

export type AppObject = Partial<WorkspaceObjectInterface> & {
    value: {
        appID: string;
        metadata: {};
    };
};

export type WinObject = Partial<WorkspaceObjectInterface> & {
    value: {
        appID: string;
        metadata: {};
        position: [number, number, number];
        scale: [number, number, number];
        quaternion: [number, number, number, number];
    };
};

//

export const useMiniApps = create<{
    //
    objects: WorkspaceObjectInterface[];
    //
    //
}>((set, get) => {
    //
    return {
        //
        objects: [],

        // icons: [],
        // apps: [],
        // wins: [],
    };
});

export const useApps = () => {
    let objects = useMiniApps((r) => r.objects);
    return objects.filter((r) => r.type === "apps");
};

export const useWins = () => {
    let objects = useMiniApps((r) => r.objects);
    return objects.filter((r) => r.type === "wins");
};
