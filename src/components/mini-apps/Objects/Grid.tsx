import { Instance, Instances, Merged, Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
    BoxGeometry,
    BufferGeometry,
    CircleGeometry,
    Color,
    ExtrudeGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    MeshStandardMaterial,
    Object3D,
    Shape,
    ShapeUtils,
    Vector2,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

let primary = new Color("#0077ee").offsetHSL(0.0, 0.0, 0.05);
let grid = new Color(primary).offsetHSL(0, 0, -0.3);
let background = new Color(primary).offsetHSL(0, 0, -0.44);

let colors = {
    primary,
    grid,
    background,
};

function OneTile({ x, y, meshes }: any) {
    return (
        <>
            <group position={[x, -0.01, y]}>
                {/* <Instance></Instance> */}
                {<meshes.Cross></meshes.Cross>}
                {/*  */}
                {/* <Instance rotation={[-Math.PI / 2, 0, 0]} /> */}
                {/* <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} /> */}
            </group>
        </>
    );
}

export const Grid = ({ num = 25, lineWidth = 0.036, height = 0.5 }) => {
    // Renders a grid and crosses as instances
    let scene = useThree((r) => r.scene);

    useEffect(() => {
        scene.background = colors.background;
    }, [background]);

    //

    let getLayout1 = ({ meshes }: any) => {
        let insts = [];

        let ie = 0;
        for (let y = -Math.floor(num * 0.5); y <= Math.floor(num * 0.5); y++) {
            for (
                let x = -Math.floor(num * 0.5);
                x <= Math.floor(num * 0.5);
                x++
            ) {
                //
                insts.push(
                    <meshes.SymbolOne
                        meshes={meshes}
                        key={`xx${x}-yy${y}`}
                        position={[x, 0, y]}
                    ></meshes.SymbolOne>,
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
            for (
                let x = -Math.floor(num * 0.5);
                x <= Math.floor(num * 0.5);
                x++
            ) {
                //
                insts.push(
                    <meshes.SymbolTwo
                        meshes={meshes}
                        key={`xx${x}-yy${y}`}
                        position={[x + 0.5, 0, y + 0.5]}
                    ></meshes.SymbolTwo>,
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

            array.push(
                new Vector2(
                    box1.attributes.position?.getX(ii),
                    box1.attributes.position?.getY(ii),
                ),
            );

            //
        }

        console.log(array);

        const shape = new Shape(array);

        const extrudeSettings = {
            depth: 0.1,
            bevelEnabled: false,
            bevelSegments: 0,
            steps: 1,
            bevelSize: 0.0,
            bevelThickness: 0.0,
        };

        const geometry = new ExtrudeGeometry(shape, extrudeSettings);
        geometry.center();
        geometry.computeBoundingBox();
        geometry.rotateX(Math.PI * 0.5);
        geometry.center();

        geometry.translate(0, 0.0, 0);

        // geometry.scale(0.5, 1, 0.5);

        // let geo = mergeGeometries([box1]);

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
                            roughness: 0.0,
                            metalness: 1,
                        }),
                    ),
                    SymbolTwo: new Mesh(
                        hexGeo,
                        new MeshStandardMaterial({
                            color: colors.primary,
                            roughness: 0.3,
                            metalness: 1,
                        }),
                    ),
                }}
                scale={[2, 1, 2]}
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

            <gridHelper
                args={[50 * 2, 50, colors.grid, colors.grid]}
                position={[0, -0.01, 0]}
            />

            <Plane
                scale={50}
                rotation={[-Math.PI * 0.5, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
                castShadow
            >
                <meshBasicMaterial
                    color={colors.background}
                ></meshBasicMaterial>
            </Plane>

            {/*  */}
        </>
    );
};

//
