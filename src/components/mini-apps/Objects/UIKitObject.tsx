import { easing, geometry } from "maath";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { signal } from "@preact/signals-core";
import {
    Cloud,
    Environment,
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
} from "@react-three/uikit-default";
import { Avatar2 } from "./Avatar2";
import { LinearToSRGB } from "three/src/math/ColorManagement.js";
import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
} from "three";

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);
const notifications = [
    { title: "Your call has been confirmed.", description: "1 hour ago" },
];

function RTextureMat({ children, width = 1024, height = 1024 }: any) {
    let env = useEnvironment({
        files: [`/game-asset/hdr/brown_photostudio_02_1k.hdr`],
    });
    env.mapping = EquirectangularReflectionMapping;

    let ref = useRef<any>(null);

    let o3 = useMemo(() => {
        return new Object3D();
    }, []);
    let rtt = useMemo(() => {
        return new WebGLRenderTarget(width, height);
    }, []);

    let cam = useMemo(() => {
        return new PerspectiveCamera(65, width / height, 0.01, 500);
    }, []);

    useFrame((st) => {
        cam.position.y = 1.7;
        cam.position.z = 0.75;
        cam.rotation.x = -0.1;
        cam.aspect = 1;
        cam.updateMatrixWorld();
        cam.updateProjectionMatrix();

        st.gl.setRenderTarget(rtt);
        ref.current.environment = env;
        st.gl.render(ref.current, cam);
        st.gl.setRenderTarget(null);
    });

    return (
        <>
            <meshStandardMaterial
                emissive={"#ffffff"}
                emissiveMap={rtt.texture}
            ></meshStandardMaterial>
            {createPortal(<scene ref={ref}>{children}</scene>, o3)}
        </>
    );
}

export function CardPage() {
    const openRef = useRef(false);
    const translateY = useMemo(() => signal(-460), []);
    const translateZ = useMemo(() => signal(0), []);
    useFrame((_, delta) => {
        easing.damp(
            translateY,
            "value",
            openRef.current ? 0 : -460,
            0.2,
            delta,
        );

        easing.damp(translateZ, "value", openRef.current ? 50 : 0, 0.2, delta);
    });

    //

    return (
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
                transformTranslateZ={translateZ}
            >
                <Suspense fallback={null}>
                    <Content
                        transformTranslateZ={1}
                        padding={14}
                        keepAspectRatio={false}
                        width="100%"
                        height={400}
                    >
                        <mesh geometry={cardGeometry}>
                            <RTextureMat
                                width={1024}
                                height={1024}
                                colorSpace={NoColorSpace}
                                eventPriority={100}
                            >
                                <>
                                    <color
                                        attach="background"
                                        args={["#bababa"]}
                                    />
                                    <ambientLight intensity={Math.PI} />

                                    <Avatar2></Avatar2>

                                    <Cloud position={[0, 0, -1]}></Cloud>
                                    <Sky rayleigh={0.1} azimuth={0.25}></Sky>
                                    {/* <PerspectiveCamera
                                            makeDefault
                                            aspect={1}
                                            near={0.01}
                                            far={1000}
                                            position={[0, 1.7, 0.75]}
                                            rotation={[-0.1, 0, 0]}
                                            fov={65}
                                        /> */}
                                </>
                            </RTextureMat>
                        </mesh>
                    </Content>
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
                            defaultValue={"Im loklok"}
                        />

                        <Text
                            fontSize={20}
                            fontWeight="medium"
                            letterSpacing={-0.4}
                            color={colors.primary}
                        >
                            1 activities for you
                        </Text>
                    </Container>
                    <Container flexDirection="row">
                        <Avatar
                            width={40}
                            src="https://avatar.iran.liara.run/public/boy?username=Peter"
                        />
                        <Avatar
                            marginLeft={-6}
                            width={40}
                            src="https://avatar.iran.liara.run/public/boy?username=Paul"
                        />
                        <Avatar
                            marginLeft={-6}
                            width={40}
                            src="https://avatar.iran.liara.run/public/boy?username=Mary"
                        />
                    </Container>
                </Container>
            </Container>
            <Container
                flexDirection="column"
                transformTranslateY={-40}
                overflow="hidden"
            >
                <Container
                    paddingTop={40}
                    transformTranslateY={translateY}
                    backgroundColor={colors.secondary}
                    borderRadius={20}
                    flexDirection="column"
                >
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
                            <Container flexDirection="column" gap={4}>
                                <Text fontSize={14} lineHeight="100%">
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
                            {notifications.map((notification, index) => (
                                <Container
                                    key={index}
                                    marginBottom={
                                        index === notifications.length - 1
                                            ? 0
                                            : 16
                                    }
                                    paddingBottom={
                                        index === notifications.length - 1
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
                                        backgroundColor={colors.primary}
                                    />
                                    <Container gap={4} flexDirection="column">
                                        <Text fontSize={14} lineHeight="100%">
                                            {notification.title}
                                        </Text>
                                        <Text
                                            fontSize={14}
                                            lineHeight={20}
                                            color={colors.mutedForeground}
                                        >
                                            {notification.description}
                                        </Text>
                                    </Container>
                                </Container>
                            ))}
                        </Container>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                openRef.current = !openRef.current;
                            }}
                            flexDirection="row"
                            width="100%"
                        >
                            <Check marginRight={8} height={16} width={16} />
                            <Text>Mark all as read</Text>
                        </Button>
                    </CardFooter>
                </Container>
            </Container>
        </Root>
    );
}
