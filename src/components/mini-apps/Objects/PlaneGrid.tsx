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

import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

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
    let gp = useRef<Object3D>(null);

    let color = useMemo(() => {
        return BrandColors.grid.clone().offsetHSL(0, 0.1, 0.1);
    }, []);

    useFrame((st, dt) => {
        refTime.current += dt * 0.5;

        if (ref.current) {
            if (type === "1") {
                //

                ref.current.rotation.z += dt * 0.25;

                //
            }
            if (type === "2") {
                //

                ref.current.rotation.x += dt * 0.25;

                //
            }
        }
    });

    //

    return (
        <>
            <group position={[x, 0, y]} ref={gp}>
                <MySymbol
                    ref={ref}
                    frustumCulled={false}
                    key={`xx${x}-yy${y}`}
                    rotation={rot}
                    color={color}
                ></MySymbol>
            </group>
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
                        rot={[0, 0, Math.random() * Math.PI]}
                        x={x * 4}
                        y={y * 4}
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
                        rot={[Math.random() * Math.PI, 0, 0]}
                        x={x * 4}
                        y={y * 4}
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
            0.025,
            0.025,
            1,
            7,
        ).toNonIndexed();

        box1 = new SphereGeometry(0.075, 7, 7).toNonIndexed();
        box1.scale(1.5, 5, 1.5);

        box1.rotateX(Math.PI * -0.5);
        box1.center();
        box1.computeVertexNormals();
        box1.computeBoundingBox();
        if (box1.boundingBox) {
            box1.translate(
                0,
                (box1.boundingBox?.max.y + box1.boundingBox?.min.y) * -1,
                0,
            );
        }

        let b1 = box1.clone();
        let b2 = box1.clone();
        b1.translate(0, 0, box1.boundingBox?.max?.z || 0);
        b2.translate(0, 0, box1.boundingBox?.min?.z || 0);

        let com = mergeGeometries([b1, b2]);
        com.center();
        com.computeVertexNormals();

        return com;
    }, []);

    let circleGeo = useMemo(() => {
        let box1: BufferGeometry = new CylinderGeometry(
            0.025,
            0.025,
            1,
            7,
        ).toNonIndexed();

        box1 = new SphereGeometry(0.075, 7, 7).toNonIndexed();
        box1.scale(1.5, 5, 1.5);

        box1.rotateX(Math.PI * -0.5);
        box1.rotateY(Math.PI * -0.5);
        box1.center();
        box1.computeVertexNormals();
        box1.computeBoundingBox();
        if (box1.boundingBox) {
            box1.translate(
                0,
                (box1.boundingBox?.max.y + box1.boundingBox?.min.y) * -1,
                0,
            );
        }

        let b1 = box1.clone();
        let b2 = box1.clone();
        b1.translate(box1.boundingBox?.max?.x || 0, 0, 0);
        b2.translate(box1.boundingBox?.min?.x || 0, 0, 0);

        let com = mergeGeometries([b1, b2]);
        com.center();
        com.computeVertexNormals();

        return com;
    }, []);

    return (
        <>
            {
                <Merged
                    ref={ref}
                    frustumCulled={false}
                    count={num * num * 2}
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
                                roughness: 0.15,
                                metalness: 1.0,
                            }),
                        ),
                        //
                        //
                        //
                        SymbolTwo: new Mesh(
                            circleGeo,
                            new MeshStandardMaterial({
                                flatShading: true,
                                color: BrandColors.primary,
                                roughness: 0.15,
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
    let scene = useThree((r) => r.scene);

    useEffect(() => {
        scene.background = BrandColors.background;
    }, [scene]);

    return (
        <>
            <group position={[0, -0.2, 0]}>
                <PlusGrid></PlusGrid>

                <Plane
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
            </group>
        </>
    );
}
