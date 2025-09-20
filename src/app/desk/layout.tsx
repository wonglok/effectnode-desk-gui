import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    // const hello = await api.post.hello({ text: "from tRPC" });
    const session = await auth();

    if (!session?.user?.email) {
        return redirect("/login");
    }

    return (
        <>
            {/*  */}

            {children}

            {/*  */}
        </>
    );
}
