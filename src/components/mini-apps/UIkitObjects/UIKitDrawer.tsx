import { easing, geometry } from "maath";
import { Suspense, useEffect, useMemo, useRef, type ReactElement } from "react";
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
import { BellRing, Check } from "@react-three/uikit-lucide";
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

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);
const notifications = [
    { title: "Your call has been confirmed.", description: "1 hour ago" },
];

export function UIKitDrawer({
    content = null,
    portal = null,
    footer = null,
}: {
    content: ReactElement | null;
    portal: ReactElement | null;
    footer: ReactElement | null;
}) {
    const openRef = useRef(true);
    const rotationX = useMemo(() => signal(0), []);
    const translateY = useMemo(() => signal(0), []);
    const translateZ = useMemo(() => signal(0), []);
    const groupMoveZ = useMemo(() => signal(0), []);

    useFrame((_, delta) => {
        //
        easing.damp(rotationX, "value", openRef.current ? 35 : 0, 0.2, delta);

        //
        easing.damp(
            translateY,
            "value",
            openRef.current ? 0 : -460,
            0.2,
            delta,
        );

        easing.damp(translateZ, "value", openRef.current ? 0 : 0, 0.2, delta);

        easing.damp(
            groupMoveZ,
            "value",
            openRef.current ? -100 : 0,
            0.2,
            delta,
        );
    });

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
            !openRef.current ? -400 : 0,
            0.2,
            delta,
        );
        easing.damp(
            settings.translateZ,
            "value",
            !openRef.current ? 0 : 0,
            0.2,
            delta,
        );

        //
        easing.damp(
            settings.rotationX,
            "value",
            !openRef.current ? 0 : 0,
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
            <group rotation={[Math.PI * -0.5, 0, 0]} position={[0, 0.05, 0]}>
                <Root
                    transformTranslateY={groupMoveZ}
                    flexDirection="column"
                    pixelSize={0.01}
                    sizeX={4.4}
                >
                    {/*  */}
                    <Container
                        backgroundColor={0xffffff}
                        dark={{ backgroundColor: 0x0 }}
                        borderRadius={20}
                        onClick={(e) => {
                            e.stopPropagation();
                            openRef.current = true;
                        }}
                        cursor="pointer"
                        flexDirection="column"
                        transformTranslateZ={translateZ}
                        transformOriginY={"bottom"}
                        transformRotateX={rotationX}
                        castShadow
                    >
                        <Suspense fallback={null}>
                            <Content
                                transformTranslateZ={1}
                                padding={14}
                                keepAspectRatio={false}
                                width="100%"
                                height={400}
                                castShadow
                            >
                                <RenderPlane
                                    width={512 * 1.5}
                                    height={512 * 1.5}
                                    colorSpace={NoColorSpace}
                                    eventPriority={100}
                                >
                                    {/* <ambientLight intensity={Math.PI} /> */}
                                    {portal}
                                    {/*  */}
                                </RenderPlane>
                            </Content>
                        </Suspense>

                        <Container
                            backgroundColor={0xffffff}
                            dark={{ backgroundColor: 0x0 }}
                            flexDirection="row"
                            padding={28}
                            paddingTop={32 * 0.0}
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottomRadius={20}
                            castShadow
                        >
                            <Container flexDirection="column" gap={8}>
                                {content}
                            </Container>

                            <Container flexDirection="row">
                                {/*  */}
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

                    <Container
                        flexDirection="column"
                        overflow={"hidden"}
                        paddingTop={40}
                        transformTranslateZ={0}
                        castShadow
                    >
                        <Container
                            backgroundColor={colors.secondary}
                            borderRadius={20}
                            flexDirection="column"
                            //
                            transformTranslateX={settings.translateX}
                            transformTranslateY={settings.translateY}
                            transformTranslateZ={settings.translateZ}
                            transformRotateX={settings.rotationX}
                            transformRotateY={settings.rotationY}
                            transformRotateZ={settings.rotationZ}
                        >
                            <Card backgroundColor={colors.secondary}>
                                <CardHeader>
                                    <CardTitle>
                                        <Text>Notifications</Text>
                                    </CardTitle>
                                    <CardDescription>
                                        <Text>You have 3 unread messages.</Text>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent flexDirection="column" gap={16}>
                                    <Container
                                        flexDirection="row"
                                        alignItems="center"
                                        gap={16}
                                        borderRadius={6}
                                        borderWidth={1}
                                        padding={16}
                                    >
                                        <BellRing />
                                        <Container
                                            flexDirection="column"
                                            gap={4}
                                        >
                                            <Text
                                                fontSize={14}
                                                lineHeight="100%"
                                            >
                                                Push Notifications
                                            </Text>
                                            <Text
                                                fontSize={14}
                                                lineHeight={20}
                                                color={colors.mutedForeground}
                                            >
                                                Send notifications to device.
                                            </Text>
                                        </Container>
                                        <Container flexGrow={1} />
                                        <Switch />
                                    </Container>
                                    <Container flexDirection="column">
                                        {notifications.map(
                                            (notification, index) => (
                                                <Container
                                                    key={index}
                                                    marginBottom={
                                                        index ===
                                                        notifications.length - 1
                                                            ? 0
                                                            : 16
                                                    }
                                                    paddingBottom={
                                                        index ===
                                                        notifications.length - 1
                                                            ? 0
                                                            : 16
                                                    }
                                                    alignItems="flex-start"
                                                    flexDirection="row"
                                                    gap={17}
                                                >
                                                    <Container
                                                        height={8}
                                                        width={8}
                                                        transformTranslateY={4}
                                                        borderRadius={1000}
                                                        backgroundColor={
                                                            colors.primary
                                                        }
                                                    />
                                                    <Container
                                                        gap={4}
                                                        flexDirection="column"
                                                    >
                                                        <Text
                                                            fontSize={14}
                                                            lineHeight="100%"
                                                        >
                                                            {notification.title}
                                                        </Text>
                                                        <Text
                                                            fontSize={14}
                                                            lineHeight={20}
                                                            color={
                                                                colors.mutedForeground
                                                            }
                                                        >
                                                            {
                                                                notification.description
                                                            }
                                                        </Text>
                                                    </Container>
                                                </Container>
                                            ),
                                        )}
                                    </Container>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openRef.current = false;
                                        }}
                                        flexDirection="row"
                                        width="100%"
                                    >
                                        <Check
                                            marginRight={8}
                                            height={16}
                                            width={16}
                                        />
                                        <Text>Mark all as read</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Container>
                    </Container>
                </Root>

                {/*  */}
            </group>
        </>
    );
}
