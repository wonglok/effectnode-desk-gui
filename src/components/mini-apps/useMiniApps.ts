import { create } from "zustand";
export const useMiniApps = create(() => {
    return {
        //
        apps: [
            {
                appID: `app._____`,
                name: `AI Coder`,
            },
        ],
        appProjects: [
            {
                appID: "app._____",
                appProjectID: `appProject._____`,
                name: ``,
            },
        ],
        wins: [
            {
                appProjectID: `appProject._____`,
                winID: `win._____`,
                name: "",
            },
        ],
    };
});
