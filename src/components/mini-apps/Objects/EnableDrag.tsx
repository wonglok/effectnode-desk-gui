import { DragControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Matrix4 } from "three";
import { createInstance } from "localforage";
import md5 from "md5";

export function EnableDrag({ name = "drag", children }: any) {
    let controls: any = useThree((r) => r.controls);

    let [ready, setReady] = useState(false);
    let [matrix, setMatrix] = useState(new Matrix4());

    // let [store] = useState(() => {
    //     return ;
    // });

    let [store] = useState(() => {
        let namespace = `${name}_${md5(`${process.env.APP_NAME}`)}`;

        let inst = createInstance({
            name: `${namespace}`,
        });

        return {
            setItem: async (name = "", value: any) => {
                await inst.setItem(name, value);
            },
            getItem: async (name = "") => {
                return await inst.getItem(name);
            },
        };
    });

    useEffect(() => {
        store.getItem("matrix").then((matrixArray) => {
            console.log(matrixArray);
            if (matrixArray instanceof Array) {
                setMatrix(new Matrix4().fromArray(matrixArray));
            }
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && (
                <DragControls
                    matrix={matrix}
                    // matrix={matrix}
                    axisLock="y"
                    onDragStart={() => {
                        if (controls) {
                            controls.enabled = false;
                        }
                    }}
                    onDrag={(lm, dlm, wm, dwm) => {
                        store.setItem("matrix", lm.toArray());
                    }}
                    onDragEnd={() => {
                        if (controls) {
                            controls.enabled = true;
                        }
                    }}
                >
                    {children}
                </DragControls>
            )}
        </>
    );
}
