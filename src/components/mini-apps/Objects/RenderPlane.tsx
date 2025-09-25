import { Suspense, useEffect, useMemo, useRef } from "react";
import { useEnvironment } from "@react-three/drei";
import {
    Canvas,
    createPortal,
    extend,
    useFrame,
    useThree,
} from "@react-three/fiber";

import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
    Bone,
    Matrix4,
    Scene,
    Vector2,
    Color,
} from "three";
import { geometry } from "maath";
import {
    EffectComposer,
    Pass,
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025 * 2.0);

export function RenderPlane({
    canRun = true,
    children,
    width = 1024,
    height = 1024,
    cameraPosition = [-0.1, 1.7, 0.75],
    cameraRotation = [0, 0, 0],
    hdr = `/game-asset/hdr/brown_photostudio_02_1k.hdr`,
}: any) {
    let env = useEnvironment({
        files: [hdr],
    });

    let myScene = useMemo(() => {
        return new Scene();
    }, []);
    let gl = useThree((r) => r.gl);
    let rtt = useMemo(() => {
        return new WebGLRenderTarget(Math.floor(width), Math.floor(height), {
            //
            stencilBuffer: false,
        });
    }, [width, height]);

    let cam = useMemo(() => {
        return new PerspectiveCamera(65, width / height, 0.01, 500);
    }, []);

    useEffect(() => {
        env.mapping = EquirectangularReflectionMapping;
        myScene.environment = env;
        myScene.environmentIntensity = 1.0;
    }, [myScene, env]);

    // let rpass = useMemo(() => {
    //     //

    //     let rpass = new RenderPass(myScene, cam);

    //     return rpass;
    // }, [gl, rtt, env]);

    // let bloom = useMemo(() => {
    //     let bloom = new BloomPass(0.5, 4, 2);
    //     return bloom;
    // }, [gl, rtt]);

    // let composer = useMemo(() => {
    //     let composer = new EffectComposer(gl, rtt);
    //     composer.addPass(rpass);

    //     // composer.addPass(bloom);

    //     const outPass = new OutputPass();
    //     composer.addPass(outPass);

    //     return composer;
    // }, [gl, rtt]);

    // useEffect(() => {
    //     myScene.traverse((it: any) => {
    //         if (it.material) {
    //             it.material.color = new Color("#000000");
    //             it.material.emissive = new Color("#fffff");
    //             it.material.emissiveMap = it.material.map;
    //             it.material.emissiveIntensity = 0.1;
    //         }
    //     });
    // }, [children]);

    useFrame((st, dt) => {
        if (canRun) {
            //
            cam.position.x = cameraPosition[0];
            cam.position.y = cameraPosition[1];
            cam.position.z = cameraPosition[2];

            cam.rotation.x = cameraRotation[0];
            cam.rotation.y = cameraRotation[1];
            cam.rotation.z = cameraRotation[2];

            cam.updateMatrixWorld();
            cam.updateProjectionMatrix();

            cam.aspect = width / height;

            st.gl.autoClear = true;
            st.gl.setRenderTarget(rtt);
            st.gl.render(myScene, cam);
            st.gl.setRenderTarget(null);
            st.gl.autoClear = true;
        }
    });

    return (
        <>
            <mesh geometry={cardGeometry}>
                <meshBasicMaterial
                    color={"#ffffff"}
                    map={rtt.texture}
                ></meshBasicMaterial>
            </mesh>

            {createPortal(<>{children}</>, myScene)}

            {/* <EffectComposer renderPriority={1} scene={o3} camera={cam}>
                <Bloom threshold={0}></Bloom>
            </EffectComposer> */}
        </>
    );
}
