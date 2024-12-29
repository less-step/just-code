import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierlintRecommanded from 'eslint-plugin-prettier/recommended';
/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			'dist/**/*',
			'**/bin/**/*',
			'**/cjs/**/*',
			'**/esm/**/*',
			'**/build/**/*',
			'**/ts-esnext/**/*',
			'**/ts-nodenext/**/*',
			'**/node_modules/**/*',
		],
	},

	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'no-console': 'off',
			semi: ['error', 'always'],
		},
	},
	prettierlintRecommanded,
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				process: 'readonly',
				__dirname: 'readonly',
				require: 'readonly',
				console: 'readonly',
				module: 'readonly',
				global: 'readonly',
			},
		},
	},
];
