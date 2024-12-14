import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { rollup } from "rollup";
async function build() {
	try {
		// 动态配置 Rollup
		const bundle = await rollup({
			input: "lib/index.ts", // 输入文件路径
			plugins: [resolve(), commonjs(), typescript()],
			external: [/^@only-code\/.*/],
		});
		// 输出配置
		await bundle.write({
			file: "cjs/index.js", // 输出文件路径
			format: "cjs", // 输出格式
			sourcemap: true, // 是否生成 sourcemap
		});
		// 输出配置
		await bundle.write({
			file: "esm/index.js", // 输出文件路径
			format: "cjs", // 输出格式
			sourcemap: true, // 是否生成 sourcemap
		});
		console.log("打包成功!");
	} catch (error) {
		console.error("打包失败，错误:", error);
	}
}

// 执行打包任务
build();
