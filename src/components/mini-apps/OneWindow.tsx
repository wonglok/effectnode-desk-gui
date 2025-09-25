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
import {
    Sky,
    Box,
    Cloud,
    Sphere,
    MeshTransmissionMaterial,
} from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";

import {
    BellRing,
    BotIcon,
    Check,
    CloudDownload,
    CloudLightningIcon,
    CloudUpload,
    Cross,
    DeleteIcon,
    DoorClosedIcon,
    EyeClosedIcon,
    FolderClosed,
    FolderOpen,
    LockIcon,
    LockOpenIcon,
    RemoveFormatting,
    SpadeIcon,
    TvIcon,
    ZapIcon,
} from "@react-three/uikit-lucide";

// import { BellRing, Check } from "@react-three/uikit-lucide";
// import { RenderPlane } from "./Objects/RenderPlane";
import { PreviewPlane } from "./UIkitObjects/RenderPlanes/PreviewPlane";
import { NodePlane } from "./UIkitObjects/RenderPlanes/NodePlane";
import { NotificationSection } from "./UIkitObjects/Sections/Notifications";
import { DemoPlane } from "./UIkitObjects/RenderPlanes/DemoPlane";
import { TitleSection } from "./UIkitObjects/Sections/TitleSection";
import { getDragToggleProps } from "./utils/getDragToggleProps";

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
    //

    let controls: any = useThree((r) => r.controls);

    let [openDrawer, setOpenDrawer] = useState(false);

    let getPropsForDragging = (
        { onClick } = {
            onClick: () => {
                setOpenDrawer(!openDrawer);
            },
        },
    ) => {
        return getDragToggleProps({
            onClick: () => {
                onClick();
            },
        });
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
                                    setOpenDrawer(value);
                                    if (controls) {
                                        controls.enabled = true;
                                    }
                                }}
                                //
                                //
                                upperUI={
                                    <>
                                        <Suspense fallback={null}>
                                            <Content
                                                transformTranslateZ={1}
                                                padding={14}
                                                keepAspectRatio={false}
                                                width="100%"
                                                height={400}
                                                castShadow
                                                {...getPropsForDragging()}
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
                                        </Suspense>

                                        <TitleSection
                                            title={`${win.value.name}`}
                                            description={`Mini Window`}
                                            cta={
                                                <>
                                                    {!openDrawer && (
                                                        <Button
                                                            cursor="pointer"
                                                            // onClick={(e) => {
                                                            //     e.stopPropagation();
                                                            // }}
                                                            flexDirection="row"
                                                            width="100%"
                                                            {...getPropsForDragging()}
                                                        >
                                                            <CloudDownload
                                                                color={"lime"}
                                                                marginRight={10}
                                                            ></CloudDownload>
                                                            <Text
                                                                color={"lime"}
                                                            >{`Open`}</Text>
                                                        </Button>
                                                    )}

                                                    {openDrawer && (
                                                        <Button
                                                            cursor="pointer"
                                                            // onClick={(e) => {
                                                            //     e.stopPropagation();
                                                            // }}
                                                            flexDirection="row"
                                                            width="100%"
                                                            {...getPropsForDragging()}
                                                        >
                                                            <CloudUpload
                                                                color={"cyan"}
                                                                marginRight={10}
                                                            ></CloudUpload>
                                                            <Text
                                                                color={"cyan"}
                                                            >{`Close`}</Text>
                                                        </Button>
                                                    )}
                                                </>
                                            }
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
                                                    {...getPropsForDragging()}
                                                    transformTranslateZ={1}
                                                    keepAspectRatio={false}
                                                    width="100%"
                                                    height={400}
                                                    castShadow
                                                >
                                                    <DemoPlane
                                                        canRun={openDrawer}
                                                        win={win}
                                                    />
                                                </Content>
                                            </Suspense>
                                        </CardContent>

                                        <CardFooter marginTop={0}>
                                            <Button
                                                cursor="pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpenDrawer(false);
                                                }}
                                                flexDirection="row"
                                                width="100%"
                                            >
                                                <BotIcon
                                                    height={16}
                                                    width={16}
                                                    marginRight={10}
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
