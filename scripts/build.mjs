import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { rollup } from "rollup";
import path from "path";
console.log(path.resolve(process.cwd(), "esm"));
async function build() {
	// 动态配置 Rollup
	const bundleCjs = await rollup({
		input: "lib/index.ts", // 输入文件路径
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				declaration: true,
				declarationDir: "cjs",
			}),
		],
		external: [/^@only-code\/.*/],
	});
	// 输出 CommonJS 格式
	await bundleCjs.write({
		dir: "cjs",
		format: "cjs",
		sourcemap: true,
	});
	console.log("cjs模块打包成功");
	const bundleESM = await rollup({
		input: "lib/index.ts", // 输入文件路径
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				declaration: true,
				declarationDir: "esm",
			}),
		],
		external: [/^@only-code\/.*/],
	});
	// 输出 ESM 格式
	await bundleESM.write({
		dir: "esm",
		format: "esm",
		sourcemap: true,
	});
	console.log("esm模块打包成功");
}

// 执行打包任务
build();
