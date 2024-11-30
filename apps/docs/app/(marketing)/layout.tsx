import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

import "./globals.css";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "../layout.config";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
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
          description: "Donorbound Blog",
          text: "Blog",
          type: "main",
          url: "/blog",
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
