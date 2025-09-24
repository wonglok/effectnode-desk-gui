import { Box, Center, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import md5 from "md5";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    AnimationClip,
    AnimationMixer,
    Box3,
    DoubleSide,
    Mesh,
    Object3D,
    Vector3,
} from "three";
import { v4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { suspend } from "suspend-react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export function AvatarMotion({
    lookAt = false,
    avatarURL = "/avatar/angel.glb",
    motionURL = `/game-asset/motion-files/mixamo/greet/standup-greeting.fbx`,
}: any) {
    return (
        <>
            {/* <primitive object={avatar.scene}></primitive> */}
            <AvatarLoader
                lookAt={lookAt}
                motionURL={motionURL}
                avatarURL={avatarURL}
            ></AvatarLoader>
        </>
    );
}

function AvatarLoader({ lookAt, avatarURL, motionURL }: any) {
    const [motion, glb] = suspend(async () => {
        let draco = new DRACOLoader();
        draco.setDecoderPath(`/libs/draco`);

        let gltf = new GLTFLoader();
        gltf.setDRACOLoader(draco);

        let fbx = new FBXLoader();

        return await Promise.all([
            fbx.loadAsync(motionURL),
            gltf.loadAsync(avatarURL.toString()),
        ]);
    }, [avatarURL, motionURL]);

    const outputBox: any = suspend(async () => {
        return await new Promise((resovle) => {
            let box = new Box3();
            box.setFromObject(glb.scene);

            let size = new Vector3();
            box.getSize(size);

            resovle({
                display: <Box visible={false} scale={size.toArray()}></Box>,
                size,
            });
        });
    }, [glb.scene.uuid]);

    let [api, setAPI] = useState({
        func: (a: any, b: any) => {},
        o3d: new Object3D(),
        motion: new Object3D(),
        glbScene: new Object3D(),
        display: <group></group>,
    });

    useEffect(() => {
        let run = async () => {
            let o3d = new Object3D();

            let glbScene = clone(glb.scene);
            glbScene.visible = false;

            let mixer = new AnimationMixer(motion);
            mixer.setTime(1 / 60);
            mixer.clipAction(motion.animations[0] as any).play();
            mixer.setTime(2 / 60);

            let actions: any[] = [];
            motion.traverse((motionBone: any) => {
                if (motionBone.isBone) {
                    //
                    let avatarBone = glbScene.getObjectByName(motionBone.name);

                    if (avatarBone) {
                        actions.push((st: any, dt: any) => {
                            // motionBone.getWorldQuaternion(
                            //     avatarBone.quaternion,
                            // );
                            // avatarBone.position
                            //     .copy(motionBone.position)
                            //     .multiplyScalar(1 / 100);

                            // motionBone.getWorldPosition(avatarBone.position);

                            avatarBone.quaternion.copy(motionBone.quaternion);

                            if (avatarBone.name === "Hips") {
                                // motionBone.getWorldScale(avatarBone.scale);
                                avatarBone.rotation.x += Math.PI * -0.5;
                                // avatarBone.position
                                //     .copy(motionBone.position)
                                //     .multiplyScalar(1);
                            }

                            // console.log(motionBone.quaternion);
                            // avatarBone.quaternion.copy(it.quaternion);
                        });
                    }
                    // console.log(bone.name);
                }
            });

            //
            setAPI({
                display: (
                    <>
                        <group position={[0, 0, 0]}>
                            <primitive object={glbScene}></primitive>
                        </group>
                        <primitive object={motion}></primitive>
                    </>
                ),
                o3d: o3d,
                motion: motion,
                glbScene: glbScene,

                func: (st: any, dt: any) => {
                    if (dt >= 1 / 30) {
                        dt = 1 / 30;
                    }
                    mixer.update(dt);

                    actions.forEach((fnc) => {
                        fnc(st, dt);
                    });

                    glbScene.traverse((it: Partial<any>) => {
                        if (it.material) {
                            it.frustumCulled = false;
                            it.material.side = DoubleSide;
                            it.material.depthTest = true;
                            it.material.depthWrite = true;
                        }
                    });

                    glbScene.visible = true;
                },
            });

            //
        };
        run();
    }, [motion, glb]);

    useFrame((st, dt) => {
        api.func(st, dt);

        if (lookAt) {
            api.glbScene
                .getObjectByName("Head")
                ?.lookAt(new Vector3().fromArray(lookAt));
        }
    });

    return (
        <>
            {/*  */}
            {outputBox.display}
            {api.display}
        </>
    );
}
