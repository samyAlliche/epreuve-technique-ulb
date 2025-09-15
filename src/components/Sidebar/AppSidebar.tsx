"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Users, Home, Book, TriangleAlert, SquareCode } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn-ui/sidebar";

const items = [
  { title: "ACCUEIL", url: "/", icon: Home },
  { title: "INSCRIPTIONS", url: "/inscriptions", icon: Users },
  { title: "COURS", url: "/cours", icon: Book },
  { title: "ANOMALIES", url: "/anomalies", icon: TriangleAlert },
];

export function AppSidebar() {
  const pathname = usePathname();
  const sidebar = useSidebar();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 pt-4">
          <SquareCode
            className={cn(
              "flex-shrink-0  transition-transform duration-500 ease-in-out",
              sidebar.open && "h-16 w-16",
              !sidebar.open && "ml-3 scale-85 rotate-[180deg]"
            )}
          />
          <span
            className={cn(
              "font-black text-xl tracking-wide text-background",
              !sidebar.open && "hidden"
            )}
          >
            EPREUVE TECHNIQUE
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2 mt-5">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <div key={item.title} className="relative">
                <div
                  className={cn(
                    "absolute top-1/2 -left-0 h-5 w-1 -translate-y-1/2 rounded-r-xs bg-white transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <SidebarMenuItem className="group px-4">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "justify-start relative",
                      isActive && "font-black"
                    )}
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <item.icon className=" h-5 w-5" />
                      <span className="font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
