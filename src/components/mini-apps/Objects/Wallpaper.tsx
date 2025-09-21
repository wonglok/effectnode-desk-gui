import { useThree } from "@react-three/fiber";

export function Wallpaper() {
    let viewport = useThree((r) => r.viewport);
    return (
        <group scale={1}>
            {1 <= viewport.aspect && (
                <group scale={[viewport.width, viewport.width, 1]}>
                    {api.display}
                </group>
            )}

            {1 > viewport.aspect && (
                <group scale={[viewport.height, viewport.height, 1]}>
                    {api.display}
                </group>
            )}
        </group>
    );
}
