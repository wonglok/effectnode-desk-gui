import { useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { AnimationClip, AnimationMixer } from "three";

export function Avatar() {
    let avatar = useGLTF("/avatar/sweater.glb");
    let motion = useFBX(`/avatar/sit.fbx`);

    let mixer = useMemo(() => {
        return new AnimationMixer(avatar.scene);
    }, [avatar.scene]);

    useFrame((st) => {
        mixer.setTime(st.clock.elapsedTime);
    });
    useEffect(() => {
        //
        mixer
            .clipAction(motion.animations[0] as AnimationClip, avatar.scene)
            .play();
        //
        //
    }, [avatar.scene]);

    return (
        <>
            <primitive object={avatar.scene}></primitive>
        </>
    );
}
