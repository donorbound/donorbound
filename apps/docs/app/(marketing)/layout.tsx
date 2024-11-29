import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "../layout.config";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: "main",
          text: "Docs",
          description: "Documentation for Donorbound",
          url: "/docs",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
