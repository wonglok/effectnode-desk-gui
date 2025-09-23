"use client";
import { Suspense, useEffect, useRef } from "react";
import { useMiniApps, type WinObject } from "./useMiniApps";

import { Object3D } from "three";
import { Fullscreen, Container, Root, Text, Content } from "@react-three/uikit";
import { UIKitFrame } from "./UIkitObjects/UIKitFrame";
import { EnableDrag } from "./Objects/EnableDrag";

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
                <group ref={ref}>
                    <UIKitFrame
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
                    ></UIKitFrame>
                </group>
            </EnableDrag>
            {/*  */}

            {/*  */}
            {/*  */}
        </>
    );
}
