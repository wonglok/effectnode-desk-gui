import { Suspense, useEffect, useMemo, useRef } from "react";
import { useEnvironment } from "@react-three/drei";
import { Canvas, createPortal, extend, useFrame } from "@react-three/fiber";

import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
    Bone,
} from "three";

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

    let o3 = useMemo(() => {
        return new Object3D();
    }, []);
    let rtt = useMemo(() => {
        return new WebGLRenderTarget(width, height, {
            //
            stencilBuffer: false,
        });
    }, [width, height]);

    let cam = useMemo(() => {
        return new PerspectiveCamera(65, width / height, 0.01, 500);
    }, []);

    useFrame((st) => {
        cam.rotation.x = position[0];
        cam.position.y = position[1];
        cam.position.z = position[2];

        cam.aspect = 1;

        cam.updateMatrixWorld();
        cam.updateProjectionMatrix();

        st.gl.setRenderTarget(rtt);
        ref.current.environment = env;
        st.gl.render(ref.current, cam);

        st.gl.setRenderTarget(null);
    });

    return (
        <>
            <meshStandardMaterial
                emissive={"#ffffff"}
                emissiveMap={rtt.texture}
            ></meshStandardMaterial>
            {createPortal(<scene ref={ref}>{children}</scene>, o3)}
        </>
    );
}
