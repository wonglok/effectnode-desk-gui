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
import { colors } from "@react-three/uikit-default";
import { AvatarMotion } from "./Objects/AvatarMotion";
import { Sky } from "@react-three/drei";

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

    return (
        <>
            <EnableDrag win={win}>
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

                                <ambientLight intensity={Math.PI * 0.5} />
                                <Sky rayleigh={0.1} azimuth={0.5}></Sky>
                            </Suspense>
                        </>
                    }
                    content={
                        <>
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
                        </>
                    }
                ></UIKitDrawer>
            </EnableDrag>
            {/*  */}

            {/*  */}
            {/*  */}
        </>
    );
}
