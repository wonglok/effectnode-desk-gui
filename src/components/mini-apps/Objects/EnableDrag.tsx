import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Matrix4, Object3D, Vector3 } from "three";
import md5 from "md5";

let keyname = `position_store_${md5(`${process.env.APP_NAME}`)}}`;
let isDown = { current: false };

export function EnableDrag({
    name = "drag",
    children,
    initPos = [0, 0, 0],
}: any) {
    let controls: any = useThree((r) => r.controls);

    let [matrix, setMatrix] = useState(new Matrix4());
    let [ready, setReady] = useState(false);
    let store = useMemo(() => {
        let tt: any;
        return {
            setItem: async (name: string, val: any) => {
                //
                clearTimeout(tt);
                tt = setTimeout(() => {
                    //
                    //
                }, 100);
            },
            getItem: async (name: string) => {
                //
            },
        };
    }, []);

    //
    useEffect(() => {
        let run = async () => {
            //
            // let m4 = new Matrix4().makeTranslation(
            //     new Vector3().fromArray(initPos),
            // );
            // setMatrix(m4);
            // await store.ready((err) => {
            //     console.log(err);
            // });
            // let val = await store.getItem(name);
            // console.log(name, "val", val);
            // if (val instanceof Array) {
            //     let m5 = new Matrix4().fromArray(val);
            //     setMatrix(m5);
            // }
            //
        };

        run().finally(() => {
            setReady(true);
        }); //
        //
        //
    }, [name]);

    return (
        <>
            {ready && matrix && (
                <DragControls
                    matrix={matrix}
                    axisLock="y"
                    onDragStart={() => {
                        if (isDown.current) {
                            return;
                        }

                        if (controls) {
                            controls.enabled = false;
                        }

                        isDown.current = true;
                    }}
                    onDrag={() => {
                        if (isDown.current) {
                            store.setItem(
                                name,
                                JSON.parse(JSON.stringify(matrix.toArray())),
                            );
                        }
                    }}
                    onDragEnd={() => {
                        store.setItem(
                            name,
                            JSON.parse(JSON.stringify(matrix.toArray())),
                        );

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
