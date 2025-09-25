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

export function TitleSection({ title = "", description = "" }) {
    let controls: any = useThree((r) => r.controls);
    return (
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
                <Container
                    flexDirection={"column"}
                    onPointerEnter={() => {
                        //
                        // document.body.style.cursor =
                        //     "crosshair";
                        //
                    }}
                    onPointerLeave={() => {
                        //
                        // document.body.style.cursor = "";
                        //
                    }}
                >
                    <Text
                        fontSize={30}
                        fontWeight="medium"
                        letterSpacing={-0.4}
                        color={colors.primary}
                        onPointerDown={(ev) => {
                            ev.stopPropagation();

                            if (controls) {
                                controls.enabled = false;
                            }
                        }}
                    >
                        {title}
                    </Text>

                    <Text
                        fontSize={20}
                        fontWeight="medium"
                        letterSpacing={-0.4}
                        color={colors.primary}
                        onPointerDown={(ev) => {
                            ev.stopPropagation();

                            if (controls) {
                                controls.enabled = false;
                            }
                        }}
                    >
                        {description}
                    </Text>
                </Container>
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
    );
}
