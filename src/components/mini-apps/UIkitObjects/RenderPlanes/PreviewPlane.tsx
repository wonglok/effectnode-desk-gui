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

export function PreviewPlane({ win }: { win: WinObject }) {
    return (
        <RenderPlane
            width={512 * 1.5}
            height={512 * 1.5}
            colorSpace={NoColorSpace}
            eventPriority={100}
            //
            cameraPosition={[0, 2, 1]}
            cameraRotation={[-0.4, 0, 0]}
        >
            <Suspense fallback={null}>
                <group>
                    <group
                        //
                        rotation={[0, 0, 0]}
                        position={[0, 0, 0]}
                    >
                        <AvatarMotion
                            avatarURL={`/game-asset/rpm/fixed/game-builder.glb`}
                            motionURL={`/game-asset/motion-files/mixamo/dance/silly-dance.fbx`}
                        ></AvatarMotion>
                    </group>
                </group>

                <ambientLight intensity={Math.PI * 1} />

                <Cloud seed={1} position={[0, 0, -2]}></Cloud>
            </Suspense>

            <Sky rayleigh={0.3} azimuth={0.5}></Sky>
        </RenderPlane>
    );
}
