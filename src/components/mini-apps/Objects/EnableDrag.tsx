import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Matrix4, Object3D, Vector3 } from "three";
import md5 from "md5";
import { v4 } from "uuid";

let keyname = `position_store_${md5(`${process.env.APP_NAME}`)}}`;
let isDown: any = { current: "" };

let st = new Object3D();
let lt = new Object3D();
let nt = new Object3D();
let dt = new Object3D();
let at = new Object3D();

export function EnableDrag({
    name = "drag",
    children,
    initPos = [0, 0, 0],
}: any) {
    let myRand = useMemo(() => {
        return `${v4()}`;
    }, []);
    let controls: any = useThree((r) => r.controls);

    let [o3API, setO3] = useState(() => {
        let o3 = new Object3D();
        return {
            o3,
            display: <primitive object={o3}></primitive>,
        };
    });
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
            {ready && (
                <DragControls
                    autoTransform={false}
                    axisLock="y"
                    onDragStart={() => {
                        if (!isDown.current) {
                            isDown.current = myRand;

                            lt.position.multiplyScalar(0);
                            dt.position.multiplyScalar(0);
                            st.position.multiplyScalar(0);
                            nt.position.multiplyScalar(0);
                            at.position.multiplyScalar(0);
                        }

                        st.position.copy(o3API.o3.position);

                        if (controls) {
                            controls.enabled = false;
                        }
                    }}
                    onDrag={(lm, dlm, wm, dwm) => {
                        // store.setItem(name, JSON.parse(JSON.stringify(lm)));

                        if (isDown.current === myRand) {
                            lm.decompose(nt.position, nt.quaternion, nt.scale);

                            if (lt.position.length() === 0) {
                                lt.position.copy(nt.position);
                            }
                            dt.position.copy(nt.position).sub(lt.position);

                            lt.position.copy(nt.position);

                            at.position.add(dt.position);

                            o3API.o3.position.add(dt.position);
                        }
                    }}
                    onDragEnd={() => {
                        store.setItem(
                            name,
                            JSON.parse(
                                JSON.stringify(o3API.o3.position.toArray()),
                            ),
                        );

                        lt.position.multiplyScalar(0);
                        dt.position.multiplyScalar(0);
                        st.position.multiplyScalar(0);
                        nt.position.multiplyScalar(0);
                        at.position.multiplyScalar(0);

                        if (controls) {
                            controls.enabled = true;
                        }
                        isDown.current = "";
                    }}
                >
                    {createPortal(<>{children}</>, o3API.o3)}
                    {o3API.display}
                </DragControls>
            )}
        </>
    );
}
