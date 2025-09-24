"use client";
import { Suspense, useEffect, useRef } from "react";
import { useMiniApps, type WinObject } from "./useMiniApps";

import { Object3D } from "three";
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
import { Sky, Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { BellRing, Check } from "@react-three/uikit-lucide";

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

    let controls: any = useThree((r) => r.controls);
    return (
        <>
            <EnableDrag
                grab={
                    <>
                        <UIKitDrawer
                            portal={
                                <>
                                    <Suspense fallback={null}>
                                        <group
                                            rotation={[0, Math.PI * 0.15, 0]}
                                            position={[-0.3, 0, 0]}
                                        >
                                            <AvatarMotion
                                                avatarURL={`/avatar/angel.glb`}
                                                motionURL={`/avatar/formal-salute.fbx`}
                                            ></AvatarMotion>
                                        </group>

                                        <group
                                            rotation={[0, Math.PI * -0.15, 0]}
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
                                        <Sky rayleigh={0.1} azimuth={0.5}></Sky>
                                    </Suspense>
                                </>
                            }
                            content={
                                <>
                                    <Container
                                        flexDirection={"column"}
                                        onPointerEnter={() => {
                                            //
                                            document.body.style.cursor =
                                                "crosshair";
                                        }}
                                        onPointerLeave={() => {
                                            //
                                            document.body.style.cursor = "";
                                        }}
                                        onPointerDown={(ev) => {
                                            ev.stopPropagation();

                                            if (controls) {
                                                controls.enabled = false;
                                            }
                                        }}
                                    >
                                        <Input
                                            fontSize={30}
                                            fontWeight="medium"
                                            letterSpacing={-0.4}
                                            color={colors.primary}
                                            defaultValue={"Let's Pray"}
                                        />

                                        <Text
                                            fontSize={20}
                                            fontWeight="medium"
                                            letterSpacing={-0.4}
                                            color={colors.primary}
                                        >
                                            Thank you Jesus
                                        </Text>
                                    </Container>
                                </>
                            }
                            footer={null}
                        ></UIKitDrawer>
                    </>
                }
                show={<></>}
                win={win}
            >
                {/*  */}
                {/*  */}
                {/* <Input
                                fontSize={30}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={colors.primary}
                                defaultValue={"Im loklok"}
                            />
                            <Text
                                fontSize={20}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={colors.primary}
                            >
                                1 activities for you
                            </Text> */}
                {/* <UIKitFrame
                        content={
                            <>
                                <Container>
                                    <Text>{win.value.name}</Text>
                                </Container>
                                <Container>
                                    <Text>{win.value.appID}</Text>
                                </Container>
                            </>
                        }
                    ></UIKitFrame> */}

                {/*  */}
            </EnableDrag>
            {/*  */}

            {/*  */}
            {/*  */}
        </>
    );
}
