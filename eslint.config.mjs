import js from "@eslint/js";
import tseslint from "typescript-eslint";
/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			"dist/**",
			"**/bin/**/*",
			"**/cjs/**/*",
			"**/esm/**/*",
			"**/build/**/*",
			"**/ts-esnext/**/*",
			"**/ts-nodenext/**/*",
			"**/node_modules/**/*",
		],
	},
	{
		files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				process: "readonly",
				__dirname: "readonly",
				require: "readonly",
				console: "readonly",
				module: "readonly",
				global: "readonly",
			},
		},
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
];
