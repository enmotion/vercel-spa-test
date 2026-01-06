/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const tailWindUtils = require("./tailwind.lib/tailwind.util");

export default {
	important: "#bootstrap-tw",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		flexGrow: tailWindUtils.generateStepUint(12),
		flexShrink: tailWindUtils.generateStepUint(12),
		colors: {
			black: "#000000",
			white: "#FFFFFF",
			dark: tailWindUtils.generateHexAlphaColorStep("#000000", 48),
			light: tailWindUtils.generateHexAlphaColorStep("#FFFFFF", 48),
			gray: colors.gray,
			p: tailWindUtils.generateAlphaColorStep("--el-color-primary-rgb", 10), // 主题色
			d: tailWindUtils.generateAlphaColorStep("--el-color-danger-rgb", 10), // 危险色
			e: tailWindUtils.generateAlphaColorStep("--el-color-error-rgb", 10), // 错误色
			s: tailWindUtils.generateAlphaColorStep("--el-color-success-rgb", 10), // 安全色
			w: tailWindUtils.generateAlphaColorStep("--el-color-warning-rgb", 10), // 警告色
			i: tailWindUtils.generateAlphaColorStep("--el-color-info-rgb", 10), // 信息色
			a: tailWindUtils.generateAlphaColorStep("--el-color-accent-rgb", 10), // 辅助色
		},
		spacing: tailWindUtils.generateSpacing(5, 100, 1200),
		extend: {
			xpcc: "#F0F0F0",
		},
	},
	plugins: [
		plugin(function ({ addComponents }) {
			addComponents({
				"html,body": {
					height: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#000000",
				},
				".flex-col": {
					display: "flex",
					flexDirection: "column",
				},
				".flex-row": {
					display: "flex",
					flexDirection: "row",
				},
				".bg-texture-light": {
					backgroundColor: "#FCFCFC",
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 28v-4L36 12 24 24 12 12 0 24v4l4 4-4 4v4l12 12 12-12 12 12 12-12v-4l-4-4 4-4zM8 32l-6-6 10-10 10 10-6 6 6 6-10 10L2 38l6-6zm12 0l4-4 4 4-4 4-4-4zm12 0l-6-6 10-10 10 10-6 6 6 6-10 10-10-10 6-6zM0 16L10 6 4 0h4l4 4 4-4h4l-6 6 10 10L34 6l-6-6h4l4 4 4-4h4l-6 6 10 10v4L36 8 24 20 12 8 0 20v-4zm0 32l10 10-6 6h4l4-4 4 4h4l-6-6 10-10 10 10-6 6h4l4-4 4 4h4l-6-6 10-10v-4L36 56 24 44 12 56 0 44v4z' fill='%23E8E8E8' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
				},
				".bg-texture-dark": {
					backgroundColor: "#22344b !important",
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 28v-4L36 12 24 24 12 12 0 24v4l4 4-4 4v4l12 12 12-12 12 12 12-12v-4l-4-4 4-4zM8 32l-6-6 10-10 10 10-6 6 6 6-10 10L2 38l6-6zm12 0l4-4 4 4-4 4-4-4zm12 0l-6-6 10-10 10 10-6 6 6 6-10 10-10-10 6-6zM0 16L10 6 4 0h4l4 4 4-4h4l-6 6 10 10L34 6l-6-6h4l4 4 4-4h4l-6 6 10 10v4L36 8 24 20 12 8 0 20v-4zm0 32l10 10-6 6h4l4-4 4 4h4l-6-6 10-10 10 10-6 6h4l4-4 4 4h4l-6-6 10-10v-4L36 56 24 44 12 56 0 44v4z' fill='%23091224' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E") !important`,
				},
			});
		}),
	],
} satisfies Config;
