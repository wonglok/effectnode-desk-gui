import { DragControls } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import { Box3, BoxGeometry, Matrix4, Mesh, Object3D, Vector3 } from "three";
import md5 from "md5";
import { v4 } from "uuid";
import { vanilla } from "@/trpc/react";
import type { WinObject } from "../useMiniApps";

let keyname = `position__store__`;
let isDown: any = { current: "" };

let st = new Object3D();
let lt = new Object3D();
let nt = new Object3D();
let dt = new Object3D();
let at = new Object3D();

const SomeContext = createContext(new Object3D());

export function DragBlock({ children = null }: any) {
    let grab = useContext<Object3D>(SomeContext);

    let ref = useRef<any>(null);

    let box = useMemo(() => {
        return new Box3();
    }, []);

    let size = useMemo(() => {
        return new Vector3();
    }, []);

    let drag = useMemo(() => {
        let o3 = new Mesh(new BoxGeometry(1, 1, 1));
        return {
            o3: o3,
            display: <primitive object={o3}></primitive>,
        };
    }, []);

    useFrame(() => {
        if (ref.current) {
            box.makeEmpty();
            box.setFromObject(ref.current);
            box.getSize(size);

            ref.current.getWorldQuaternion(drag.o3.quaternion);
        }
    });

    return (
        <>
            {drag.display}
            <group ref={ref}>{children}</group>
        </>
    );
}

export function EnableDrag({
    win,
    show = (v: any) => <></>,
    grab = (v: any) => <></>,
}: {
    children?: ReactElement | null;
    show?: ({ o3 }: any) => ReactElement;
    grab?: ({ o3 }: any) => ReactElement;
    win: WinObject;
}) {
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

    useEffect(() => {
        let hh = () => {
            isDown.current = "";
            controls.enabled = true;
        };
        window.addEventListener("blur", hh);
        window.addEventListener("touchend", hh);
        window.addEventListener("touchcancel", hh);
        window.addEventListener("pointerup", hh);
        window.addEventListener("mouseup", hh);
        return () => {
            window.removeEventListener("blur", hh);
            window.removeEventListener("touchend", hh);
            window.removeEventListener("touchcancel", hh);
            window.removeEventListener("pointerup", hh);
            window.removeEventListener("mouseup", hh);
        };
    }, [controls]);

    return (
        <>
            <SomeContext.Provider value={grabAPI.o3}>
                {
                    <DragControls
                        autoTransform={false}
                        axisLock="y"
                        onDragStart={() => {
                            //

                            if (isDown.current === "") {
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
                                lm.decompose(
                                    nt.position,
                                    nt.quaternion,
                                    nt.scale,
                                );

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
                                win.value.position =
                                    grabAPI.o3.position.toArray();
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
                        {createPortal(
                            <>{grab({ o3: grabAPI.o3 })}</>,
                            grabAPI.o3,
                        )}
                        {grabAPI.display}
                    </DragControls>
                }

                {createPortal(<>{show({ o3: grabAPI.o3 })}</>, showAPI.o3)}
                {showAPI.display}
            </SomeContext.Provider>
        </>
    );
}
