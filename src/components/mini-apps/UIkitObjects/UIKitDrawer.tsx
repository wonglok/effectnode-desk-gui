import { easing, geometry } from "maath";
import {
    Suspense,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import { signal } from "@preact/signals-core";
import {
    Box,
    Center,
    Cloud,
    Environment,
    MeshPortalMaterial,
    RenderTexture,
    Sky,
    Sphere,
    useEnvironment,
    useGLTF,
} from "@react-three/drei";
import {
    Canvas,
    createPortal,
    extend,
    useFrame,
    useThree,
} from "@react-three/fiber";
import {
    Root,
    Container,
    Text,
    setPreferredColorScheme,
    Content,
    Fullscreen,
    Input,
} from "@react-three/uikit";
import {
    BellRing,
    BotIcon,
    Check,
    Cross,
    RemoveFormatting,
    TvIcon,
} from "@react-three/uikit-lucide";
import {
    Defaults,
    colors,
    Avatar,
    Button,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch,
    Card,
} from "@react-three/uikit-default";
import { Avatar2 } from "../Objects/Avatar2";
import { LinearToSRGB } from "three/src/math/ColorManagement.js";
import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
} from "three";
import { RenderPlane } from "../Objects/RenderPlane";
import { AvatarMotion } from "../Objects/AvatarMotion";
import { DragBlock } from "../Objects/EnableDrag";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

const notifications = [
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
    { title: "Your call has been confirmed.", description: "1 hour ago" },
];

export function UIKitDrawer({
    openDrawer = false,
    onSetDrawer = (v: boolean) => {},
    upperUI = null,
    drawerUI = null,
}: {
    openDrawer: boolean;
    onSetDrawer: (v: boolean) => void;
    upperUI: ReactElement | null;
    drawerUI?: ReactElement | null;
}) {
    const rotationX = useMemo(() => signal(35), []);
    const translateY = useMemo(() => signal(0), []);
    const translateZ = useMemo(() => signal(0), []);
    const groupMoveZ = useMemo(() => signal(0), []);
    const topCardBorderRadius = useMemo(() => signal(50), []);

    useFrame((_, delta) => {
        //
        if (drawerUI) {
            easing.damp(
                topCardBorderRadius,
                "value",
                openDrawer ? 50 : 50,
                0.2,
                delta,
            );
        }

        //
        easing.damp(rotationX, "value", openDrawer ? 35 : 0, 0.2, delta);

        //
        easing.damp(translateY, "value", openDrawer ? 0 : -460, 0.2, delta);

        easing.damp(translateZ, "value", openDrawer ? 0.001 : 0, 0.2, delta);

        easing.damp(groupMoveZ, "value", openDrawer ? 0 : 0, 0.2, delta);
    });

    const settings = {
        translateX: useMemo(() => signal(0), []),
        translateY: useMemo(() => signal(-800), []),
        translateZ: useMemo(() => signal(0), []),

        rotationX: useMemo(() => signal(0), []),
        rotationY: useMemo(() => signal(0), []),
        rotationZ: useMemo(() => signal(0), []),
    };

    const [height, setHeight] = useState(-800);

    useFrame((_, delta) => {
        //
        easing.damp(
            settings.translateX,
            "value",
            !openDrawer ? 0 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.translateY,
            "value",
            !openDrawer ? -height : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.translateZ,
            "value",
            !openDrawer ? 0 : 0,
            0.2,
            delta,
        );

        //
        easing.damp(
            settings.rotationX,
            "value",
            !openDrawer ? 0 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.rotationY,
            "value",
            !openDrawer ? 0 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.rotationZ,
            "value",
            !openDrawer ? 0 : 0,
            0.2,
            delta,
        );
    });

    return (
        <>
            <group rotation={[Math.PI * -0.5, 0, 0]} position={[0, 0.05, 0]}>
                <Root
                    transformTranslateY={groupMoveZ}
                    flexDirection="column"
                    pixelSize={0.01}
                    sizeX={4.5}
                    onSizeChange={(width, height) => {
                        setHeight(height);
                    }}
                >
                    {/*  */}
                    <Container
                        cursor="pointer"
                        backgroundColor={0xffffff}
                        dark={{ backgroundColor: 0x0 }}
                        borderRadius={20}
                        borderBottomRadius={topCardBorderRadius}
                        flexDirection="column"
                        transformTranslateZ={translateZ}
                        transformOriginY={"bottom"}
                        transformRotateX={rotationX}
                    >
                        <>{upperUI}</>
                    </Container>

                    {drawerUI && (
                        <Container
                            onPointerDown={(ev) => {
                                if (!openDrawer) {
                                    ev.stopPropagation();
                                }
                            }}
                            flexDirection="column"
                            cursor={openDrawer ? `grab` : ``}
                            overflow={"hidden"}
                            width={"100%"}
                        >
                            <Container
                                flexDirection="column"
                                //
                                transformTranslateX={settings.translateX}
                                transformTranslateY={settings.translateY}
                                transformTranslateZ={settings.translateZ}
                                transformRotateX={settings.rotationX}
                                transformRotateY={settings.rotationY}
                                transformRotateZ={settings.rotationZ}
                                //
                                borderTopRadius={25}
                                borderBottomRadius={25}
                                // flexDirection={"column"}
                                backgroundColor={colors.secondary}
                                paddingTop={30}
                            >
                                {drawerUI}
                            </Container>
                        </Container>
                    )}
                </Root>

                {/*  */}
            </group>
        </>
    );
}
