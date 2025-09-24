import { Instance, Instances, Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, Object3D } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
let primary = new Color("#00eeee").offsetHSL(0.0, 0.0, 0.05);
let grid = new Color(primary).offsetHSL(0, 0, -0.3);
let background = new Color(primary).offsetHSL(0, 0, -0.44);

let colors = {
    primary,
    grid,
    background,
};

function OneTile({ x, y }: any) {
    let ref = useRef<Object3D>(null);
    useFrame((st, dt) => {
        if (ref.current) {
            // ref.current.rotation.x += dt * 0.1;
        }
    });

    return (
        <group position={[x * 2, -0.01, y * 2]}>
            <Instance ref={ref} />
            {/*  */}
            {/* <Instance rotation={[-Math.PI / 2, 0, 0]} /> */}
            {/* <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} /> */}
        </group>
    );
}

export const Grid = ({ num = 25, lineWidth = 0.036, height = 0.5 }) => {
    // Renders a grid and crosses as instances
    let scene = useThree((r) => r.scene);

    useEffect(() => {
        scene.background = colors.background;
    }, [background]);

    let insts = [];

    for (let y = -Math.floor(num * 0.5); y <= Math.floor(num * 0.5); y++) {
        for (let x = -Math.floor(num * 0.5); x <= Math.floor(num * 0.5); x++) {
            //
            insts.push(<OneTile key={`xx${x}-yy${y}`} x={x} y={y}></OneTile>);
            //
        }
    }

    let geo = useMemo(() => {
        let box1 = new BoxGeometry(0.03, 0.03, 0.75);
        let box2 = new BoxGeometry(0.75, 0.03, 0.03);

        let geo = mergeGeometries([box1, box2]);

        return geo;
    }, []);

    return (
        <>
            <Instances
                scale={[2, 1, 2]}
                geometry={geo}
                count={insts.length * 2.0}
            >
                {/* <icosahedronGeometry args={[0.25, 0]} /> */}
                <meshBasicMaterial color={colors.primary} />
                {insts}
            </Instances>

            <gridHelper
                args={[100, 50, colors.grid, colors.grid]}
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
