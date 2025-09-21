"use client";
import { Suspense, useEffect, useRef } from "react";
import { useMiniApps, type WindowType } from "./useMiniApps";

import { Object3D } from "three";
import { Fullscreen, Container, Root, Text, Content } from "@react-three/uikit";
import { UIKitFrame } from "./Objects/UIKitFrame";
import { EnableDrag } from "./Objects/EnableDrag";

export function OneWindow({ win }: { win: WindowType }) {
    // let ref = useRef<Object3D>(null);
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

    console.log(win);

    return (
        <>
            <EnableDrag name={`_${win._id}`} initPos={win.position}>
                <UIKitFrame
                    content={
                        <>
                            <Container>
                                <Text>{win.name}</Text>
                            </Container>
                            <Container>
                                <Text>{win.appID}</Text>
                            </Container>
                        </>
                    }
                ></UIKitFrame>
            </EnableDrag>
            {/*  */}

            {/*  */}
            {/*  */}
        </>
    );
}
