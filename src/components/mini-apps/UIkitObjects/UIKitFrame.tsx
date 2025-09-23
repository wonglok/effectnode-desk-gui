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
import { RenderPlane } from "../Objects/RenderPlane";
import { AvatarMotion } from "../Objects/AvatarMotion";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

// const notifications = [
//     { title: "Your call has been confirmed.", description: "1 hour ago" },
// ];

export function UIKitFrame({ content }: any) {
    const openRef = useRef(false);
    const rotationX = useMemo(() => signal(-90), []);
    const translateY = useMemo(() => signal(-290), []);
    const translateZ = useMemo(() => signal(0.05), []);

    useFrame((_, delta) => {
        //
        easing.damp(
            rotationX,
            "value",
            openRef.current ? -90 : -90 + 25,
            0.2,
            delta,
        );

        //

        easing.damp(
            translateY,
            "value",
            openRef.current ? -290 : -290,
            0.2,
            delta,
        );

        //

        easing.damp(
            translateZ,
            "value",
            openRef.current ? 0.05 : 0.05,
            0.2,
            delta,
        );
    });

    return (
        <>
            {/*  */}
            {/*  */}
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
                    transformTranslateY={translateY}
                    transformTranslateZ={translateZ}
                    transformOriginY={"bottom"}
                    transformRotateX={rotationX}
                >
                    <Suspense fallback={null}>
                        <Container
                            transformTranslateZ={1}
                            padding={20}
                            width="100%"
                            height={400}
                            borderRadius={20}
                            borderBottomRadius={0}
                            backgroundColor={"#8E89FF"}
                            flexDirection={"column"}
                            display={"flex"}
                        >
                            <Container
                                flexDirection={"column"}
                                display={"flex"}
                                backgroundColor={"#ffffff"}
                                height={"100%"}
                                borderRadius={20}
                                padding={20}
                            >
                                {content}
                            </Container>
                        </Container>
                    </Suspense>

                    <Container
                        backgroundColor={"#110D70"}
                        dark={{ backgroundColor: 0x0 }}
                        flexDirection="row"
                        padding={28}
                        paddingTop={28 + 4}
                        alignItems="center"
                        justifyContent="space-between"
                        borderBottomRadius={20}
                    >
                        <Container flexDirection="column" gap={8}>
                            <Input
                                fontSize={30}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={"#ffffff"}
                                defaultValue={"Thank you Jesus"}
                            />

                            <Text
                                fontSize={20}
                                fontWeight="medium"
                                letterSpacing={-0.4}
                                color={"#ffffff"}
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
