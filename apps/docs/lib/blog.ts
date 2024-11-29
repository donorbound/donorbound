import { siteConfig } from "@/lib/config";
import fs from "node:fs";
import path from "node:path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  author: string;
  slug: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  //@ts-expect-error TODO: fix this
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Post> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArray] = line.split(": ");
    let value = valueArray.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Post] = value;
  }

  return { content, data: metadata as Post };
}

function getMDXFiles(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      keepBackground: false,
      theme: {
        dark: "min-dark",
        light: "min-light",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const filePath = path.join("content", "blog", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content: rawContent, data: metadata } = parseFrontmatter(source);
  const content = await markdownToHTML(rawContent);
  const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    metadata.title,
  )}`;
  return {
    metadata: {
      ...metadata,
      image: metadata.image || defaultImage,
    },
    slug,
    source: content,
  };
}

async function getAllPosts(directory: string) {
  const mdxFiles = getMDXFiles(directory);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);
      return {
        ...metadata,
        slug,
        source,
      };
    }),
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content", "blog"));
}
