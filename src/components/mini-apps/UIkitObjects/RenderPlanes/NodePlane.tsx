import { Suspense, useEffect, useMemo, useRef } from "react";
import { Sky, useEnvironment } from "@react-three/drei";
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
import { RenderPlane } from "../../Objects/RenderPlane";
import { AvatarMotion } from "../../Objects/AvatarMotion";
import { Cloud } from "@react-three/drei";
import type { WinObject } from "../../useMiniApps";

// const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

export function NodePlane({ win }: { win: WinObject }) {
    return (
        <RenderPlane
            width={512 * 1.5}
            height={512 * 1.5}
            colorSpace={NoColorSpace}
            eventPriority={100}
            cameraPosition={[0, 1.6, 1]}
            cameraRotation={[-0.2, 0, 0]}
        >
            <Suspense fallback={null}>
                <group>
                    <group
                        rotation={[0, Math.PI * 0.0, 0]}
                        position={[0, 0, 0]}
                    >
                        <AvatarMotion
                            avatarURL={`/avatar/sweater.glb`}
                            motionURL={`/avatar/sit.fbx`}
                            lookAt={[0, 1.5, 1]}
                        ></AvatarMotion>
                    </group>
                </group>

                <ambientLight intensity={Math.PI * 0.5} />

                <Sky rayleigh={0.3} azimuth={0.5}></Sky>

                <Cloud position={[0, -1, -2]}></Cloud>

                <ambientLight intensity={1}></ambientLight>

                {/*  */}
            </Suspense>
        </RenderPlane>
    );
}
