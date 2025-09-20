import { create } from "zustand";

export type IconType = { _id: string; name: string; url: string };

export type MiniAppType = { _id: string; name: string; args: any };

export type WindowType = {
    _id: string;
    args: any;
    appID: string;
    name: string;
    quaternion: [number, number, number, number];
    position: [number, number, number];
    scale: [number, number, number];
};

//

export const useMiniApps = create<{
    //
    icons: IconType[];
    apps: MiniAppType[];
    wins: WindowType[];
}>(() => {
    return {
        //
        icons: [],
        apps: [],
        wins: [],
    };
});
