import { OneMiniApp } from "./OneMiniApp";
import { useMiniApps } from "./useMiniApps";
import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Gltf,
    MapControls,
    Plane,
    RoundedBox,
} from "@react-three/drei";
import { LaydownText } from "./Objects/LaydownText";
import { Grid } from "./Objects/Grid";
import { StandUpText } from "./Objects/StandupText";
import { NoToneMapping } from "three";
import { Avatar } from "./Objects/Avatar";
import { CardPage } from "./Objects/UIKitObject";
import { EnableDrag } from "./Objects/EnableDrag";
// import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export function MiniApps() {
    let apps = useMiniApps((r) => r.apps);
    return (
        <>
            {/*  */}
            <Canvas
                gl={{ toneMapping: NoToneMapping, toneMappingExposure: 1 }}
                shadows
            >
                <EnvirionmentContent></EnvirionmentContent>
                {/* 
                <directionalLight
                    position={[0, 5, 5]}
                    intensity={5}
                    castShadow
                /> */}

                <LaydownText text="Desk"></LaydownText>

                {/* <StandUpText text="Praise the LORD"></StandUpText> */}

                {apps.map((app) => {
                    return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
                })}

                <Avatar></Avatar>

                <EnableDrag>
                    <group
                        rotation={[Math.PI * -0.5, 0, 0]}
                        position={[0, 0.5, 0]}
                    >
                        <CardPage></CardPage>
                    </group>
                </EnableDrag>
            </Canvas>

            {/*  */}
        </>
    );
}

function EnvirionmentContent() {
    return (
        <>
            {/* * */}

            <Plane
                scale={100}
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
                castShadow
            >
                <meshBasicMaterial></meshBasicMaterial>
            </Plane>

            <Grid></Grid>

            <MapControls
                object-position={[0, 5, 1.0]}
                object-rotation={[0, 0, 0]}
                target={[0, 0, 0]}
                makeDefault
            ></MapControls>

            <Environment
                files={[`/hdr/poly_haven_studio_1k.hdr`]}
            ></Environment>
        </>
    );
}
