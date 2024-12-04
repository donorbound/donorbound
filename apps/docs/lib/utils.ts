import type { Metadata } from "next";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { siteConfig } from "~/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  title = siteConfig.name,
  ...properties
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    description: description || siteConfig.description,
    icons: "/favicon.ico",
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      description,
      images: [
        {
          alt: title,
          height: 630,
          url: image,
          width: 1200,
        },
      ],
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      type: "website",
      url: siteConfig.url,
    },
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    ...properties,
  };
}

export function formatDate(date: string) {
  const currentDate = Date.now();
  let newDate = date;
  if (!date.includes("T")) {
    newDate = `${date}T00:00:00`;
  }
  const targetDate = new Date(newDate).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(newDate).toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  }
  if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  }
  if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  }
  if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  }
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${fullDate} (${yearsAgo}y ago)`;
}
