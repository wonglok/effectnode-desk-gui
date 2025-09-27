"use client";
import {
    Suspense,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useMiniApps, type WinObject } from "../../useMiniApps";

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
import { UIKitFrame } from "../UIKitFrame";
import { EnableDrag } from "../../Objects/EnableDrag";
import { UIKitDrawer } from "../UIKitDrawer";
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
import { AvatarMotion } from "../../Objects/AvatarMotion";
import {
    Sky,
    Box,
    Cloud,
    Sphere,
    MeshTransmissionMaterial,
    Plane,
    Html,
    RoundedBoxGeometry,
    RoundedBox,
} from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";

import {
    ArrowDown,
    ArrowUp,
    ArrowUp01,
    BanIcon,
    BellRing,
    BotIcon,
    Check,
    CloudDownload,
    CloudLightningIcon,
    CloudUpload,
    CroissantIcon,
    Cross,
    DeleteIcon,
    DoorClosedIcon,
    EyeClosedIcon,
    FolderClosed,
    FolderOpen,
    LockIcon,
    LockOpenIcon,
    PanelBottomClose,
    PanelBottomOpen,
    RemoveFormatting,
    SpadeIcon,
    TvIcon,
    ZapIcon,
} from "@react-three/uikit-lucide";

// import { BellRing, Check } from "@react-three/uikit-lucide";
// import { RenderPlane } from "./Objects/RenderPlane";
import { PreviewPlane } from "../RenderPlanes/PreviewPlane";
import { NodePlane } from "../RenderPlanes/NodePlane";
import { DemoPlane } from "../RenderPlanes/DemoPlane";
import { TitleSection } from "../Sections/TitleSection";
import { getDragToggleProps } from "../../utils/getDragToggleProps";

export function PreviewWindowNode({ win }: { win: WinObject }) {
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
                win={win}
                show={({ o3 }) => (
                    <>
                        {/*  */}
                        {/*  */}
                    </>
                )}
                grab={({ o3, at }) => {
                    return (
                        <>
                            <UIKitDrawer
                                //
                                sizeX={1}
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
                                        <Suspense
                                            fallback={
                                                <Container
                                                    borderRadius={14}
                                                    height={400}
                                                    width={"100%"}
                                                ></Container>
                                            }
                                        >
                                            <Content
                                                transformTranslateZ={1}
                                                padding={20}
                                                keepAspectRatio={false}
                                                width="100%"
                                                height={400}
                                                {...getPropsForDragging()}
                                            >
                                                <Plane visible={false}></Plane>

                                                <Html
                                                    transform
                                                    frustumCulled={false}
                                                    center
                                                    className="pointer-events-auto touch-manipulation select-none"
                                                    rotation={[0, 0, 0]}
                                                    position={[0, 0, 0.001]}
                                                    scale={1 / 5}
                                                >
                                                    <iframe
                                                        src={`/app/ppap123`}
                                                        className="h-[200px] w-[200px] scale-100 rounded-lg border bg-gray-200"
                                                    ></iframe>
                                                </Html>

                                                {/*  */}
                                                {/*  */}
                                                {/*  */}
                                            </Content>
                                        </Suspense>

                                        <TitleSection
                                            title={`${win.value.name}`}
                                            description={`Mini Window`}
                                            cta={
                                                <>
                                                    {!openDrawer && (
                                                        <Button
                                                            flexDirection="row"
                                                            width="100%"
                                                            backgroundColor={
                                                                "#000099"
                                                            }
                                                            {...getPropsForDragging()}
                                                        >
                                                            <PanelBottomClose
                                                                marginRight={10}
                                                            ></PanelBottomClose>
                                                            <Text
                                                                fontSize={17}
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                                color={"white"}
                                                            >{`Open`}</Text>
                                                        </Button>
                                                    )}
                                                    {openDrawer && (
                                                        <Button
                                                            flexDirection="row"
                                                            width="100%"
                                                            backgroundColor={
                                                                "#ef0000"
                                                            }
                                                            {...getPropsForDragging()}
                                                        >
                                                            <PanelBottomOpen
                                                                marginRight={10}
                                                            ></PanelBottomOpen>

                                                            <Text
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                                fontSize={17}
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
                                        {/* <NotificationSection></NotificationSection> */}
                                        <CardContent flexDirection={"column"}>
                                            <Suspense fallback={null}>
                                                <Content
                                                    {...getPropsForDragging()}
                                                    transformTranslateZ={1}
                                                    keepAspectRatio={false}
                                                    width="100%"
                                                    height={400}
                                                >
                                                    <DemoPlane
                                                        canRun={openDrawer}
                                                        win={win}
                                                    />
                                                </Content>
                                            </Suspense>
                                        </CardContent>

                                        <CardContent marginTop={0}>
                                            <Button
                                                cursor="pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenDrawer(false);
                                                }}
                                                flexDirection="row"
                                                width="100%"
                                                backgroundColor={"red"}
                                            >
                                                <Text
                                                    fontSize={17}
                                                    fontWeight={"bold"}
                                                >
                                                    Close
                                                </Text>
                                            </Button>
                                        </CardContent>

                                        {/* <NotificationSection></NotificationSection> */}
                                    </>
                                }
                            ></UIKitDrawer>
                        </>
                    );
                }}
            ></EnableDrag>

            {/*  */}
        </>
    );
}
