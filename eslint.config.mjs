import pluginJs from "@eslint/js";
import biome from "eslint-config-biome";
import perfectionist from "eslint-plugin-perfectionist";
// import pluginReact from "eslint-plugin-react";
// import tailwind from "eslint-plugin-tailwindcss";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/.next/**",
      "**/.source/**",
      "**/.vitest/**",
      "**/.wrangler/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/next-env.d.ts",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  // React Plugins
  // {
  //   files: ["./apps/docs/**/*.{js,jsx,ts,tsx}"],
  //   ...pluginReact.configs.flat.recommended,
  //   ...tailwind.configs["flat/recommended"],
  // },
  {
    rules: {
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            generateStaticParams: true,
            getInitialProps: true,
            getStaticProps: true,
          },
        },
      ],
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: { type: {}, value: {} },
          environment: "node",
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
          ignoreCase: true,
          internalPattern: ["^~/.+"],
          maxLineLength: undefined,
          newlinesBetween: "always",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-interfaces": ["error"],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "alphabetical",
        },
      ],
    },
    settings: {
      perfectionist: {
        partitionByComment: true,
        type: "ne",
      },
    },
  },
  biome,
];
