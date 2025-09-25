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

import { BellRing, Check } from "@react-three/uikit-lucide";
import { RenderPlane } from "./Objects/RenderPlane";
import { PreviewPlane } from "./UIkitObjects/RenderPlanes/PreviewPlane";
import { NodePlane } from "./UIkitObjects/RenderPlanes/NodePlane";
import { NotificationSection } from "./UIkitObjects/Sections/Notifications";
import { DemoPlane } from "./UIkitObjects/RenderPlanes/DemoPlane";

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

    return (
        <>
            <EnableDrag
                show={({ o3 }) => (
                    <>
                        {/*  */}
                        {/*  */}
                    </>
                )}
                grab={({ o3 }) => {
                    return (
                        <>
                            {/*  */}

                            <UIKitDrawer
                                openDrawer={openDrawer}
                                onSetDrawer={(value) => {
                                    setOpen(value);
                                    if (controls) {
                                        controls.enabled = true;
                                    }
                                }}
                                title={
                                    <>
                                        <Container
                                            backgroundColor={0xffffff}
                                            dark={{ backgroundColor: 0x0 }}
                                            flexDirection="row"
                                            padding={28}
                                            paddingTop={32 * 0.0}
                                            alignItems="center"
                                            justifyContent="space-between"
                                            borderBottomRadius={20}
                                            castShadow
                                        >
                                            <Container
                                                flexDirection="column"
                                                gap={8}
                                            >
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
                                            </Container>

                                            <Container flexDirection="row">
                                                <Avatar
                                                    //
                                                    width={40}
                                                    src="/avatar-icon/ava1.png"
                                                />
                                                <Avatar
                                                    marginLeft={-6}
                                                    width={40}
                                                    src="/avatar-icon/ava2.png"
                                                />
                                                <Avatar
                                                    marginLeft={-6}
                                                    width={40}
                                                    src="/avatar-icon/ava3.png"
                                                />
                                            </Container>
                                        </Container>
                                    </>
                                }
                                portal={
                                    <>
                                        <Suspense fallback={null}>
                                            <Content
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
                                        </Suspense>
                                    </>
                                }
                                drawerUI={
                                    <>
                                        {/*  */}
                                        <Suspense fallback={null}>
                                            <Content
                                                transformTranslateZ={1}
                                                padding={14}
                                                keepAspectRatio={false}
                                                width="100%"
                                                height={400}
                                                castShadow
                                            >
                                                <DemoPlane win={win} />
                                            </Content>
                                        </Suspense>

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
