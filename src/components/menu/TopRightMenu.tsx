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
import {
    GoalIcon,
    HomeIcon,
    Icon,
    LampCeilingIcon,
    LampDeskIcon,
    Loader,
    PenIcon,
    Settings2Icon,
    SettingsIcon,
} from "lucide-react";
import type { WorkspaceObjectInterface } from "@/server/db/WorkspaceObject";
import type { WorkspaceACLInterface } from "@/server/db/WorkspaceACL";
import { useRouter } from "next/navigation";
import { SettingsDialog } from "./DeskSettings";
import { DialogTrigger } from "../ui/dialog";
import { ResetButton } from "../buttons/ResetButton";
// import { Rename } from "./Rename";

export function TopRightMenu({}) {
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

    let name: any = false;
    if (workspaces?.find((r) => r._id === workspaceID)?.name) {
        name = (
            <>
                <LampDeskIcon className="mr-2"></LampDeskIcon>
                {workspaces?.find((r) => r._id === workspaceID)?.name}
            </>
        );
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <div className="flex items-center justify-center">
                            {name || (
                                <>
                                    <Loader className="animate-spin"></Loader>
                                </>
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <ResetButton
                        workspaceID={workspaceID as string}
                    ></ResetButton>

                    <>
                        <DropdownMenuItem
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <SettingsIcon className="animate-spin"></SettingsIcon>
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
