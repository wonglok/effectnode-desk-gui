"use client";
import { useEffect, useRef } from "react";
import { useMiniApps, type WindowType } from "./useMiniApps";
import {
    Box,
    DragControls,
    Html,
    MeshTransmissionMaterial,
    RoundedBox,
    Text,
} from "@react-three/drei";
import { Object3D } from "three";
export function OneWindow({ win }: { win: WindowType }) {
    let ref = useRef<Object3D>(null);
    useEffect(() => {
        //
        useMiniApps.subscribe((now, before) => {
            let nowWin = now.wins.find((r) => r._id === win._id);
            let nw = JSON.stringify(nowWin);
            let bw = JSON.stringify(before.wins.find((r) => r._id === win._id));

            if (nw !== bw && nowWin) {
                if (ref.current) {
                    ref.current.position.fromArray(nowWin.position);
                    ref.current.scale.fromArray(nowWin.scale);
                    ref.current.quaternion.fromArray(nowWin.quaternion);
                }
            }
        });
        //
    }, [win._id]);

    return (
        <>
            <group ref={ref}>
                <DragControls>
                    <Text
                        position={[0, 0, 0.25]}
                        fontSize={0.35}
                        scale={[1, 1, 1]}
                    >
                        Thanks
                        <meshStandardMaterial
                            roughness={0}
                            color={"#000000"}
                        ></meshStandardMaterial>
                    </Text>
                    <RoundedBox
                        radius={0.5}
                        args={[2.5, 1, 1]}
                        scale={[1, 1, 0.25]}
                    >
                        <meshPhysicalMaterial
                            reflectivity={0.5}
                            roughness={0}
                            metalness={0}
                            transmission={1}
                            thickness={4}
                            emissive={"#ffffff"}
                            emissiveIntensity={0.01}
                        ></meshPhysicalMaterial>
                    </RoundedBox>
                </DragControls>
            </group>

            {/*  */}
            {/*  */}
        </>
    );
}
