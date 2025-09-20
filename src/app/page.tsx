import Link from "next/link";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import { redirect } from "next/navigation";
// import { Redirect } from "./redirect";

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });
    const session = await auth();

    // if (session?.user) {
    //     void api.post.getLatest.prefetch();
    // }

    // return (
    //     <HydrateClient>
    //         <>
    //             {/*  */}
    //             {/* 123123123 */}
    //             {/* <Redirect></Redirect> */}
    //             {/*  */}
    //         </>
    //     </HydrateClient>
    // );

    if (!session?.user?.email) {
        return redirect("/login");
    } else {
        return redirect("/desk");
    }
}
