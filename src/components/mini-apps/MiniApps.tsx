import { useEffect, useState } from "react";
import { OneMiniApp } from "./OneMiniApp";
import { useMiniApps } from "./useMiniApps";
import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    TextureLoader,
} from "three";
import { useThree } from "@react-three/fiber";

export function MiniApps() {
    let apps = useMiniApps((r) => r.apps);

    let viewport = useThree((r) => r.viewport);
    let scene = useThree((r) => r.scene);
    let [api, setAPI] = useState<any>({ aspect: 1, tex: null, display: null });
    useEffect(() => {
        let room = "/bg/room.jpg";

        let textureloader = new TextureLoader();
        textureloader.loadAsync(room).then((tex) => {
            tex.needsPMREMUpdate = true;
            tex.mapping = EquirectangularReflectionMapping;
            tex.colorSpace = SRGBColorSpace;
            scene.environment = tex;
        });

        textureloader.loadAsync(room).then((tex) => {
            tex.needsUpdate = true;
            tex.colorSpace = SRGBColorSpace;

            setAPI({
                aspect: tex.width / tex.height,
                tex: tex,
                display: (
                    <mesh>
                        <planeGeometry
                            args={[tex.width / tex.height, 1]}
                        ></planeGeometry>
                        <meshBasicMaterial map={tex}></meshBasicMaterial>
                    </mesh>
                ),
            });
        });
    }, []);

    return (
        <>
            {/*  */}

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

            {apps.map((app) => {
                return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
            })}

            {/*  */}
        </>
    );
}
