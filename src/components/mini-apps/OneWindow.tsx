"use client";
import { Suspense, useEffect, useRef } from "react";
import { useMiniApps, type WinObject } from "./useMiniApps";

import { NoColorSpace, Object3D } from "three";
import {
    Fullscreen,
    Container,
    Root,
    Text,
    Content,
    Input,
} from "@react-three/uikit";
import { UIKitFrame } from "./UIkitObjects/UIKitFrame";
import { EnableDrag } from "./Objects/EnableDrag";
import { UIKitDrawer } from "./UIkitObjects/UIKitDrawer";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    colors,
    Switch,
} from "@react-three/uikit-default";
import { AvatarMotion } from "./Objects/AvatarMotion";
import { Sky, Box, Cloud } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { BellRing, Check } from "@react-three/uikit-lucide";
import { RenderPlane } from "./Objects/RenderPlane";

export function OneWindow({ win }: { win: WinObject }) {
    let ref = useRef<Object3D>(null);

    // useEffect(() => {
    //     //
    //     useMiniApps.subscribe((now, before) => {
    //         let nowWin = now.objects.find(
    //             (r) => r.key === win.key,
    //         ) as WinObject;
    //         let nw = JSON.stringify(nowWin);
    //         let bw = JSON.stringify(
    //             before.objects.find((r) => r.key === win.key),
    //         );
    //         if (nw !== bw && nowWin) {
    //             console.log(nowWin.value);
    //         }
    //     });
    //     //
    // }, [win.key]);

    console.log(win);

    let controls: any = useThree((r) => r.controls);
    return (
        <>
            <EnableDrag
                grab={
                    <>
                        <UIKitDrawer
                            portal={
                                <>
                                    <RenderPlane
                                        width={512 * 1.5}
                                        height={512 * 1.5}
                                        colorSpace={NoColorSpace}
                                        eventPriority={100}
                                    >
                                        <Suspense fallback={null}>
                                            <group
                                                rotation={[
                                                    0,
                                                    Math.PI * 0.15,
                                                    0,
                                                ]}
                                                position={[-0.3, 0, 0]}
                                            >
                                                <AvatarMotion
                                                    avatarURL={`/avatar/angel.glb`}
                                                    motionURL={`/avatar/formal-salute.fbx`}
                                                ></AvatarMotion>
                                            </group>

                                            <group
                                                rotation={[
                                                    0,
                                                    Math.PI * -0.15,
                                                    0,
                                                ]}
                                                position={[0.3, 0, 0]}
                                            >
                                                <AvatarMotion
                                                    avatarURL={`/game-asset/rpm/fixed/game-builder.glb`}
                                                    motionURL={`/game-asset/motion-files/mixamo/greet/standup-greeting.fbx`}
                                                ></AvatarMotion>
                                            </group>

                                            <ambientLight
                                                intensity={Math.PI * 0.5}
                                            />

                                            <Sky
                                                rayleigh={0.3}
                                                azimuth={0.5}
                                            ></Sky>

                                            <Cloud
                                                position={[0, 1, -2]}
                                            ></Cloud>

                                            <ambientLight
                                                intensity={1}
                                            ></ambientLight>
                                        </Suspense>
                                    </RenderPlane>
                                </>
                            }
                            content={
                                <>
                                    <Container
                                        flexDirection={"column"}
                                        onPointerEnter={() => {
                                            //
                                            // document.body.style.cursor =
                                            //     "crosshair";
                                            //
                                        }}
                                        onPointerLeave={() => {
                                            //
                                            // document.body.style.cursor = "";
                                            //
                                        }}
                                    >
                                        <Text
                                            fontSize={30}
                                            fontWeight="medium"
                                            letterSpacing={-0.4}
                                            color={colors.primary}
                                            onPointerDown={(ev) => {
                                                ev.stopPropagation();

                                                if (controls) {
                                                    controls.enabled = false;
                                                }
                                            }}
                                        >
                                            {win?.value?.name}
                                        </Text>

                                        <Text
                                            fontSize={20}
                                            fontWeight="medium"
                                            letterSpacing={-0.4}
                                            color={colors.primary}
                                            onPointerDown={(ev) => {
                                                ev.stopPropagation();

                                                if (controls) {
                                                    controls.enabled = false;
                                                }
                                            }}
                                        >
                                            {win?.value?.name}
                                        </Text>
                                    </Container>
                                </>
                            }
                        ></UIKitDrawer>
                    </>
                }
                show={
                    <>
                        {/*  */}

                        {/*  */}
                    </>
                }
                win={win}
            ></EnableDrag>

            {/*  */}
        </>
    );
}
