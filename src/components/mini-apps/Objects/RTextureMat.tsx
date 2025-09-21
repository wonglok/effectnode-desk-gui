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
} from "three";
import { geometry } from "maath";
import {
    EffectComposer,
    Pass,
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

export function RTextureMat({
    children,
    width = 1024,
    height = 1024,
    position = [-0.1, 1.7, 0.75],
}: any) {
    let env = useEnvironment({
        files: [`/game-asset/hdr/brown_photostudio_02_1k.hdr`],
    });
    env.mapping = EquirectangularReflectionMapping;

    let ref = useRef<any>(null);

    let myScene = useMemo(() => {
        return new Scene();
    }, []);
    let gl = useThree((r) => r.gl);
    let rtt = useMemo(() => {
        return new WebGLRenderTarget(width, height, {
            //
            stencilBuffer: false,
        });
    }, [width, height]);

    let cam = useMemo(() => {
        return new PerspectiveCamera(65, width / height, 0.01, 500);
    }, []);

    let rpass = useMemo(() => {
        myScene.environment = env;
        myScene.environmentIntensity = 0.1;

        let rpass = new RenderPass(myScene, cam);

        return rpass;
    }, [gl, rtt, env]);
    let bloom = useMemo(() => {
        let bloom = new UnrealBloomPass(
            new Vector2(width, height),
            1.5,
            0.4,
            0.85,
        );
        bloom.strength = 0.5;
        bloom.threshold = 0.9;
        bloom.radius = 1;

        return bloom;
    }, [gl, rtt]);

    let composer = useMemo(() => {
        let composer = new EffectComposer(gl, rtt);
        composer.addPass(rpass);

        composer.addPass(bloom);

        const outPass = new OutputPass();
        composer.addPass(outPass);

        return composer;
    }, [gl, rtt]);

    useFrame((st, dt) => {
        //
        cam.rotation.x = position[0];
        cam.position.y = position[1];
        cam.position.z = position[2];
        cam.updateMatrixWorld();
        cam.updateProjectionMatrix();

        cam.aspect = 1;

        composer.render(dt);

        // st.gl.setRenderTarget(rtt);
        // ref.current.environment = env;
        // st.gl.render(ref.current, cam);

        st.gl.setRenderTarget(null);
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
