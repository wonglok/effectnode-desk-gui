import md5 from "md5";
import { useMiniApps, type MiniAppType, type WindowType } from "./useMiniApps";
import { v4 } from "uuid";

export function launchCoder({ args = {} }) {
    let state = useMiniApps.getState();
    let newApp: MiniAppType = {
        _id: `${md5(v4())}`,
        name: `App Coder`,
        args: {
            ...args,
        },
    };

    let nodeWin: WindowType = {
        _id: `${md5(v4())}`,
        appID: newApp._id,
        name: `Node Window`,
        args: {
            ...args,
        },
        position: [0, 0, 0],
        scale: [1, 1, 1],
        quaternion: [0, 0, 0, 1],
    };

    let previewWin: WindowType = {
        _id: `${md5(v4())}`,
        appID: newApp._id,
        name: `Preview Window`,
        args: {
            ...args,
        },
        position: [0, 0, 0],
        scale: [1, 1, 1],
        quaternion: [0, 0, 0, 1],
    };

    //

    useMiniApps.setState({
        //
        apps: [...state.apps, newApp],
        wins: [...state.wins, nodeWin, previewWin],
        //
    });

    //
}
