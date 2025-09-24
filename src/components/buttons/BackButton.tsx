import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function BackButton({ workspaceID = "" }) {
    return (
        <>
            {/*  */}

            <Link href={`/desk`}>
                <Button variant={"outline"} className="">
                    <ArrowLeft></ArrowLeft> Back
                </Button>
            </Link>

            {/*  */}
        </>
    );
}
