import { createPortal, useThree } from "@react-three/fiber";

export function InsideCamera({ children }: any) {
    let camera: any = useThree((r) => r.camera);
    return (
        <>
            {createPortal(<>{children}</>, camera)}

            <primitive object={camera}></primitive>
        </>
    );
}
