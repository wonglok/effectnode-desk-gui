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
    let [d3] = useState(new Object3D());
    let [ready, setReady] = useState(false);

    // let [store] = useState(() => {
    //     return ;
    // });

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
            }
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

                    store.setItem("matrix", o3.matrixWorld.toArray());
                }}
            >
                <primitive object={o3}></primitive>
            </DragControls>

            {ready &&
                createPortal(
                    <>
                        {/*  */}
                        {children}
                    </>,
                    o3,
                )}
        </>
    );
}
