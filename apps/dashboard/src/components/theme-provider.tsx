"use client";

import type { ThemeProviderProps } from "next-themes/dist/types";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...properties }: ThemeProviderProps) {
  return <NextThemesProvider {...properties}>{children}</NextThemesProvider>;
}
