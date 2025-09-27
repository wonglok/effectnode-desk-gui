"use client";

import { BackButton } from "@/components/buttons/BackButton";
import { LogoutButton } from "@/components/buttons/LogoutButton";
import { ResetButton } from "@/components/buttons/ResetButton";
import { launchCoder } from "@/components/mini-apps/utils/launchCoder";
import { WebGLArea } from "@/components/mini-apps/WebGLArea";
import { api, vanilla } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { TopMenu } from "@/components/menu/TopMenu";
import { useMiniApps } from "@/components/mini-apps/useMiniApps";
import { BrandColors } from "@/components/mini-apps/Objects/BrandColors";

export default function Home() {
    let params = useParams();
    useEffect(() => {
        if (!params.workspaceID) {
            return;
        }
        //
        useMiniApps.setState({
            workspaceID: `${params?.workspaceID || ""}`,
        });
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
                    className="absolute top-[53px] right-0 bottom-[53px] left-0" //bg-gradient-to-tr from-red-200 to-violet-200
                    // style={{
                    //     backgroundImage: `url('/bg/room.jpg')`,
                    //     backgroundSize: "cover",
                    //     backgroundPosition: "center center",
                    // }}
                    style={{
                        backgroundColor: `#${BrandColors.background.getHexString()}`,
                    }}
                >
                    <WebGLArea key={`${params.workspaceID}`}></WebGLArea>
                </div>

                <div className="absolute top-0 left-0 h-[53px] w-full border-b border-gray-300 bg-white">
                    {/*  */}
                    {/*  */}
                    <div className="flex h-full w-full items-center justify-between select-none">
                        <div className="ml-4 select-none">
                            <BackButton
                                workspaceID={params?.workspaceID as string}
                            ></BackButton>
                        </div>
                        <div className="mx-4 select-none">
                            <TopMenu></TopMenu>
                        </div>
                        <div className="mr-4 select-none">
                            <ResetButton
                                workspaceID={params?.workspaceID as string}
                            ></ResetButton>
                        </div>
                    </div>
                </div>

                {/*  */}

                <div className="absolute bottom-0 left-0 h-[53px] w-full border-t border-gray-300 bg-white">
                    {/*  */}

                    <div className="flex h-full w-full items-center justify-between">
                        <div className="ml-4 select-none">
                            <LogoutButton></LogoutButton>
                        </div>
                        <div className="mx-1 flex w-1/3 items-center justify-center select-none">
                            {/* <AddCard
                                workspaceID={params?.workspaceID as string}
                            ></AddCard> */}
                        </div>
                        <div className="mr-4 select-none">
                            {/*  */}
                            {/*  */}
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
