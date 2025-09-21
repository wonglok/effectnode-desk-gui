import { easing, geometry } from "maath";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { signal } from "@preact/signals-core";
import {
    Cloud,
    Environment,
    Html,
    MeshPortalMaterial,
    RenderTexture,
    Sky,
    Sphere,
    useEnvironment,
    useGLTF,
} from "@react-three/drei";
import { Canvas, createPortal, extend, useFrame } from "@react-three/fiber";
import {
    Root,
    Container,
    Text,
    setPreferredColorScheme,
    Content,
    Fullscreen,
    Input,
} from "@react-three/uikit";
import { BellRing, Check } from "@react-three/uikit-lucide";
import {
    ///
    colors,
    Avatar,
    ///
    Defaults,
    Button,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Switch,
} from "@react-three/uikit-default";
import {
    NoColorSpace,

    ///
} from "three";
import { RTextureMat } from "./RTextureMat";
import { AvatarMotion } from "./AvatarMotion";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

// const notifications = [
//     { title: "Your call has been confirmed.", description: "1 hour ago" },
// ];

export function UIKitFrame({ content }: any) {
    const openRef = useRef(true);

    const settings = {
        translateX: useMemo(() => signal(0), []),
        translateY: useMemo(() => signal(0), []),
        translateZ: useMemo(() => signal(0), []),

        rotationX: useMemo(() => signal(0), []),
        rotationY: useMemo(() => signal(0), []),
        rotationZ: useMemo(() => signal(0), []),
    };

    useFrame((_, delta) => {
        //
        easing.damp(
            settings.translateX,
            "value",
            !openRef.current ? 0 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.translateY,
            "value",
            !openRef.current ? 0 : -200,
            0.2,
            delta,
        );
        easing.damp(
            settings.translateZ,
            "value",
            !openRef.current ? 0 : 200,
            0.2,
            delta,
        );

        //
        easing.damp(
            settings.rotationX,
            "value",
            !openRef.current ? -30 : -30,
            0.2,
            delta,
        );
        easing.damp(
            settings.rotationY,
            "value",
            !openRef.current ? 0 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.rotationZ,
            "value",
            !openRef.current ? 0 : 0,
            0.2,
            delta,
        );
    });

    //

    return (
        <>
            <Root flexDirection="column" pixelSize={0.01} sizeX={4.4}>
                <Container
                    backgroundColor={0xffffff}
                    dark={{ backgroundColor: 0x0 }}
                    borderRadius={20}
                    onClick={(e) => {
                        e.stopPropagation();
                        openRef.current = !openRef.current;
                    }}
                    cursor="pointer"
                    flexDirection="column"
                    transformTranslateX={settings.translateX}
                    transformTranslateY={settings.translateY}
                    transformTranslateZ={settings.translateZ}
                    transformRotateX={settings.rotationX}
                    transformRotateY={settings.rotationY}
                    transformRotateZ={settings.rotationZ}
                    //
                    transformOriginY={"bottom"}
                >
                    <Suspense fallback={null}>
                        <Container
                            transformTranslateZ={1}
                            padding={14}
                            width="100%"
                            height={400}
                        >
                            {content}
                        </Container>
                    </Suspense>

                    <Container
                        backgroundColor={0xffffff}
                        dark={{ backgroundColor: 0x0 }}
                        flexDirection="row"
                        padding={28}
                        paddingTop={28 + 4}
                        alignItems="center"
                        justifyContent="space-between"
                        borderBottomRadius={20}
                        castShadow
                    >
                        <Container flexDirection="column" gap={8}>
                            <Input
                                fontSize={30}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={colors.primary}
                                defaultValue={"Thank you Jesus"}
                            />

                            <Text
                                fontSize={20}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={colors.primary}
                            >
                                {`Prayer Time`}
                            </Text>

                            {/*  */}
                            {/*  */}
                        </Container>
                        <Container flexDirection="row">
                            <Avatar
                                //
                                width={40}
                                src="/avatar-icon/ava1.png"
                            />
                            <Avatar
                                marginLeft={-6}
                                width={40}
                                src="/avatar-icon/ava2.png"
                            />
                            <Avatar
                                marginLeft={-6}
                                width={40}
                                src="/avatar-icon/ava3.png"
                            />
                        </Container>
                    </Container>
                </Container>
            </Root>
        </>
    );
}
