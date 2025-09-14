"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Users, Home, Book, TriangleAlert, SquareCode } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn-ui/sidebar";

const items = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Inscriptions", url: "/inscriptions", icon: Users },
  { title: "Cours", url: "/cours", icon: Book },
  { title: "Anomalies", url: "/anomalies", icon: TriangleAlert },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenuButton asChild className="h-auto justify-start px-2 py-3">
          <Link href="/" className="flex items-center gap-3">
            <SquareCode className="h-7 w-7 flex-shrink-0" />
            <span className="font-black text-xl">EPREUVE TECHNIQUE</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "justify-start relative",
                        isActive &&
                          "bg-secondary text-secondary-foreground font-bold"
                      )}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center w-full"
                      >
                        <div
                          className={cn(
                            "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-opacity",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <item.icon className=" h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
