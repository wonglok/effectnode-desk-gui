import { DragControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Matrix4, Object3D, Vector3 } from "three";
import md5 from "md5";
import { v4 } from "uuid";
import { vanilla } from "@/trpc/react";
import { useParams } from "next/navigation";
import type { WinObject } from "../useMiniApps";

let keyname = `position__store__`;
let isDown: any = { current: "" };

let st = new Object3D();
let lt = new Object3D();
let nt = new Object3D();
let dt = new Object3D();
let at = new Object3D();

export function EnableDrag({
    win,
    show = null,
    grab = null,
    initPos = [0, 0, 0],
}: {
    children?: ReactElement | null;
    show?: ReactElement | null;
    grab?: ReactElement | null;
    win: WinObject;
    initPos?: [number, number, number];
}) {
    let params = useParams();
    // let workspaceID = params.workspaceID;
    let myRand = useMemo(() => {
        return `${v4()}`;
    }, []);

    let [grabAPI, setO3] = useState(() => {
        let o3 = new Object3D();
        return {
            o3,
            display: <primitive object={o3}></primitive>,
        };
    });

    let [showAPI] = useState(() => {
        let o3 = new Object3D();
        return {
            o3,
            display: <primitive object={o3}></primitive>,
        };
    });

    useEffect(() => {
        grabAPI.o3.position.fromArray(win.value.position);
        showAPI.o3.position.fromArray(win.value.position);
    }, [win]);

    let controls: any = useThree((r) => r.controls);

    return (
        <>
            {
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

                        st.position.copy(grabAPI.o3.position);

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

                            grabAPI.o3.position.add(dt.position);
                            showAPI.o3.position.add(dt.position);
                        }
                    }}
                    onDragEnd={() => {
                        //
                        // store.setItem(
                        //     `${keyname}${name}`,
                        //     JSON.parse(
                        //         JSON.stringify(grabAPI.o3.position.toArray()),
                        //     ),
                        // );
                        //

                        if (win) {
                            win.value.position = grabAPI.o3.position.toArray();
                            vanilla.object.write.mutate({
                                type: win.type as string,
                                workspaceID: win.workspaceID as string,
                                key: win.key as string,
                                value: win.value as any,
                            });
                        }

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
                    {createPortal(<>{grab}</>, grabAPI.o3)}
                    {grabAPI.display}
                </DragControls>
            }

            {createPortal(<>{show}</>, showAPI.o3)}
            {showAPI.display}
        </>
    );
}
