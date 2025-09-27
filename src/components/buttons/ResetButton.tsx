import { vanilla } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useMiniApps } from "../mini-apps/useMiniApps";
import { launchCoder } from "../mini-apps/utils/launchCoder";
import { Crosshair, CrossIcon, FactoryIcon, MinusIcon } from "lucide-react";
import type { WorkspaceObjectInterface } from "@/server/db/WorkspaceObject";

export function ResetButton({ workspaceID = "" }) {
    return (
        <Button
            onClick={async () => {
                if (window.confirm("remove all?")) {
                    //

                    await vanilla.object.removeAll.mutate({
                        workspaceID: `${workspaceID}`,
                    });

                    //

                    await vanilla.object.readAll
                        .mutate({
                            workspaceID: `${workspaceID}`,
                        })
                        .then((objects) => {
                            useMiniApps.setState({
                                objects: objects as WorkspaceObjectInterface[],
                            });
                        });

                    await launchCoder({
                        workspaceID: `${workspaceID}`,
                        args: {
                            //
                            // appID: "myapp001",
                            //
                        },
                    });

                    //
                }
            }}
            variant={"destructive"}
            className="w-full cursor-pointer"
            //
        >
            <Crosshair className="mr-1"></Crosshair> Reset Button
        </Button>
    );
}

//
//
//
//
//
//
