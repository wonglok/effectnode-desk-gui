import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function LogoutButton() {
    return (
        <Button
            variant={"outline"}
            onClick={() => {
                signOut().then(() => {
                    redirect("/login");
                });
            }}
            className=""
        >
            <LogOutIcon></LogOutIcon> Logout
        </Button>
    );
}
