import { OneMiniApp } from "./OneMiniApp";
import { useMiniApps } from "./useMiniApps";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    AccumulativeShadows,
    Environment,
    Gltf,
    MapControls,
    PerspectiveCamera,
    Plane,
    RandomizedLight,
    RoundedBox,
} from "@react-three/drei";
import { LaydownText } from "./Objects/LaydownText";
import { Grid } from "./Objects/Grid";
import { StandUpText } from "./Objects/StandupText";
import { NoToneMapping } from "three";
import { Avatar } from "./Objects/Avatar";
import { UIKitObject } from "./Objects/UIKitObject";
import { EnableDrag } from "./Objects/EnableDrag";
import { InsideCamera } from "./Objects/InsideCamera";
import { Suspense, useRef } from "react";
import { UIKitFrame } from "./Objects/UIKitFrame";
import { UIKitCard } from "./Objects/UIKitCard";
import { createPortal } from "react-dom";
import { AvatarMotion } from "./Objects/AvatarMotion";
// import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export function MiniApps() {
    let apps = useMiniApps((r) => r.apps);
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

                {apps.map((app) => {
                    return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
                })}

                <EnvirionmentContent></EnvirionmentContent>
                <Drags></Drags>
            </Canvas>

            {/*  */}
        </>
    );
}

function Drags() {
    return (
        <>
            <EnableDrag
                name="p-1-cta"
                initPos={[
                    1.7824280292933643, 2.0698720515355262e-14,
                    0.3820235632324256,
                ]}
            >
                <Suspense fallback={null}>
                    <LaydownText text="Desk"></LaydownText>
                </Suspense>
            </EnableDrag>

            {/*  */}
            {/*  */}

            <EnableDrag
                name="p-1-avatar"
                initPos={[-1.0884924105567535, -2.7824964554667986e-14, 0]}
            >
                <Suspense fallback={null}>
                    <Avatar></Avatar>
                </Suspense>
            </EnableDrag>

            <EnableDrag
                name="p-1-card-page-1"
                initPos={[-5.470102401240012, 4.413136522884997e-15, 0]}
            >
                <group position={[0, 0.1, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
                    <Suspense fallback={null}>
                        <UIKitObject></UIKitObject>
                    </Suspense>
                </group>
            </EnableDrag>

            <EnableDrag
                name="p-1-card-page-2"
                initPos={[8.84911023890157, -1.0644263248593688e-14, 0]}
            >
                <group position={[0, 0.1, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
                    <Suspense fallback={null}>
                        <UIKitCard></UIKitCard>
                    </Suspense>
                </group>
            </EnableDrag>
        </>
    );
}
function EnvirionmentContent() {
    return (
        <>
            {/* * */}
            <group scale={1}>
                <Plane
                    scale={50}
                    rotation={[-Math.PI * 0.5, 0, 0]}
                    position={[0, -0.1, 0]}
                    receiveShadow
                    castShadow
                >
                    <meshBasicMaterial color={0xfbfbfb}></meshBasicMaterial>
                </Plane>

                <Grid></Grid>
            </group>

            <MapControls
                object-position={[0, 15, 6]}
                object-rotation={[0, 0, 0]}
                target={[0, 0, 0]}
                makeDefault
                enableRotate={false}
            ></MapControls>

            <PerspectiveCamera
                makeDefault
                position={[0, 15, 6]}
            ></PerspectiveCamera>

            <Environment
                files={[`/hdr/poly_haven_studio_1k.hdr`]}
            ></Environment>
        </>
    );
}
