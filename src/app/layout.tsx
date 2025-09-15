import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn-ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

const figtreeSans = Figtree({
  variable: "--font-figtree-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evaluation Technique ULB par Samy Alliche",
  description: "créé par Samy Alliche",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtreeSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-screen">
              <main className="p-8 flex-1 flex flex-col gap-2">
                <SidebarTrigger />
                {children}
              </main>
              <footer className="py-4 text-center text-sm text-muted-foreground">
                Epreuve Technique de Samy Alliche
              </footer>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
