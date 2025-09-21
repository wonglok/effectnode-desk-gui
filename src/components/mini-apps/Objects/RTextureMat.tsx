import { easing, geometry } from "maath";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { signal } from "@preact/signals-core";
import {
    Cloud,
    Environment,
    MeshPortalMaterial,
    RenderTexture,
    Sky,
    Sphere,
    useEnvironment,
    useGLTF,
} from "@react-three/drei";
import { Canvas, createPortal, extend, useFrame } from "@react-three/fiber";
import {
    Root,
    Container,
    Text,
    setPreferredColorScheme,
    Content,
    Fullscreen,
    Input,
} from "@react-three/uikit";
import { BellRing, Check } from "@react-three/uikit-lucide";
import {
    Defaults,
    colors,
    Avatar,
    Button,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch,
} from "@react-three/uikit-default";
import { Avatar2 } from "./Avatar2";
import { LinearToSRGB } from "three/src/math/ColorManagement.js";
import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
} from "three";

export function RTextureMat({ children, width = 1024, height = 1024 }: any) {
    let env = useEnvironment({
        files: [`/game-asset/hdr/brown_photostudio_02_1k.hdr`],
    });
    env.mapping = EquirectangularReflectionMapping;

    let ref = useRef<any>(null);

    let o3 = useMemo(() => {
        return new Object3D();
    }, []);
    let rtt = useMemo(() => {
        return new WebGLRenderTarget(width, height);
    }, []);

    let cam = useMemo(() => {
        return new PerspectiveCamera(65, width / height, 0.01, 500);
    }, []);

    useFrame((st) => {
        cam.position.y = 1.7;
        cam.position.z = 0.75;
        cam.rotation.x = -0.1;
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
