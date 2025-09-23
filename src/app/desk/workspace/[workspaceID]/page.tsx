"use client";

import { LogoutButton } from "@/components/buttons/LogoutButton";
import { launchCoder } from "@/components/mini-apps/appMethods";
import { MiniApps } from "@/components/mini-apps/MiniApps";
import { useMiniApps } from "@/components/mini-apps/useMiniApps";
import { WebGLArea } from "@/components/mini-apps/WebGLArea";
import { Button } from "@/components/ui/button";
import { vanilla } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
    let params = useParams();
    useEffect(() => {
        if (!params.workspaceID) {
            return;
        }
        //
        launchCoder({
            workspaceID: `${params.workspaceID}`,
            args: {
                appID: "myapp001",
            },
        });
        // //
    }, [params.workspaceID]);

    return (
        <>
            <div className="relative h-full w-full">
                {/*  */}
                {/*  */}

                <div
                    className="absolute top-[53px] right-0 bottom-[53px] left-0 bg-gradient-to-tr from-red-200 to-violet-200"
                    // style={{
                    //     backgroundImage: `url('/bg/room.jpg')`,
                    //     backgroundSize: "cover",
                    //     backgroundPosition: "center center",
                    // }}
                >
                    {/*  */}
                    <WebGLArea></WebGLArea>
                    {/*  */}
                </div>

                <div className="absolute top-0 left-0 h-[53px] w-full border-b border-gray-300 bg-white">
                    {/*  */}
                    {/*  */}
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="ml-4">111</div>
                        <div className="mr-4">
                            <Button
                                onClick={async () => {
                                    await vanilla.object.removeAll.mutate({
                                        workspaceID: `${params.workspaceID}`,
                                    });
                                    await vanilla.object.readAll
                                        .mutate({
                                            workspaceID: `${params.workspaceID}`,
                                        })
                                        .then((objects) => {
                                            useMiniApps.setState({
                                                objects: objects,
                                            });
                                        });
                                }}
                            >
                                Remove All
                            </Button>
                        </div>
                    </div>
                </div>

                {/*  */}

                <div className="absolute bottom-0 left-0 h-[53px] w-full border-t border-gray-300 bg-white">
                    {/*  */}

                    <div className="flex h-full w-full items-center justify-between">
                        <div className="ml-4"></div>
                        <div className="mr-4">
                            <LogoutButton></LogoutButton>
                        </div>
                    </div>

                    {/*  */}
                </div>
            </div>

            {/*  */}
            {/*  */}
        </>
    );
}
