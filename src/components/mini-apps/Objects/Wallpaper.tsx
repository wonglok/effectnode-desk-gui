import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from "three";

export function Wallpaper() {
    let viewport = useThree((r) => r.viewport);
    let [api, setAPI] = useState(() => {
        let tex = new TextureLoader().load(`/login/en/login.png`);
        let o3 = new Mesh(
            new PlaneGeometry(1, 1),
            new MeshBasicMaterial({ map: tex }),
        );
        return {
            o3d: o3,
            display: <primitive object={o3}></primitive>,
        };
    });

    //

    return (
        <group scale={1}>
            {1 <= viewport.aspect && (
                <group scale={[viewport.width, viewport.width, 1]}>
                    {api.display}
                </group>
            )}

            {1 > viewport.aspect && (
                <group scale={[viewport.height, viewport.height, 1]}>
                    {api.display}
                </group>
            )}
        </group>
    );
}
