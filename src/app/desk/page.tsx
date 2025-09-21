"use client";

import { LogoutButton } from "@/components/buttons/LogoutButton";
import { launchCoder } from "@/components/mini-apps/appMethods";
import { MiniApps } from "@/components/mini-apps/MiniApps";
import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
export default function Home() {
    useEffect(() => {
        //
        launchCoder({
            args: {
                appID: "myapp001",
            },
        });
        //
    }, []);
    return (
        <>
            <div className="relative h-full w-full">
                {/*  */}
                {/*  */}

                <div
                    className="absolute top-[53px] right-0 bottom-[53px] left-0 bg-gradient-to-tr from-red-500 to-violet-500"
                    // style={{
                    //     backgroundImage: `url('/bg/room.jpg')`,
                    //     backgroundSize: "cover",
                    //     backgroundPosition: "center center",
                    // }}
                >
                    {/*  */}
                    <MiniApps></MiniApps>

                    {/*  */}
                </div>

                <div className="absolute top-0 left-0 h-[53px] w-full border-b border-gray-300 bg-white">
                    {/*  */}
                    {/*  */}
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="ml-2"></div>
                        <div className="mr-2"></div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[53px] w-full border-t border-gray-300 bg-white">
                    {/*  */}

                    <div className="flex h-full w-full items-center justify-between">
                        <div className="ml-2"></div>
                        <div className="mr-2">
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
