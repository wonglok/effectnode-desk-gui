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
import { Suspense } from "react";
import { Laptop } from "@/components/login/Laptop";

export default function Page() {
    return (
        <>
            <div className="relative h-full w-full">
                <div className="absolute top-0 left-0 h-full w-full">
                    <Canvas>
                        <EffectComposer>
                            <Bloom></Bloom>
                        </EffectComposer>
                        <Sky rayleigh={0.1} azimuth={-0.5 * Math.PI}></Sky>

                        <ambientLight intensity={Math.PI}></ambientLight>
                        <group scale={5} position={[0, 0, -5]}>
                            <Float floatIntensity={3}>
                                <Cloud
                                    color={"#cccccc"}
                                    position={[0, -4.0, -2.5]}
                                ></Cloud>
                            </Float>
                            <Suspense fallback={null}>
                                <Gltf
                                    scale={1.5}
                                    rotation={[0, Math.PI * 0.0, 0]}
                                    position={[0, -3, 0]}
                                    src={`/login/desk-v1.glb`}
                                ></Gltf>
                                <group
                                    scale={0.35}
                                    rotation={[0, Math.PI * -0.25, 0]}
                                    position={[0.8, -1.5, 0.3]}
                                >
                                    <Laptop></Laptop>
                                </group>
                                <Environment
                                    files={[
                                        `/hdr/aerodynamics_workshop_1k.hdr`,
                                    ]}
                                ></Environment>
                            </Suspense>
                        </group>

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
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                    <div className="w-[333px] shrink-0">
                        <CardDemo></CardDemo>
                    </div>
                </div>
            </div>
        </>
    );
}

function CardDemo() {
    return (
        <Card className="w-full max-w-sm bg-[rgb(255,255,255,0.6)] backdrop-blur-xl">
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
                <Input className="mb-2 bg-white"></Input>
                <Button
                    className="w-full cursor-pointer bg-lime-600 text-white hover:bg-green-500 hover:text-green-800"
                    variant={"outline"}
                    onClick={() => {
                        //
                    }}
                >
                    Create new Desk
                </Button>
                {/* <Button variant="outline" className="w-full">
                    Login with Google
                </Button> */}
            </CardContent>
            <CardContent>
                <div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Your Desks</Label>
                            <div className="flex w-full">
                                <Button
                                    className="w-full cursor-pointer bg-gradient-to-tr from-white to-gray-300 text-center shadow-inner"
                                    variant={"outline"}
                                ></Button>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Shared Desks</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
