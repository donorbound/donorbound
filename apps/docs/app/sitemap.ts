import type { MetadataRoute } from "next";

import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";

  return [
    {
      lastModified: new Date(),
      url: `${protocol}://${domain}`,
    },
  ];
}
