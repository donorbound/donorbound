import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { attachFile, createOpenAPI } from "fumadocs-openapi/server";

import { docs, meta } from "~/.source";

export const source = loader({
  baseUrl: "/docs",
  pageTree: {
    attachFile,
  },
  source: createMDXSource(docs, meta),
});

export const openapi = createOpenAPI();
