"use client";

import * as React from "react";
import {
    Bell,
    Check,
    Globe,
    Home,
    Keyboard,
    Link,
    Lock,
    Menu,
    MessageCircle,
    Paintbrush,
    PenIcon,
    Settings,
    Video,
} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const data = {
    nav: [
        { tab: "home", name: "Home", icon: Home },
        { tab: "privacy", name: "Privacy & visibility", icon: Lock },
        { tab: "notifications", name: "Notifications", icon: Bell },
        { tab: "nav", name: "Navigation", icon: Menu },
        { tab: "appearence", name: "Appearance", icon: Paintbrush },
        { tab: "msg", name: "Messages & media", icon: MessageCircle },
        { tab: "lang", name: "Language & region", icon: Globe },
        { tab: "access", name: "Accessibility", icon: Keyboard },
        { tab: "read", name: "Mark as read", icon: Check },
        { tab: "media", name: "Audio & video", icon: Video },
        { tab: "social", name: "Connected accounts", icon: Link },
        { tab: "advnace", name: "Advanced", icon: Settings },
    ],
};

//

export function SettingsDialog({ open, setOpen }: any) {
    let [tab, setTab] = React.useState("home");
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start">
                    <Sidebar collapsible="none" className="">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem
                                                onClick={() => {
                                                    setTab(item.tab);
                                                }}
                                                key={item.name}
                                            >
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={tab === item.tab}
                                                >
                                                    <span>
                                                        <item.icon />
                                                        <span>{item.name}</span>
                                                    </span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    {tab === "home" && (
                        <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="">
                                                <BreadcrumbLink href="#">
                                                    Settings
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>
                                                    Home
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                                <div className="bg-muted/50 aspect-video max-w-3xl rounded-xl">
                                    PPAP
                                </div>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
                                    />
                                ))}
                            </div>
                        </main>
                    )}
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    );
}
