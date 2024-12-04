import type { ReactNode } from "react";

import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "~/app/layout.config";
import { source } from "~/lib/source";

import "fumadocs-ui/style.css";

export default function RootDocumentationLayout({
  children,
}: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
