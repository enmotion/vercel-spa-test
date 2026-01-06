import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig({ mode: "development" }), // mod 尝试修改 原本为 viteConfig 对象，并非方法
	defineConfig({
		test: {
			environment: "jsdom",
			exclude: [...configDefaults.exclude, "e2e/*"],
			root: fileURLToPath(new URL("./", import.meta.url)),
		},
	}),
);
