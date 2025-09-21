"use client";
import { Suspense, useEffect, useRef } from "react";
import { useMiniApps, type WindowType } from "./useMiniApps";

import { Object3D } from "three";
import { Fullscreen, Container, Root, Text, Content } from "@react-three/uikit";

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
            <group position={[0, 0, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
                {/* <Root
                    backgroundColor="red"
                    sizeX={8}
                    sizeY={4}
                    flexDirection="row"
                    borderRadius={20}
                >
                    <Container
                        flexGrow={1}
                        margin={32}
                        backgroundColor="green"
                        borderRadius={20}
                    >
                        <Text>{`Ppap`}</Text>
                    </Container>
                    <Container
                        flexGrow={1}
                        margin={32}
                        backgroundColor="blue"
                        borderRadius={20}
                    />
                </Root> */}
            </group>

            {/*  */}
            {/*  */}
        </>
    );
}
