import type { Metadata } from "next";

import Author from "@/components/blog-author";
import { CTA } from "@/components/sections/cta";
import { getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(properties: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const parameters = await properties.params;
  const post = await getPost(parameters.slug);
  const {
    image,
    publishedAt: publishedTime,
    summary: description,
    title,
  } = post.metadata;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: image,
        },
      ],
      publishedTime,
      title,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title,
    },
  };
}

export default async function Page(properties: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const parameters = await properties.params;
  const post = await getPost(parameters.slug);
  if (!post) {
    notFound();
  }
  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            author: {
              "@type": "Person",
              name: siteConfig.name,
            },
            dateModified: post.metadata.publishedAt,
            datePublished: post.metadata.publishedAt,
            description: post.metadata.summary,
            headline: post.metadata.title,
            image: post.metadata.image
              ? `${siteConfig.url}${post.metadata.image}`
              : `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
            url: `${siteConfig.url}/blog/${post.slug}`,
          }),
        }}
      />
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8 space-y-4 my-12">
        <Suspense
          fallback={
            <div className="mb-8 w-full h-64 bg-muted animate-pulse rounded-lg" />
          }
        >
          {post.metadata.image && (
            <div className="mb-8">
              <Image
                width={1920}
                height={1080}
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}
        </Suspense>
        <div className="flex flex-col">
          <h1 className="title font-medium text-3xl tracking-tighter">
            {post.metadata.title}
          </h1>
        </div>
        <div className="flex justify-between items-center text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <div className="flex items-center space-x-2">
              <time dateTime={post.metadata.publishedAt} className="text-sm">
                {formatDate(post.metadata.publishedAt)}
              </time>
            </div>
          </Suspense>
        </div>
        <div className="flex items-center space-x-2">
          <Author
            twitterUsername={post.metadata.author}
            name={post.metadata.author}
            image={"/author.jpg"}
          />
        </div>
        <article
          className="prose dark:prose-invert mx-auto max-w-full"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </div>
      <CTA />
    </section>
  );
}
