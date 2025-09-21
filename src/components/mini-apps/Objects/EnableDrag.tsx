import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
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

    let [matrix] = useState(new Matrix4());
    let [ready, setReady] = useState(false);

    let store = useMemo(() => {
        let keyname = `position_store_${md5(`${process.env.APP_NAME}`)}}`;

        let inst = createInstance({
            name: `${keyname}`,
        });

        let ttt: any = 0;

        return {
            inst: inst,
            setItem: async (storeKey = "", value: any) => {
                clearTimeout(ttt);
                ttt = setTimeout(() => {
                    inst.setItem(storeKey, value);
                }, 50);
            },
            getItem: async (storeKey = "") => {
                return inst.getItem(storeKey);
            },
        };
    }, [name]);

    useEffect(() => {
        //
        //
        //

        let prom = new Promise((resolve) => {
            let ttt = setInterval(async () => {
                let data = await store.getItem(name);
                if (data instanceof Array) {
                    resolve(data);
                    clearInterval(ttt);
                }
            });
        });

        prom.then((val) => {
            //
            if (val instanceof Array) {
                matrix.fromArray(val);
            } else {
                //
                matrix.copy(
                    matrix.makeTranslation(new Vector3().fromArray(initPos)),
                );
            }
            //
        }).finally(() => {
            setReady(true);
        });

        //
        //
        //
    }, [name, store]);

    let isDown = useRef(false);
    return (
        <>
            {ready && (
                <DragControls
                    matrix={matrix}
                    axisLock="y"
                    onDragStart={() => {
                        if (controls) {
                            controls.enabled = false;
                        }
                        isDown.current = true;
                    }}
                    onDrag={() => {
                        if (isDown.current) {
                            store.setItem(name, matrix.toArray());
                        }
                    }}
                    onDragEnd={() => {
                        if (controls) {
                            controls.enabled = true;
                        }
                        isDown.current = false;
                    }}
                >
                    {children}
                </DragControls>
            )}
        </>
    );
}
