import { useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { AnimationClip, AnimationMixer } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export function AvatarMotion({
    avatarURL = "/avatar/angel.glb",
    motionURL = `/game-asset/motion-files/mixamo/greet/standup-greeting.fbx`,
}) {
    //
    let avatarRaw = useGLTF(avatarURL);
    let motion = useFBX(motionURL);

    let avatar = useMemo(() => {
        let s = clone(avatarRaw.scene);
        s.traverse((i) => {
            i.frustumCulled = false;
        });
        return {
            scene: s,
        };
    }, [avatarRaw]);
    let mixer = useMemo(() => {
        return new AnimationMixer(avatar.scene);
    }, [avatar.scene]);

    useFrame((st) => {
        mixer.setTime(st.clock.elapsedTime);
    });
    useEffect(() => {
        //
        let act = mixer
            .clipAction(motion.animations[0] as AnimationClip, avatar.scene)
            .play();
        //
        //
        return () => {
            act.stop();
        };
    }, [avatar.scene, motion]);

    return (
        <>
            <primitive object={avatar.scene}></primitive>
        </>
    );
}
