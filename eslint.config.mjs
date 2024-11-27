import pluginJs from "@eslint/js";
import biome from "eslint-config-biome";
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
  { languageOptions: { globals: globals.browser } },
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
            getInitialProps: true,
            getStaticProps: true,
            generateStaticParams: true,
          },
        },
      ],
    },
  },
  biome,
];
