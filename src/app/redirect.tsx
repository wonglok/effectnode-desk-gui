"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export function Redirect() {
    let { status } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            signIn().then(() => {
                //
            });
        }
    }, [status]);

    return <></>;
}
