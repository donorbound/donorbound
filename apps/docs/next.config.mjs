import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/3NbHyKB94u",
        permanent: true, // Use true for a 308 permanent redirect
      },
    ];
  },
};

export default withMDX(config);
