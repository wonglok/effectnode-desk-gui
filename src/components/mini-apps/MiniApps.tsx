import { OneMiniApp } from "./OneMiniApp";
import { useMiniApps } from "./useMiniApps";
import { Canvas } from "@react-three/fiber";
import { MapControls, Plane, RoundedBox } from "@react-three/drei";
import { LaydownText } from "./Objects/LaydownText";
import { Grid } from "./Objects/Grid";
import { StandUpText } from "./Objects/StandupText";
// import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export function MiniApps() {
    let apps = useMiniApps((r) => r.apps);
    return (
        <>
            {/*  */}
            <Canvas shadows>
                <EnvirionmentContent></EnvirionmentContent>

                <LaydownText text="Desk"></LaydownText>

                {/* <StandUpText text="Praise the LORD"></StandUpText> */}

                {apps.map((app) => {
                    return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
                })}
            </Canvas>

            {/*  */}
        </>
    );
}

function EnvirionmentContent() {
    return (
        <>
            {/**/}

            <Plane
                scale={100}
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -0.1, 0]}
            >
                <meshBasicMaterial></meshBasicMaterial>
            </Plane>

            <Grid></Grid>

            <MapControls
                object-position={[0, 5, 2.0]}
                target={[0, 0, 0]}
                makeDefault
            ></MapControls>
        </>
    );
}
