"use client";
import {
    Suspense,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useMiniApps, type WinObject } from "./useMiniApps";

import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    NoColorSpace,
    Object3D,
    Vector3,
} from "three";
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
    Avatar,
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
import { createPortal, useFrame, useThree } from "@react-three/fiber";

import {
    BellRing,
    BotIcon,
    Check,
    Cross,
    RemoveFormatting,
    TvIcon,
} from "@react-three/uikit-lucide";

// import { BellRing, Check } from "@react-three/uikit-lucide";
// import { RenderPlane } from "./Objects/RenderPlane";
import { PreviewPlane } from "./UIkitObjects/RenderPlanes/PreviewPlane";
import { NodePlane } from "./UIkitObjects/RenderPlanes/NodePlane";
import { NotificationSection } from "./UIkitObjects/Sections/Notifications";
import { DemoPlane } from "./UIkitObjects/RenderPlanes/DemoPlane";
import { TitleSection } from "./UIkitObjects/Sections/TitleSection";

export function OneWindow({ win }: { win: WinObject }) {
    // let ref = useRef<Object3D>(null);

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

    // console.log(win);

    let controls: any = useThree((r) => r.controls);
    let [openDrawer, setOpen] = useState(false);

    let getDragToggleProps = () => {
        return {
            onPointerDown: (ev: any) => {
                ev.eventObject.userData.movementTick = 0;
            },
            onPointerMove: (ev: any) => {
                if (typeof ev.eventObject.userData.movementTick === "number") {
                    ev.eventObject.userData.movementTick += 1;
                    ev.stopPropagation();
                }
            },
            onPointerUp: (ev: any) => {
                if (typeof ev.eventObject.userData.movementTick === "number") {
                    if (ev.eventObject.userData.movementTick <= 5) {
                        setOpen(!openDrawer);
                        ev.eventObject.userData.movementTick = 0;
                    }
                    ev.eventObject.userData.movementTick = undefined;
                }
            },
        };
    };

    return (
        <>
            <EnableDrag
                show={({ o3 }) => (
                    <>
                        {/*  */}
                        {/*  */}
                    </>
                )}
                grab={({ o3, at }) => {
                    return (
                        <>
                            {/*  */}

                            <UIKitDrawer
                                //
                                openDrawer={openDrawer}
                                onSetDrawer={(value) => {
                                    setOpen(value);
                                    if (controls) {
                                        controls.enabled = true;
                                    }
                                }}
                                //
                                upperUI={
                                    <>
                                        <Suspense fallback={null}>
                                            <Content
                                                {...getDragToggleProps()}
                                                transformTranslateZ={1}
                                                padding={14}
                                                keepAspectRatio={false}
                                                width="100%"
                                                height={400}
                                                castShadow
                                            >
                                                {win.value.type ===
                                                    "app_preview" && (
                                                    <PreviewPlane
                                                        win={win}
                                                    ></PreviewPlane>
                                                )}

                                                {win.value.type ===
                                                    "app_node" && (
                                                    <NodePlane
                                                        win={win}
                                                    ></NodePlane>
                                                )}
                                            </Content>
                                            {/*  */}

                                            {/*  */}
                                        </Suspense>

                                        <TitleSection
                                            title={`${win.value.name}`}
                                            description={`Mini Window`}
                                        ></TitleSection>
                                    </>
                                }
                                drawerUI={
                                    <>
                                        {/*  */}
                                        {/* <NotificationSection></NotificationSection> */}
                                        <CardContent>
                                            <Suspense fallback={null}>
                                                <Content
                                                    {...getDragToggleProps()}
                                                    transformTranslateZ={1}
                                                    keepAspectRatio={false}
                                                    width="100%"
                                                    height={400}
                                                    castShadow
                                                >
                                                    <DemoPlane win={win} />
                                                </Content>
                                            </Suspense>
                                        </CardContent>

                                        <CardFooter marginTop={0}>
                                            <Button
                                                cursor="pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpen(false);
                                                }}
                                                flexDirection="row"
                                                width="100%"
                                            >
                                                <BotIcon
                                                    height={16}
                                                    width={16}
                                                />
                                                <Text>Close</Text>
                                            </Button>
                                        </CardFooter>

                                        {/* <NotificationSection></NotificationSection> */}
                                    </>
                                }
                            ></UIKitDrawer>
                        </>
                    );
                }}
                win={win}
            ></EnableDrag>

            {/*  */}
        </>
    );
}
