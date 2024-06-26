import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/contexts/notification.context";
import { SidebarProvider } from "@/contexts/sidebar.context";
import { TitleHeaderProvider } from "@/contexts/title-header.context";
import Sidebar from "@/components/sidebar/Sidebar";
import AppBar from "@/components/appBar/AppBar";
import ThemeProvider from "./theme-provider";
import AppProvider from "./app-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <NotificationProvider>
          <AppProvider>
            <SidebarProvider>
              <TitleHeaderProvider>
                <body className={inter.className}>
                  <div className="page-wrapper">
                    <Sidebar />
                    <div className="content-wrapper">
                      <AppBar />
                      <div className="content-wrapper_bot">{children}</div>
                    </div>
                  </div>
                </body>
              </TitleHeaderProvider>
            </SidebarProvider>
          </AppProvider>
        </NotificationProvider>
      </ThemeProvider>
    </html>
  );
}
