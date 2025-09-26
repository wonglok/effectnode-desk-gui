import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { vanilla } from "@/trpc/react";
import { useEffect, useState } from "react";
import { useMiniApps } from "../mini-apps/useMiniApps";
import { Button } from "../ui/button";
import { GoalIcon, HomeIcon, Icon, LampDeskIcon, PenIcon } from "lucide-react";
import type { WorkspaceObjectInterface } from "@/server/db/WorkspaceObject";
import type { WorkspaceACLInterface } from "@/server/db/WorkspaceACL";
import { useRouter } from "next/navigation";
import { SettingsDialog } from "./DeskSettings";
import { DialogTrigger } from "../ui/dialog";
// import { Rename } from "./Rename";

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
    const [open, setOpen] = useState(false);

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
                    <>
                        <DropdownMenuItem
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <PenIcon></PenIcon>
                            {`Edit Workspace Settings`}
                        </DropdownMenuItem>
                    </>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>My Own & Shared Desks</DropdownMenuLabel>

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

            <SettingsDialog open={open} setOpen={setOpen}></SettingsDialog>
        </>
    );
}
