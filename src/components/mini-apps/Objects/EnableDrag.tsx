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

        let ttt: any = 0;
        return {
            setItem: async (storeKey = "", value: any) => {
                clearTimeout(ttt);
                ttt = setTimeout(() => {
                    inst.setItem(storeKey, value);
                }, 10);
            },
            getItem: async (storeKey = "") => {
                return await inst.getItem(storeKey);
            },
        };
    });

    useEffect(() => {
        store.getItem("matrix").then((matrixArray) => {
            if (matrixArray instanceof Array) {
                matrix.fromArray(matrixArray);
            } else {
                matrix.copy(
                    matrix.makeTranslation(new Vector3().fromArray(initPos)),
                );
            }

            let v3 = new Vector3();

            // matrix.compose(v3);

            console.log(`initPos={[${v3.toArray()}}]}`, name);
            setReady(true);
        });
    }, []);

    return (
        <>
            <DragControls
                matrix={matrix}
                axisLock="y"
                onDragStart={() => {
                    if (controls) {
                        controls.enabled = false;
                    }
                }}
                onDrag={() => {
                    store.setItem("matrix", matrix.toArray());
                }}
                onDragEnd={() => {
                    if (controls) {
                        controls.enabled = true;
                    }

                    store.setItem("matrix", matrix.toArray());
                }}
            >
                {children}
            </DragControls>
        </>
    );
}
