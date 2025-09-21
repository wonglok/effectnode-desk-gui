"use client";
import { useEffect, useRef } from "react";
import { useMiniApps, type WindowType } from "./useMiniApps";
import {
    Box,
    Center,
    DragControls,
    Html,
    MeshTransmissionMaterial,
    RoundedBox,
    Text,
    Text3D,
    useEnvironment,
    useTexture,
} from "@react-three/drei";
import { Object3D } from "three";
export function OneWindow({ win }: { win: WindowType }) {
    let ref = useRef<Object3D>(null);
    useEffect(() => {
        //
        // useMiniApps.subscribe((now, before) => {
        //     let nowWin = now.wins.find((r) => r._id === win._id);
        //     let nw = JSON.stringify(nowWin);
        //     let bw = JSON.stringify(before.wins.find((r) => r._id === win._id));
        //     if (nw !== bw && nowWin) {
        //     }
        // });
        //
    }, [win._id]);

    return (
        <>
            {/*  */}
            {/*  */}
        </>
    );
}
