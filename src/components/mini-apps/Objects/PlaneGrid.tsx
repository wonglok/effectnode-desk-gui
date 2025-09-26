import { cursor } from "./Grid";
import { BrandColors } from "./BrandColors";
import { useMiniApps } from "../useMiniApps";
import { Instances, Instance, Merged, Plane, Select } from "@react-three/drei";
import { ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, type ReactElement } from "react";
import {
    Box3,
    BoxGeometry,
    BufferGeometry,
    CircleGeometry,
    Color,
    CylinderGeometry,
    ExtrudeGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    PlaneGeometry,
    Shape,
    ShapeUtils,
    SphereGeometry,
    SRGBColorSpace,
    Vector2,
    Vector3,
} from "three";

// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

function OneItem({
    type,
    MySymbol,
    x,
    y,
    rot = [0, 0, 0],
}: {
    type: string;
    rot: [number, number, number];
    MySymbol: any;
    x: number;
    y: number;
}) {
    let refTime = useRef<number>(0);
    //
    let ref = useRef<Object3D>(null);

    let color = useMemo(() => {
        return BrandColors.grid;
    }, []);

    useFrame((st, dt) => {
        refTime.current += dt * 0.5;

        if (ref.current) {
            if (type === "1") {
                //
                ref.current.rotation.z += dt;
                //
            }
            if (type === "2") {
                //
                ref.current.rotation.x += dt;
                //
            }

            //
            // let val = (st as any).controls?.target as Vector3;
            // if (!val) {
            //     val = new Vector3(0, 0, 0);
            // }
            // let ppapVV = val.clone();
            // if ((cursor as any)?.force) {
            //     ppapVV.copy(cursor);
            // } else if ("ontouchstart" in window) {
            // } else {
            //     ppapVV.copy(cursor);
            // }
            // ppapVV.y = 0;
            // let mypos = ref.current.position.clone();
            // if (ppapVV) {
            // }
            //
        }
    });

    //

    return (
        <>
            <MySymbol
                ref={ref}
                frustumCulled={false}
                key={`xx${x}-yy${y}`}
                rotation={rot}
                position={[x, 0, y]}
                color={color}
            ></MySymbol>
        </>
    );
}

const PlusGrid = ({ ref, num = 25 }: any) => {
    let getLayout1 = ({ meshes }: { meshes: any }) => {
        let insts = [];

        let ie = 0;
        for (let y = -Math.floor(num * 0.5); y <= Math.floor(num * 0.5); y++) {
            //
            for (
                let x = -Math.floor(num * 0.5);
                x <= Math.floor(num * 0.5);
                x++
            ) {
                //
                insts.push(
                    <OneItem
                        type="1"
                        MySymbol={meshes.SymbolOne}
                        key={`xx${x}-yy${y}`}
                        rot={[0, 0, x / num]}
                        x={x * 2}
                        y={y * 2}
                    ></OneItem>,
                );

                ie++;
                //
            }
        }

        return insts;
    };

    let getLayout2 = ({ meshes }: any) => {
        let insts = [];

        let ie = 0;
        for (let y = -Math.floor(num * 0.5); y <= Math.floor(num * 0.5); y++) {
            //
            for (
                let x = -Math.floor(num * 0.5);
                x <= Math.floor(num * 0.5);
                x++
            ) {
                //
                insts.push(
                    <OneItem
                        type="2"
                        MySymbol={meshes.SymbolTwo}
                        key={`xx${x}-yy${y}`}
                        rot={[y / num, 0, 0]}
                        x={x * 2}
                        y={y * 2}
                    ></OneItem>,
                );

                ie++;
                //
            }
        }

        return insts;
    };

    let hexGeo = useMemo(() => {
        let box1: BufferGeometry = new CylinderGeometry(
            0.05,
            0.05,
            1,
            5,
        ).toNonIndexed();
        box1.rotateX(Math.PI * -0.5);
        box1.center();

        return box1;
    }, []);

    let circleGeo = useMemo(() => {
        let box1: BufferGeometry = new CylinderGeometry(
            0.05,
            0.05,
            1,
            5,
        ).toNonIndexed();
        box1.rotateX(Math.PI * -0.5);
        box1.rotateY(Math.PI * -0.5);
        box1.center();

        return box1;
    }, []);

    return (
        <>
            {
                <Merged
                    ref={ref}
                    frustumCulled={false}
                    count={num * num * 5}
                    meshes={{
                        //
                        // Cross: new Mesh(
                        //     hexGeo,
                        //     new MeshBasicMaterial({ color: colors.primary }),
                        // ),
                        //
                        SymbolOne: new Mesh(
                            hexGeo,
                            new MeshStandardMaterial({
                                flatShading: true,
                                color: BrandColors.primary,
                                roughness: 0.0,
                                metalness: 1.0,
                            }),
                        ),
                        SymbolTwo: new Mesh(
                            circleGeo,
                            new MeshStandardMaterial({
                                flatShading: true,
                                color: BrandColors.primary,
                                roughness: 0.0,
                                metalness: 1.0,
                            }),
                        ),
                    }}
                >
                    {(meshes: any) => {
                        return (
                            <>
                                {getLayout1({
                                    meshes: meshes,
                                })}

                                {getLayout2({
                                    meshes: meshes,
                                })}
                            </>
                        );
                    }}
                </Merged>
            }

            {/*  */}
        </>
    );
};

//

export function PlaneGrid() {
    let selection = useMiniApps((r) => r.selection);

    let ref = useRef<any>(null);
    useEffect(() => {
        let el: any = ref.current;

        if (el) {
            selection.push(el);

            return () => {
                selection.splice(
                    selection.findIndex((s) => s.uuid === el.uuid),
                    1,
                );
                useMiniApps.setState({
                    selection: [...selection],
                });
            };
        }
    }, []);
    return (
        <>
            {/* <gridHelper
                args={[50 * 2, 50, BrandColors.grid, BrandColors.grid]}
                position={[0, -0.01, 0]}
            /> */}
            <PlusGrid ref={ref}></PlusGrid>

            <Plane
                // ref={(ev: any) => {
                //     if (ev) {
                //         let newSel = [selection];

                //         if (newSel.some((r: any) => r?.uuid === ev?.uuid)) {
                //             newSel.push(ev);
                //         }

                //         useMiniApps.setState({
                //             selection: newSel,
                //         });
                //     }
                // }}
                onPointerMove={(st) => {
                    cursor.copy(st.point);
                }}
                scale={100}
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -0.1, 0]}
            >
                <meshBasicMaterial
                    color={BrandColors.background}
                ></meshBasicMaterial>
            </Plane>
        </>
    );
}
