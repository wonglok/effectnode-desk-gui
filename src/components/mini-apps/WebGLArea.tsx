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
    useSelect,
    // RandomizedLight,
    // RoundedBox,
} from "@react-three/drei";
// import { LaydownText } from "./Objects/LaydownText";
import { Grid } from "./Objects/Grid";
// import { StandUpText } from "./Objects/StandupText";
import { DirectionalLight, Group, NoToneMapping } from "three";
// import { Avatar } from "./Objects/Avatar";
// import { UIKitObject } from "./Objects/UIKitObject";
// import { EnableDrag } from "./Objects/EnableDrag";
// import { InsideCamera } from "./Objects/InsideCamera";
// import { Suspense, useRef } from "react";
// import { UIKitFrame } from "./Objects/UIKitFrame";
// import { UIKitCard } from "./Objects/UIKitCard";
// import { createPortal } from "react-dom";
// import { AvatarMotion } from "./Objects/AvatarMotion";
// import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { MiniApps } from "./MiniApps";
import {
    Bloom,
    EffectComposer,
    Select,
    Selection,
    SelectiveBloom,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import { useMiniApps } from "./useMiniApps";
import { PlaneGrid } from "./Objects/PlaneGrid";

//

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
    let refDir = useRef<DirectionalLight>(new DirectionalLight()) as any;
    let refGlow = useRef<Group>(new Group()) as any;

    return (
        <>
            {/* * */}

            {/* <group scale={1}>
                <Grid></Grid>
            </group> */}

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

            <directionalLight ref={refDir}></directionalLight>

            <group ref={refGlow} layers={20} position={[0, -0.1, 0]}>
                <PlaneGrid></PlaneGrid>
            </group>

            {/* <Grid magic={true}></Grid> */}

            <Effects
                data={{
                    refGlow,
                    refDir,
                }}
            ></Effects>
        </>
    );
}

function Effects({ data }: any) {
    let selection = useMiniApps((r) => r.selection);

    useEffect(() => {
        let dom = data.refGlow.current;
        if (dom) {
            let selection2: any = [];

            dom.traverse((it: any) => {
                //
                if (it.material) {
                    //
                    selection2.push(it);
                }
            });

            useMiniApps.setState({
                selection: selection2,
            });
            return () => {
                useMiniApps.setState({
                    selection: [],
                });
            };
        }
    }, [data]);

    return (
        <>
            <EffectComposer>
                <SelectiveBloom
                    lights={[data.refDir]}
                    selection={selection}
                    selectionLayer={20}
                    luminanceThreshold={1.0}
                    intensity={1.0}
                    mipmapBlur
                ></SelectiveBloom>
            </EffectComposer>
        </>
    );
}

//
//
//
