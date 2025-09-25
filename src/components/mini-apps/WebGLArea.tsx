// import { OneMiniApp } from "./OneMiniApp";
// import { useMiniApps } from "./useMiniApps";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    // AccumulativeShadows,
    Environment,
    // Gltf,
    MapControls,
    PerspectiveCamera,
    Plane,
    // RandomizedLight,
    // RoundedBox,
} from "@react-three/drei";
// import { LaydownText } from "./Objects/LaydownText";
import { Grid } from "./Objects/Grid";
// import { StandUpText } from "./Objects/StandupText";
import { NoToneMapping } from "three";
// import { Avatar } from "./Objects/Avatar";
// import { UIKitObject } from "./Objects/UIKitObject";
// import { EnableDrag } from "./Objects/EnableDrag";
// import { InsideCamera } from "./Objects/InsideCamera";
// import { Suspense, useRef } from "react";
// import { UIKitFrame } from "./Objects/UIKitFrame";
// import { UIKitCard } from "./Objects/UIKitCard";
// import { createPortal } from "react-dom";
// import { AvatarMotion } from "./Objects/AvatarMotion";
import { MiniApps } from "./MiniApps";
// import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export function WebGLArea() {
    return (
        <>
            {/*  */}
            <Canvas
                gl={{
                    toneMapping: NoToneMapping,
                    toneMappingExposure: 1,
                    localClippingEnabled: true,
                }}
            >
                {/* <StandUpText text="Praise the LORD"></StandUpText> */}

                <EnvirionmentContent></EnvirionmentContent>

                <group position={[0, 0.01, 0]}>
                    <MiniApps></MiniApps>
                </group>
            </Canvas>

            {/*  */}
        </>
    );
}

function EnvirionmentContent() {
    return (
        <>
            {/* * */}
            <group scale={1}>
                <Grid></Grid>
            </group>

            <MapControls
                object-position={[0, 10, 5]}
                object-rotation={[0, 0, 0]}
                target={[0, 0, 0]}
                makeDefault
                enableRotate={false}
            ></MapControls>

            <PerspectiveCamera
                makeDefault
                position={[0, 10, 5]}
            ></PerspectiveCamera>

            <Environment
                files={[`/hdr/poly_haven_studio_1k.hdr`]}
            ></Environment>
        </>
    );
}
