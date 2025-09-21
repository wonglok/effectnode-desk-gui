import {
    Center,
    DragControls,
    RoundedBox,
    Text3D,
    useEnvironment,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EquirectangularReflectionMapping } from "three";
import font from "./_fonts/fonts/helvetiker_regular.typeface.json";

export function LaydownText({ text = "hi" }) {
    let controls: any = useThree((r) => r.controls);
    let env = useEnvironment({
        colorSpace: "srgb",
        files: [`/hdr/aerodynamics_workshop_1k.hdr`],
    });
    env.mapping = EquirectangularReflectionMapping;
    return (
        <>
            <DragControls
                // matrix={matrix}
                axisLock="y"
                onDragStart={() => {
                    if (controls) {
                        controls.enabled = false;
                    }
                }}
                onDragEnd={() => {
                    if (controls) {
                        controls.enabled = true;
                    }
                }}
            >
                <Center top>
                    <Text3D
                        castShadow
                        bevelEnabled
                        scale={2}
                        letterSpacing={-0.03}
                        height={0.25}
                        bevelSize={0.01}
                        bevelSegments={1}
                        curveSegments={128}
                        bevelThickness={0.02}
                        rotation={[Math.PI * -0.5, 0, 0]}
                        font={font as any}
                    >
                        {`${text}`}

                        <meshStandardMaterial
                            color={"#ffffff"}
                            roughness={0.2}
                            metalness={1}
                            envMap={env}
                            envMapIntensity={1.5}
                        ></meshStandardMaterial>
                    </Text3D>
                </Center>
            </DragControls>

            {/* <DragControls
                // matrix={matrix}
                axisLock="y"
                onDragStart={() => {
                    if (controls) {
                        controls.enabled = false;
                    }
                }}
                onDragEnd={() => {
                    if (controls) {
                        controls.enabled = true;
                    }
                }}
            >
                <Center bottom position={[0, 0.1, 0]}>
                    <RoundedBox
                        rotation={[Math.PI * -0.5, 0, 0]}
                        bevelSegments={32}
                        radius={0.35}
                        args={[2.5, 0.35 * 2, 0.35 * 2]}
                        scale={[1, 1, 0.1]}
                    >
                        <meshPhysicalMaterial
                            roughness={0}
                            thickness={2}
                            envMap={env}
                            transmission={1}
                        ></meshPhysicalMaterial>
                    </RoundedBox>
                </Center>
            </DragControls> */}
        </>
    );
}
