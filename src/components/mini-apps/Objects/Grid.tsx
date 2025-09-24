import { Instance, Instances, Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Color } from "three";

let primary = new Color("#00eeee").offsetHSL(0.0, 0.0, 0.05);
let grid = new Color(primary).offsetHSL(0, 0, -0.3);
let background = new Color(primary).offsetHSL(0, 0, -0.44);

let colors = {
    primary,
    grid,
    background,
};

function OneTile({ x, y }: any) {
    return (
        <group position={[x * 2, 0.03, y * 2]}>
            <Instance />
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

    return (
        <>
            <Instances count={insts.length * 5.0}>
                <boxGeometry args={[0.5, 0.02, 0.5]} />
                <meshBasicMaterial color={colors.primary} />
                {insts}
            </Instances>

            <gridHelper
                args={[50, 25, colors.grid, colors.grid]}
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
