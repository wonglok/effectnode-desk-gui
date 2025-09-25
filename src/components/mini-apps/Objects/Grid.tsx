import { Instances, Instance, Merged, Plane } from "@react-three/drei";
import { ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ReactElement } from "react";
import {
    Box3,
    BoxGeometry,
    BufferGeometry,
    CircleGeometry,
    Color,
    ExtrudeGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    Shape,
    ShapeUtils,
    Vector2,
} from "three";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

let primary = new Color("#0077ee").offsetHSL(0.0, 0.0, 0.05);
let grid = new Color(primary).offsetHSL(0, 0, -0.3);
let background = new Color(primary).offsetHSL(0, 0, -0.44);

let colors = {
    primary,
    grid,
    background,
};

function OneItem({
    MySymbol,
    x,
    y,
    rot = [0, 0, 0],
}: {
    rot: [number, number, number];
    MySymbol: any;
    x: number;
    y: number;
}) {
    return (
        <>
            <MySymbol
                key={`xx${x}-yy${y}`}
                rotation={rot}
                position={[x, 0, y]}
            ></MySymbol>
        </>
    );
}

export const Grid = ({ num = 25 }) => {
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
                        MySymbol={meshes.SymbolOne}
                        key={`xx${x}-yy${y}`}
                        rot={[0, Math.PI * 0.5, 0]}
                        x={x + 0.5}
                        y={y + 0.5}
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
                        MySymbol={meshes.SymbolTwo}
                        key={`xx${x}-yy${y}`}
                        rot={[0, Math.PI * 0, 0]}
                        x={x}
                        y={y}
                    ></OneItem>,
                );

                ie++;
                //
            }
        }

        return insts;
    };

    let hexGeo = useMemo(() => {
        let box1: BufferGeometry = new CircleGeometry(0.3, 6).toNonIndexed();

        // box1.rotateZ(Math.PI * 0.5);
        // box1.rotateX(Math.PI * -0.5);
        let array = [];
        let num = box1?.attributes?.position?.count as number;

        for (let ii = 0; ii < num; ii++) {
            //
            let v2 = new Vector2(
                box1.attributes.position?.getX(ii),
                box1.attributes.position?.getY(ii),
            );

            array.push(v2);

            //
        }

        console.log(array);

        const shape = new Shape(array);

        const extrudeSettings = {
            depth: 1,
            bevelEnabled: false,
            bevelSegments: 0,
            steps: 1,
            bevelSize: 0.0,
            bevelThickness: 0.0,
        };

        const geometry = new ExtrudeGeometry(shape, extrudeSettings);
        geometry.rotateX(Math.PI * 0.5);
        geometry.scale(1.2, 0.25, 1.2);
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.center();

        let boundingBox = geometry.boundingBox as Box3;
        geometry.translate(0, (boundingBox.min.y - boundingBox.max.y) / 2, 0);

        return geometry;
    }, []);

    return (
        <>
            <Merged
                count={num * num * 5}
                meshes={{
                    // Cross: new Mesh(
                    //     hexGeo,
                    //     new MeshBasicMaterial({ color: colors.primary }),
                    // ),
                    SymbolOne: new Mesh(
                        hexGeo,
                        new MeshStandardMaterial({
                            color: colors.primary,
                            roughness: 0.25,
                            metalness: 1.0,
                        }),
                    ),
                    SymbolTwo: new Mesh(
                        hexGeo,
                        new MeshStandardMaterial({
                            color: colors.primary,
                            roughness: 1.0,
                            metalness: 0.25,
                        }),
                    ),
                }}
                scale={[2, 1, 2]}
                onPointerEnter={(ev) => {
                    ev.eventObject.userData.hover = 1;
                }}
                onPointerLeave={(ev) => {
                    ev.eventObject.userData.hover = 0;
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
                {/* <icosahedronGeometry args={[0.25, 0]} /> */}
                {/* <meshBasicMaterial color={colors.primary} /> */}
                {/* {insts} */}
            </Merged>

            {/* <gridHelper
                args={[50 * 2, 50, colors.grid, colors.grid]}
                position={[0, -0.01, 0]}
            /> */}

            {/* <Plane
                scale={50}
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
                castShadow
            >
                <meshBasicMaterial
                    color={colors.background}
                ></meshBasicMaterial>
            </Plane> */}

            {/*  */}
        </>
    );
};

//
