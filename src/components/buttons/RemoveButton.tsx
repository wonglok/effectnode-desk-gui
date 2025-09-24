import { vanilla } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useMiniApps } from "../mini-apps/useMiniApps";

export function RemoveButton({ workspaceID = "" }) {
    return (
        <Button
            onClick={async () => {
                if (window.confirm("remove all?")) {
                    await vanilla.object.removeAll.mutate({
                        workspaceID: `${workspaceID}`,
                    });
                    await vanilla.object.readAll
                        .mutate({
                            workspaceID: `${workspaceID}`,
                        })
                        .then((objects) => {
                            useMiniApps.setState({
                                objects: objects,
                            });
                        });
                }
            }}
            variant={"destructive"}
        >
            Remove All
        </Button>
    );
}
