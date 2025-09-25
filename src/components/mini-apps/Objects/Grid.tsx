import { Instances, Instance, Merged, Plane } from "@react-three/drei";
import { ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
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
    PlaneGeometry,
    Shape,
    ShapeUtils,
    SphereGeometry,
    SRGBColorSpace,
    Vector2,
    Vector3,
} from "three";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

let primary = new Color("#DE9E49").offsetHSL(0.0, 0.0, 0.05);
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
    //
    let ref = useRef<Object3D>(null);

    let color = useMemo(() => {
        return new Color("#ff0000");
    }, []);

    //
    useFrame((st, dt) => {
        if (ref.current) {
            let val = (st as any).controls?.target as Vector3;
            let val2 = val.clone();
            val2.y = 0;
            let mypos = ref.current.position.clone();
            mypos.y = 0;
            if (val) {
                let maxi = 50;
                let dist = val2.distanceTo(mypos);
                if (dist >= maxi) {
                    dist = maxi;
                }
                dist = maxi - dist;

                easing.damp(
                    ref.current.position,
                    "y",
                    -5 + Math.pow(dist / maxi, 3.5) * 5,
                    0.2,
                    dt,
                );
                easing.damp(
                    ref.current.scale,
                    "y",
                    Math.pow(dist / maxi, 3.5) * 1,
                    0.2,
                    dt,
                );

                easing.damp(
                    ref.current.rotation,
                    "z",
                    Math.pow(dist / maxi, 3.5) * Math.PI,
                    0.2,
                    dt,
                );
                easing.damp(
                    ref.current.rotation,
                    "x",
                    Math.pow(dist / maxi, 3.5) * Math.PI,
                    0.2,
                    dt,
                );

                /////

                easing.damp(
                    ref.current.scale,
                    "x",
                    Math.pow(dist / maxi, 3.5) * 2.5,
                    0.2,
                    dt,
                );

                easing.damp(
                    ref.current.scale,
                    "z",
                    Math.pow(dist / maxi, 3.5) * 2.5,
                    0.2,
                    dt,
                );

                if ((ref.current as any).color) {
                    let col = (ref.current as any).color as Color;
                    col.setHSL(
                        Math.pow(dist / maxi, 5.5) + st.clock.elapsedTime * 0.2,
                        1.0,
                        0.65,
                        SRGBColorSpace,
                    );
                }
            }
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
                        rot={[0, Math.PI * 0.0, 0]}
                        x={x * 2 + 1}
                        y={y * 2 + 1}
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
        let box1: BufferGeometry = new CircleGeometry(0.3, 20).toNonIndexed();

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

        const shape = new Shape(array);

        const extrudeSettings = {
            steps: 1,
            depth: 1,
            bevelEnabled: false,
            bevelSegments: 0,
            bevelSize: 0.0,
            bevelThickness: 0.0,
        };

        let geometry = new ExtrudeGeometry(shape, extrudeSettings);
        geometry.rotateZ(Math.PI * 0.5);
        geometry.rotateX(Math.PI * 0.5);
        geometry.scale(1, 0.1, 1);
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
                frustumCulled={false}
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
                            roughness: 0.3,
                            metalness: 1.0,
                        }),
                    ),
                    SymbolTwo: new Mesh(
                        hexGeo,
                        new MeshStandardMaterial({
                            color: colors.primary,
                            roughness: 1.0,
                            metalness: 0.2,
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
