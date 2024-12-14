import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import path from "path";
import { findUp } from "find-up";
import { watch } from "rollup";
import { fileURLToPath } from "url";
import fs from "fs";
import { globSync } from "glob";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
async function build() {
	const lernaJsonPath = await findUp(["lerna.json"]);
	if (!lernaJsonPath) {
		return new Error("项目根路径缺失lerna.json文件");
	}
	let rootPath = path.dirname(lernaJsonPath);
	let rootPackagePath = path.resolve(rootPath, "package.json");
	let rootPackageJson;
	if (rootPackagePath) {
		rootPackageJson = JSON.parse(fs.readFileSync(rootPackagePath, { encoding: "utf-8" }));
	}
	let workspaces = rootPackageJson.workspaces;
	let packages = globSync(workspaces, { cwd: rootPath });
	//计算出alias，在本地调试的时候直接使用源码而非使用编译后的代码
	let packageEntries = packages.map((pkg) => {
		let packageJson = JSON.parse(fs.readFileSync(path.resolve(rootPath, pkg, "package.json"), { encoding: "utf-8" }));
		return {
			find: packageJson.name,
			replacement: path.resolve(rootPath, pkg, "lib/index.ts"),
		};
	});
	// 动态配置 Rollup
	const watcher = watch({
		input: "lib/index.ts", // 输入文件路径
		output: {
			file: path.resolve(__dirname, "../bin/index.js"), // 输出到 bin/index.js
			format: "cjs", // 输出格式：CommonJS
		},
		plugins: [
			typescript(),
			resolve(),
			commonjs(),
			alias({
				entries: packageEntries,
			}),
		],
		watch: {
			include: path.resolve(rootPath, "packages/*/lib/**"), // 监视 `src` 文件夹中的文件
			exclude: ["node_modules/**", "bin/**", "dist/**", "cjs/**", "esm/**"], // 排除 `node_modules` 文件夹
			chokidar: {
				usePolling: true, // 使用轮询，这在某些开发环境下很有用（比如 Windows 环境）
				interval: 100, // 设置轮询时间间隔
			},
		},
	});

	watcher.on("event", (event) => {
		switch (event.code) {
			case "START":
				console.log("启动构建...");
				break;
			case "BUNDLE_START":
				console.log("启动打包...");
				break;
			case "BUNDLE_END":
				console.log(`打包成功，耗时 ${event.duration}ms`);
				break;
			case "END":
				console.log("打包完成!");
				break;
			case "ERROR":
				console.error("打包错误:", event.error);
				break;
			default:
				break;
		}

		// 如果文件发生变化，输出变化的文件
		if (event.code === "CHANGE") {
			console.log(`文件发生更改: ${event.input}`);
		}
	});
}

// 执行打包任务
build();
