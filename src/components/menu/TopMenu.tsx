import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { vanilla } from "@/trpc/react";
import { useEffect } from "react";
import { useMiniApps } from "../mini-apps/useMiniApps";
import { Button } from "../ui/button";
import { GoalIcon, HomeIcon, Icon, LampDeskIcon, PenIcon } from "lucide-react";
import type { WorkspaceObjectInterface } from "@/server/db/WorkspaceObject";
import type { WorkspaceACLInterface } from "@/server/db/WorkspaceACL";
import { useRouter } from "next/navigation";
import { Rename } from "./Rename";

export function TopMenu({}) {
    let router = useRouter();
    let workspaces = useMiniApps((r) => r.workspaces);
    let workspaceID = useMiniApps((r) => r.workspaceID);
    useEffect(() => {
        vanilla.acl.listMy.mutate({}).then((data: WorkspaceACLInterface[]) => {
            useMiniApps.setState({
                workspaces: data,
            });
        });
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <div className="flex items-center justify-center">
                            <LampDeskIcon className="mr-2"></LampDeskIcon>

                            {workspaces?.find((r) => r._id === workspaceID)
                                ?.name || "Workspaces..."}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Desks</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {workspaces.map((work) => {
                        return (
                            <DropdownMenuItem
                                key={work._id}
                                onClick={() => {
                                    //
                                    router.push(`/desk/workspace/${work._id}`);
                                    //
                                }}
                            >
                                <div className="flex items-center justify-center">
                                    <LampDeskIcon className="mr-2"></LampDeskIcon>
                                    {`${work.name}`}
                                </div>
                            </DropdownMenuItem>
                        );
                    })}

                    <DropdownMenuItem
                        onClick={() => {
                            //
                        }}
                    >
                        <PenIcon></PenIcon>
                        {`Edit Workspace Settings`}
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>
                        <HomeIcon></HomeIcon>
                        Team
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <HomeIcon></HomeIcon>
                        Home
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
