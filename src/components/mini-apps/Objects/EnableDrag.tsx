import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Matrix4, Object3D, Vector3 } from "three";
import { createInstance } from "localforage";
import { DragControls as DragControls3 } from "three/examples/jsm/controls/DragControls.js";
import md5 from "md5";

export function EnableDrag({
    name = "drag",
    children,
    initPos = [0, 0, 0],
}: any) {
    let controls: any = useThree((r) => r.controls);

    let [o3] = useState(new Object3D());
    let [matrix] = useState(new Matrix4());
    let [ready, setReady] = useState(false);

    let [store] = useState(() => {
        let keyname = `${name}_${md5(`${process.env.APP_NAME}`)}_${JSON.stringify(initPos)}`;

        let inst = createInstance({
            name: `${keyname}`,
        });

        return {
            setItem: async (storeKey = "", value: any) => {
                await inst.setItem(storeKey, value);
            },
            getItem: async (storeKey = "") => {
                return await inst.getItem(storeKey);
            },
        };
    });

    useEffect(() => {
        store.getItem("matrix").then((matrixArray) => {
            if (matrixArray instanceof Array) {
                let m4 = new Matrix4();
                m4.fromArray(matrixArray);
                o3.position.setFromMatrixPosition(m4);
            } else {
                o3.position.fromArray(initPos);
            }

            console.log(`initPos={[${o3.position.toArray()}]}`, name);
            setReady(true);
        });
    }, []);

    return (
        <>
            <DragControls
                axisLock="y"
                onDragStart={() => {
                    if (controls) {
                        controls.enabled = false;
                    }
                }}
                onDragEnd={() => {
                    if (controls) {
                        controls.enabled = true;
                    }

                    o3.updateMatrixWorld(true);

                    let v3 = new Vector3();

                    o3.getWorldPosition(v3);

                    matrix.compose(v3, o3.quaternion, o3.scale);

                    store.setItem("matrix", matrix);

                    console.log("save", name, v3.toArray());
                }}
            >
                <primitive object={o3}></primitive>

                {ready &&
                    createPortal(
                        <>
                            {/*  */}
                            {children}
                        </>,
                        o3,
                    )}
            </DragControls>
        </>
    );
}
