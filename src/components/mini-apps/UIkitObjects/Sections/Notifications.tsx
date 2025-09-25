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
import { LinearToSRGB } from "three/src/math/ColorManagement.js";
import {
    NoColorSpace,
    Object3D,
    RenderTarget,
    WebGLRenderTarget,
    PerspectiveCamera,
    EquirectangularReflectionMapping,
} from "three";

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

export function NotificationSection() {
    return (
        <>
            <CardHeader>
                <CardTitle>
                    <Text>PreviewWindow</Text>
                </CardTitle>
                <CardDescription>
                    <Text>aaaaa</Text>
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
            </CardContent>

            <Container flexDirection="column">
                {notifications.map((notification, index) => (
                    <Container
                        key={index}
                        marginBottom={
                            index === notifications.length - 1 ? 0 : 16
                        }
                        paddingBottom={
                            index === notifications.length - 1 ? 0 : 16
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
        </>
    );
}
