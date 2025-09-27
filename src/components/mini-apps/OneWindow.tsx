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
    Plane,
    Html,
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
import { PreviewPlane } from "./UIkitObjects/RenderPlanes/PreviewPlane";
import { NodePlane } from "./UIkitObjects/RenderPlanes/NodePlane";
import { DemoPlane } from "./UIkitObjects/RenderPlanes/DemoPlane";
import { TitleSection } from "./UIkitObjects/Sections/TitleSection";
import { getDragToggleProps } from "./utils/getDragToggleProps";

//

import { PreviewWindowNode } from "./UIkitObjects/Node/PreviewWindowNode";
import { DefaultNode } from "./UIkitObjects/Node/DefaultNode";

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

    return (
        <>
            {win.value.type === "app_node" && (
                <DefaultNode win={win}></DefaultNode>
            )}

            {win.value.type === "app_preview" && (
                <PreviewWindowNode win={win}></PreviewWindowNode>
            )}
        </>
    );
}
