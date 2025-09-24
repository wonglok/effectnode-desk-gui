import { Instance, Instances, Plane } from "@react-three/drei";
import { Color } from "three";

export const Grid = ({ number = 23, lineWidth = 0.036, height = 0.5 }) => {
    // Renders a grid and crosses as instances
    return (
        <>
            <Instances position={[0, 0.0, 0]}>
                <planeGeometry args={[lineWidth, height]} />
                <meshBasicMaterial color="#7ff" />

                {Array.from({ length: number }, (_, y) =>
                    Array.from({ length: number }, (_, x) => (
                        <group
                            key={x + ":" + y}
                            position={[
                                x * 2 - Math.floor(number / 2) * 2,
                                0.001,
                                y * 2 - Math.floor(number / 2) * 2,
                            ]}
                        >
                            <Instance rotation={[-Math.PI / 2, 0, 0]} />
                            <Instance
                                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                            />
                        </group>
                    )),
                )}
                <gridHelper
                    args={[50, 50, "#cff", "#cff"]}
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
                        color={new Color("#000000")
                            .offsetHSL(0, -0.1, 0.15)
                            .getHex()}
                    ></meshBasicMaterial>
                </Plane>
            </Instances>
        </>
    );
};
