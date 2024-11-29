import type { NextRequest } from "next/server";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const postTitle = searchParams.get("title") || siteConfig.description;
  const font = fetch(
    new URL("../../assets/fonts/Inter-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        // set background image if needed
        backgroundImage: `url(${siteConfig.url}/og.png)`,
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          top: "125px",
        }}
      >
        <Icons.logo
          style={{
            color: "#fff",
            height: "64px",
            width: "64px",
          }}
        />

        <div
          style={{
            alignItems: "center",
            color: "#fff",
            display: "flex",
            fontSize: "64px",
            fontWeight: "600",
            justifyContent: "center",
            letterSpacing: "-0.05em", // Added tighter tracking
            marginTop: "24px",
            textAlign: "center",
            width: "60%",
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            color: "#fff",
            display: "flex",
            fontSize: "16px",
            fontWeight: "500",
            marginTop: "16px",
          }}
        >
          {siteConfig.name}
        </div>
      </div>

      <img
        src={`${siteConfig.url}/cube.png`}
        width={500}
        style={{
          aspectRatio: "auto",
          bottom: -100,
          position: "relative",
        }}
      />
    </div>,
    {
      fonts: [
        {
          data: fontData,
          name: "Inter",
          style: "normal",
        },
      ],
      height: 630,
      width: 1200,
    },
  );
}
