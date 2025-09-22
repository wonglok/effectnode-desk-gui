import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Matrix4, Object3D, Vector3 } from "three";
import md5 from "md5";
import { v4 } from "uuid";
import { vanilla } from "@/trpc/react";
import { useParams } from "next/navigation";

let keyname = `position__store__`;
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
    let params = useParams();
    let workspaceID = params.workspaceID;
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
                    vanilla.object.write.mutate({
                        workspaceID: `${workspaceID}`,
                        type: "movement",
                        key: `_${`${workspaceID}_${name}`}`,
                        value: val,
                    });
                    //
                }, 500);
            },
            getItem: async (name: string) => {
                //

                console.log(name);
                return await vanilla.object.readOneByKey
                    .mutate({
                        workspaceID: `${workspaceID}`,
                        key: `_${`${workspaceID}_${name}`}`,
                    })
                    .then((v) => {
                        console.log(v);
                        return v;
                    });
            },
            ready: async () => {},
        };
    }, [workspaceID]);

    //
    useEffect(() => {
        if (!workspaceID) {
            return;
        }

        if (!name) {
            return;
        }
        let run = async () => {
            //

            let val = await store.getItem(`${name}`);

            console.log(val);

            if (val?.value) {
                o3API.o3.position.fromArray(val?.value);
            } else {
                o3API.o3.position.fromArray(initPos);
            }

            //
        };

        run().finally(() => {
            setReady(true);
        }); //
        //
        //
    }, [name, workspaceID]);

    //

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
                            `${keyname}${name}`,
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
