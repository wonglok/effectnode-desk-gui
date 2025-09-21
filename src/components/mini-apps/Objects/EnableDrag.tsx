import { DragControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function EnableDrag({ children }: any) {
    let controls: any = useThree((r) => r.controls);
    return (
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
            {children}
        </DragControls>
    );
}
