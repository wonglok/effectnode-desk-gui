import { useEffect } from "react";
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

    let scene = useThree((r) => r.scene);
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
            scene.background = tex;
        });
    }, []);

    return (
        <>
            {/*  */}

            {apps.map((app) => {
                return <OneMiniApp key={app._id} app={app}></OneMiniApp>;
            })}

            {/*  */}
        </>
    );
}
