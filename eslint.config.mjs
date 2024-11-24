import pluginJs from "@eslint/js";
import biome from "eslint-config-biome";
// import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
// import tailwind from "eslint-plugin-tailwindcss";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// {
	// 	files: ["/apps/www/**/*.{js,jsx,ts,tsx}"],
	// 	...pluginReact.configs.flat.recommended,
	// ...tailwind.configs["flat/recommended"]
	// },
	biome,
];
