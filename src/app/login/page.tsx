"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {}, []);
    return (
        <>
            <button
                onClick={() => {
                    signIn("google", {
                        redirect: true,
                        redirectTo: "/desk",
                    });
                }}
            >
                Login
            </button>
        </>
    );
}
