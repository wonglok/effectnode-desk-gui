"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Cloud,
    Environment,
    Float,
    Gltf,
    PerspectiveCamera,
    Sky,
    Sphere,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
// import {
//     Asterisk,
//     AsteriskSquare,
//     BadgeCheck,
//     CheckIcon,
//     LogInIcon,
//     PenIcon,
//     ShieldCheckIcon,
// } from "lucide-react";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Laptop } from "@/components/login/Laptop";
import { api, vanilla } from "@/trpc/react";
import { Loader } from "lucide-react";
import { AvatarMotion } from "@/components/mini-apps/Objects/AvatarMotion";
import { cursor, Grid } from "@/components/mini-apps/Objects/Grid";

export default function Page() {
    return (
        <>
            <div className="relative h-full w-full">
                <div className="absolute top-0 left-0 h-full w-full">
                    <Canvas>
                        {/*  */}

                        <EffectComposer>
                            <Bloom></Bloom>
                        </EffectComposer>

                        <Sky rayleigh={0.1} azimuth={-0.5 * Math.PI}></Sky>

                        <ambientLight intensity={Math.PI}></ambientLight>

                        <group scale={5} position={[0, 4, 0]}>
                            <Float floatIntensity={3}>
                                <Cloud
                                    color={"#cccccc"}
                                    position={[0, -4.0, -2.5]}
                                ></Cloud>
                            </Float>
                            <Suspense fallback={null}>
                                <Gltf
                                    onPointerMove={(ev) => {
                                        cursor.copy(ev.point);

                                        (cursor as any).force = true;
                                        console.log(ev.point.toArray());
                                    }}
                                    scale={1.5}
                                    rotation={[0, Math.PI * 0.0, 0]}
                                    position={[0, -3, 0]}
                                    src={`/login/desk-v1.glb`}
                                ></Gltf>
                                <group
                                    scale={0.3}
                                    rotation={[0, Math.PI * 0, 0]}
                                    position={[0, -1.5, 0.3]}
                                >
                                    <Laptop
                                        screen={
                                            <>
                                                <Sky></Sky>
                                                <Cloud
                                                    position={[0, 0, 0]}
                                                ></Cloud>
                                                <ambientLight
                                                    intensity={Math.PI / 2}
                                                ></ambientLight>

                                                <group position={[0, -5, 0]}>
                                                    {/* <Grid magic></Grid> */}
                                                </group>
                                            </>
                                        }
                                    ></Laptop>
                                </group>
                                <Environment
                                    files={[
                                        `/hdr/aerodynamics_workshop_1k.hdr`,
                                    ]}
                                ></Environment>
                            </Suspense>
                        </group>

                        <AvatarMotion
                            rotation={[0, -0.4, 0]}
                            position={[3, -2.5, 0]}
                            scale={2}
                            lookAt={[-1, 0.5, 5]}
                            avatarURL={`/avatar/sweater.glb`}
                            motionURL={`/avatar/sit.fbx`}
                        ></AvatarMotion>

                        <directionalLight
                            position={[-1, 1, 1]}
                        ></directionalLight>

                        <PerspectiveCamera
                            makeDefault
                            position={[0, 1, 5]}
                            rotation={[Math.PI * -0.15, 0, 0]}
                        ></PerspectiveCamera>
                    </Canvas>
                </div>
                <CardDemo></CardDemo>
            </div>
        </>
    );
}

//

function CardDemo() {
    let [value, setValue] = useState("my new desk");
    let listMy = api.acl.listMy.useMutation({});
    useEffect(() => {
        listMy.mutateAsync({});
    }, []);
    return (
        <Card
            className="absolute w-full max-w-sm bg-[rgb(255,255,255,0.6)] backdrop-blur"
            style={{
                top: `calc(50% - 333px / 2)`,
                bottom: `calc(50% - 333px / 2)`,
                left: `calc(50% - 333px / 2)`,
                right: `calc(50% - 333px / 2)`,
            }}
        >
            <CardHeader>
                <CardTitle>Work Desks</CardTitle>
                <CardDescription>Desk on the Cloud</CardDescription>
                <CardAction>
                    <Link href={`/api/auth/signout`}>
                        <Button variant="outline">Logout</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent className="flex-col gap-2">
                <Input
                    value={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                    }}
                    placeholder="my new desk"
                    className="mb-2 bg-white"
                ></Input>
                <Button
                    className="w-full cursor-pointer bg-lime-600 text-white hover:bg-green-500 hover:text-green-800"
                    variant={"outline"}
                    onClick={() => {
                        //
                        vanilla.acl.create
                            .mutate({
                                name: `${value}`,
                            })
                            .then((data) => {
                                console.log(data);
                            });
                    }}
                >
                    Create New Desk
                </Button>
                {/* <Button variant="outline" className="w-full">
                    Login with Google
                </Button> */}
            </CardContent>
            <CardContent>
                <div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Your Admin Desks</Label>

                            {listMy?.isSuccess &&
                                listMy?.data?.filter((li) => {
                                    return li.members.some(
                                        (r) => r.role === "admin",
                                    );
                                }).length === 0 && <>Please add some items</>}

                            {listMy?.isPending && (
                                <>
                                    <div className="flex w-full justify-center">
                                        <Loader className="animate-spin duration-500"></Loader>
                                    </div>
                                </>
                            )}

                            {listMy?.data
                                ?.filter((li) => {
                                    return li.members.some(
                                        (r) => r.role === "admin",
                                    );
                                })
                                ?.map((li) => {
                                    return (
                                        <div
                                            className="flex w-full"
                                            key={li._id}
                                        >
                                            <Link
                                                href={`/desk/workspace/${li._id}`}
                                            >
                                                <Button
                                                    className="w-full cursor-pointer bg-gradient-to-tr from-white to-gray-300 text-center shadow-inner"
                                                    variant={"outline"}
                                                >
                                                    {li.name}
                                                </Button>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>

                        {listMy?.data?.some((li) => {
                            return li.members.some((r) => r.role === "editor");
                        }) && (
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Shared Editor Desks
                                    </Label>
                                </div>

                                {listMy?.data
                                    ?.filter((li) => {
                                        return li.members.some(
                                            (r) => r.role === "editor",
                                        );
                                    })
                                    ?.map((li) => {
                                        return (
                                            <div
                                                className="flex w-full"
                                                key={li._id}
                                            >
                                                <Link
                                                    href={`/desk/workspace/${li._id}`}
                                                >
                                                    <Button
                                                        className="w-full cursor-pointer bg-gradient-to-tr from-white to-gray-300 text-center shadow-inner"
                                                        variant={"outline"}
                                                    >
                                                        {li.name}
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}

                        {listMy?.data?.some((li) => {
                            return li.members.some((r) => r.role === "viewer");
                        }) && (
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Shared Viewer Desks
                                    </Label>
                                </div>

                                {listMy?.data
                                    ?.filter((li) => {
                                        return li.members.some(
                                            (r) => r.role === "viewer",
                                        );
                                    })
                                    ?.map((li) => {
                                        return (
                                            <div
                                                className="flex w-full"
                                                key={li._id}
                                            >
                                                <Link
                                                    href={`/desk/workspace/${li._id}`}
                                                >
                                                    <Button
                                                        className="w-full cursor-pointer bg-gradient-to-tr from-white to-gray-300 text-center shadow-inner"
                                                        variant={"outline"}
                                                    >
                                                        {li.name}
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
